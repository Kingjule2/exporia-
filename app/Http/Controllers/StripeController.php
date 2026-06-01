<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Mail\OrderMarkedPaid;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Stripe\Stripe;
use Stripe\Webhook;
use Stripe\StripeClient;

class StripeController extends Controller
{
    public function success()
    {
        return Inertia::render('stripe/success');
    }

    public function failure()
    {
        return Inertia::render('stripe/failure');
    }

    public function webhook(Request $request)
    {
        $stripe = new StripeClient(config('app.stripe_secret_key'));
        $endpoint_secret = config('app.stripe_webhook_secret');
        $payload = $request->getContent();
        $sig_header = $request->header('stripe-signature');
        $event = null;

        try {
            $event = Webhook::constructEvent(
                $payload,
                $sig_header,
                $endpoint_secret
            );
        } catch (\UnexpectedValueException $e) {
            Log::error($e);
            return response('Invalid Payload', 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            Log::error($e);
            return response('Invalid Signature', 400);
        }

        Log::info('Stripe Webhook Event: ' . $event->type);

        switch ($event->type) {
            case 'charge.updated':
                $charge = $event->data->object;
                $transactionId = $charge['balance_transaction'] ?? null;
                $paymentIntent = $charge['payment_intent'];

                if (!$transactionId)
                    break;

                $balanceTransaction = $stripe->balanceTransactions->retrieve($transactionId);

                $orders = Order::where('payment_intent', $paymentIntent)->get();

                $totalAmount = $balanceTransaction['amount'];
                $stripeFee = 0;
                foreach ($balanceTransaction['fee_details'] as $fee_detail) {
                    if ($fee_detail['type'] === 'stripe_fee') {
                        $stripeFee = $fee_detail['amount'];
                    }
                }

                // Further logic for platform fee could be added here
                break;

            case 'checkout.session.completed':
                $session = $event->data->object;
                $paymentIntent = $session['payment_intent'];

                $orders = Order::with('vendorUser')->where('stripe_session_id', $session['id'])->get();

                foreach ($orders as $order) {
                    $order->status = 'paid';
                    $order->payment_intent = $paymentIntent;
                    $order->save();

                    // Logic Transfer ke Vendor
                    $vendor = $order->vendorUser;
                    if ($vendor && $vendor->stripe_account_id) {
                        try {
                            // Hitung komisi (Misal: 10% untuk platform, 90% untuk vendor)
                            $platformFeePercent = 10;
                            $amountInCents = (int) ($order->total_price * 100);
                            $transferAmount = (int) ($amountInCents * (1 - ($platformFeePercent / 100)));

                            $stripe->transfers->create([
                                'amount' => $transferAmount,
                                'currency' => config('app.currency', 'usd'),
                                'destination' => $vendor->stripe_account_id,
                                'transfer_group' => $paymentIntent,
                                'metadata' => [
                                    'order_id' => $order->id,
                                ],
                            ]);

                            Log::info("Transfer successful to vendor {$vendor->id} for order {$order->id}");
                        } catch (\Exception $e) {
                            Log::error("Transfer failed for order {$order->id}: " . $e->getMessage());
                        }
                    }

                    Mail::to('rafafazli7@gmail.com')->send(new OrderMarkedPaid($order));
                }
                break;
        }

        return response('Webhook Handled', 200);
    }
}
