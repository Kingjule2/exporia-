<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VendorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StripeController;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\ProductController::class, 'Home'])->name('dashboard');
Route::get('/product/{product:slug}', [\App\Http\Controllers\ProductController::class, 'show'])->name('products.show');
Route::get('/vendor/shop/{user}', [VendorController::class, 'shopShow'])->name('vendor.shop.show');




Route::controller(CartController::class)->group(function () {
    Route::get('/cart', 'index')->name('cart.index');
    Route::post('/cart/add/{product}', 'store')->name('cart.store');
    Route::put('/cart/{product}', 'update')->name('cart.update');
    Route::delete('/cart/{product}', 'destroy')->name('cart.destroy');
});

Route::post('/stripe/webhook', [StripeController::class, 'webhook']) // Fixed typo: 'Webhook' to 'webhook'
    ->name('stripe.webhook');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/vendor/become', [VendorController::class, 'becomeVendor'])->name('vendor.become');

    Route::get('/vendor/register', [VendorController::class, 'register'])
        ->name('vendor.register');
    Route::post('/vendor/register', [VendorController::class, 'store'])
        ->name('vendor.store');

    Route::middleware(['role:Vendor'])->group(function () {
        Route::get('/vendor/dashboard', [VendorController::class, 'dashboard'])
            ->name('vendor.dashboard');
        Route::post('/vendor/connect-stripe', [VendorController::class, 'connectStripe'])
            ->name('vendor.connect-stripe');
    });

    Route::get('/vendor/verify-notice', [VendorController::class, 'verifyNotice'])
        ->name('vendor.verify-notice');
    Route::get('/vendor/verify/{user}', [VendorController::class, 'verify'])
        ->name('vendor.verify');
});

Route::middleware('auth')->group(function () {
    Route::post('/cart/checkout', [CartController::class, 'checkout'])
        ->name('cart.checkout');

    Route::get('/stripe/success', [StripeController::class, 'success'])->name('stripe.success');


    Route::get('/stripe/failure', [StripeController::class, 'failure'])
        ->name('stripe.failure');
});

require __DIR__ . '/auth.php';
