<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use App\Enums\OrderStatusEnum;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CartController extends Controller
{
    public function __construct(
        protected CartService $cartService
    ) {
    }

    public function index()
    {
        return Inertia::render('Cart/Index', [
            'items' => $this->cartService->getCartItems(),
            'total' => $this->cartService->getTotalPrice(),
        ]);
    }

    public function store(Request $request, Product $product)
    {
        $this->cartService->addItemToCart(
            $product->id,
            $request->input('quantity', 1),
            $request->input('option_ids')
        );

        return back()->with('success', 'Product added to cart');
    }

    public function update(Request $request, Product $product)
    {
        $this->cartService->updateItemQuantity(
            $product->id,
            $request->input('quantity'),
            $request->input('option_ids')
        );

        return back()->with('success', 'Cart updated');
    }

    public function destroy(Product $product, Request $request)
    {
        $this->cartService->deleteItemInCart(
            $product->id,
            $request->input('option_ids')
        );

        return back()->with('success', 'Product removed from cart');
    }

    public function checkout(Request $request, CartService $cartService)
    {
        \Stripe\Stripe::setApiKey(config('app.stripe_secret_key'));

        $vendorIdInput = $request->input('vendor_id');

        DB::beginTransaction();
        try {
            $allCartItems = $cartService->getCartItems();

            if (empty($allCartItems)) {
                return back()->with('error', 'Cart is empty');
            }

            // Group items by vendor (created_by)
            $groupedItems = [];
            foreach ($allCartItems as $item) {
                $vendorId = $item['product']->created_by;
                if (!isset($groupedItems[$vendorId])) {
                    $groupedItems[$vendorId] = [
                        'vendor_user_id' => $vendorId,
                        'items' => [],
                        'total_price' => 0
                    ];
                }
                $groupedItems[$vendorId]['items'][] = $item;
                $groupedItems[$vendorId]['total_price'] += $item['price'] * $item['quantity'];
            }

            // If a specific vendor is requested for checkout
            if ($vendorIdInput && isset($groupedItems[$vendorIdInput])) {
                $groupedItems = [$vendorIdInput => $groupedItems[$vendorIdInput]];
            }

            $orders = [];
            $lineItems = [];

            foreach ($groupedItems as $vendorData) {
                $order = Order::create([
                    'user_id' => $request->user()->id,
                    'vendor_user_id' => $vendorData['vendor_user_id'],
                    'total_price' => $vendorData['total_price'],
                    'status' => OrderStatusEnum::Draft->value
                ]);
                $orders[] = $order;

                foreach ($vendorData['items'] as $cartItem) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $cartItem['product_id'],
                        'quantity' => $cartItem['quantity'],
                        'price' => $cartItem['price'],
                        'variation_type_option_ids' => $cartItem['option_ids'] ?? null,
                    ]);

                    $description = '';
                    if (!empty($cartItem['options'])) {
                        $description = collect($cartItem['options'])->map(function ($opt) {
                            return "{$opt['type']['name']}: {$opt['name']}";
                        })->implode(', ');
                    }

                    $stripeLineItem = [
                        'price_data' => [
                            'currency' => config('app.currency', 'usd'),
                            'product_data' => [
                                'name' => $cartItem['product']->title,
                                'images' => $cartItem['product']->image
                                    ? [url($cartItem['product']->image)]
                                    : [],
                            ],
                            'unit_amount' => (int) ($cartItem['price'] * 100),
                        ],
                        'quantity' => $cartItem['quantity']
                    ];

                    if ($description) {
                        $stripeLineItem['price_data']['product_data']['description'] = $description;
                    }

                    $lineItems[] = $stripeLineItem;
                }
            }

            $session = \Stripe\Checkout\Session::create([
                'customer_email' => $request->user()->email,
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => route('stripe.success') . "?session_id={CHECKOUT_SESSION_ID}",
                'cancel_url' => route('stripe.failure') . "?session_id={CHECKOUT_SESSION_ID}",
            ]);

            foreach ($orders as $order) {
                $order->stripe_session_id = $session->id;
                $order->save();
            }

            DB::commit();
            return Inertia::location($session->url);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return back()->with('error', $e->getMessage() ?: 'Failed to create order');
        }
    }
}