<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Cookie;

class CartService
{
    private $cookieName = 'cart_items';

    /**
     * Menambahkan item ke keranjang (disimpan di Cookie)
     */
    public function addItemToCart($productId, int $quantity = 1, $optionIds = null)
    {
        $cartItems = $this->getCartItems();
        $key = $this->getCartKey($productId, $optionIds);

        if (isset($cartItems[$key])) {
            $cartItems[$key]['quantity'] += $quantity;
        } else {
            $cartItems[$key] = [
                'product_id' => $productId,
                'quantity' => $quantity,
                'option_ids' => $optionIds,
            ];
        }

        $this->saveCart($cartItems);
    }

    /**
     * Update jumlah quantity berdasarkan ID produk dan variasinya
     */
    public function updateItemQuantity(int $productId, int $quantity = 1, $optionIds = null)
    {
        $cartItems = $this->getCartItems();
        $key = $this->getCartKey($productId, $optionIds);

        if (isset($cartItems[$key])) {
            $cartItems[$key]['quantity'] = $quantity;
            $this->saveCart($cartItems);
        }
    }

    /**
     * Menghapus item dari keranjang
     */
    public function deleteItemInCart(int $productId, $optionIds = null)
    {
        $cartItems = $this->getCartItems();
        $key = $this->getCartKey($productId, $optionIds);

        if (isset($cartItems[$key])) {
            unset($cartItems[$key]);
            $this->saveCart($cartItems);
        }
    }

    /**
     * Mengambil semua item di keranjang beserta data produk asli dari DB
     */
    public function getCartItems(): array
    {
        $cartData = Cookie::get($this->cookieName);
        $cartItems = $cartData ? json_decode($cartData, true) : [];

        if (empty($cartItems))
            return [];

        // Ambil semua Product ID yang ada di keranjang
        $productIds = array_column($cartItems, 'product_id');
        $products = Product::whereIn('id', $productIds)->with(['variations'])->get()->keyBy('id');

        // Gabungkan data cookie dengan data produk dari database
        foreach ($cartItems as $key => &$item) {
            $product = $products[$item['product_id']] ?? null;
            if ($product) {
                $item['product'] = $product;
                // Cari harga berdasarkan variasi jika ada
                $item['price'] = $this->calculateItemPrice($product, $item['option_ids']);
            }
        }

        return $cartItems;
    }

    /**
     * Menghitung total jumlah barang di keranjang
     */
    public function getCartItemsQuantity(): int
    {
        $cartItems = $this->getCartItems();
        return array_reduce($cartItems, fn($total, $item) => $total + $item['quantity'], 0);
    }

    /**
     * Menghitung total harga seluruh keranjang
     */
    public function getTotalPrice(): float
    {
        $cartItems = $this->getCartItems();
        return (float) array_reduce($cartItems, function ($total, $item) {
            $price = $item['price'] ?? 0;
            return $total + ($price * $item['quantity']);
        }, 0);
    }

    /**
     * Helper: Mencari harga produk berdasarkan variasi yang dipilih
     */
    private function calculateItemPrice($product, $optionIds)
    {
        if (!$optionIds || empty($product->variations)) {
            return $product->price;
        }

        // Urutkan ID opsi agar cocok dengan database
        $selectedOptionIds = collect($optionIds)->values()->sort()->values()->toArray();

        foreach ($product->variations as $variation) {
            $variationOptionIds = collect($variation->variation_type_option_ids)->sort()->values()->toArray();

            if ($selectedOptionIds === $variationOptionIds) {
                return $variation->price;
            }
        }

        return $product->price;
    }

    /**
     * Helper: Membuat Unique Key agar produk yang sama dengan variasi berbeda tidak tumpang tindih
     */
    private function getCartKey($productId, $optionIds)
    {
        $optionKey = $optionIds ? md5(json_encode($optionIds)) : 'default';
        return "{$productId}_{$optionKey}";
    }

    /**
     * Simpan data kembali ke Cookie
     */
    private function saveCart(array $cartItems)
    {
        Cookie::queue($this->cookieName, json_encode($cartItems), 60 * 24 * 30); // Simpan 30 hari
    }
}