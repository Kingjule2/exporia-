<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use App\Enums\RolesEnum;
use Spatie\Permission\Models\Role;
use Stripe\Stripe;
use Stripe\Account;
use Stripe\AccountLink;
use Stripe\StripeClient;

class VendorController extends Controller
{
    public function register()
    {
        return Inertia::render('Vendor/Register');
    }

    public function store(Request $request)
    {
        $request->validate([
            'shop_name' => 'required|string|max:255',
            'company_number' => 'required|string|max:255',
            'factory_location' => 'required|string',
            'production_capacity' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->shop_name,
            'shop_name' => $request->shop_name,
            'company_number' => $request->company_number,
            'factory_location' => $request->factory_location,
            'production_capacity' => $request->production_capacity,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole(RolesEnum::Vendor);

        Auth::login($user);

        return redirect()->route('vendor.dashboard');
    }

    public function dashboard()
    {
        return Inertia::render('Vendor/Dashboard', [
            'stripe_account_id' => Auth::user()->stripe_account_id
        ]);
    }

    public function connectStripe()
    {
        $user = Auth::user();
        $stripe = new StripeClient(config('app.stripe_secret_key'));

        if (!$user->stripe_account_id) {
            $account = $stripe->accounts->create([
                'type' => 'express',
                'email' => $user->email,
                'capabilities' => [
                    'card_payments' => ['requested' => true],
                    'transfers' => ['requested' => true],
                ],
            ]);

            $user->stripe_account_id = $account->id;
            $user->save();
        }

        $accountLink = $stripe->accountLinks->create([
            'account' => $user->stripe_account_id,
            'refresh_url' => route('vendor.dashboard'),
            'return_url' => route('vendor.dashboard'),
            'type' => 'account_onboarding',
        ]);

        return Inertia::location($accountLink->url);
    }

    public function requestVerification(Request $request)
    {
        // ... keeping old method just in case or removing if not needed anymore
        // For now, let's just make it redirect to the new register page
        return redirect()->route('vendor.register');
    }

    public function verifyNotice()
    {
        return Inertia::render('Vendor/VerifyNotice');
    }

    public function verify(Request $request, $userId)
    {
        if (!$request->hasValidSignature()) {
            abort(403, 'Invalid or expired verification link.');
        }

        $user = \App\Models\User::findOrFail($userId);

        if (!$user->hasRole(RolesEnum::Vendor)) {
            $user->assignRole(RolesEnum::Vendor);
        }

        return redirect()->route('dashboard')->with('success', 'You are now a vendor!');
    }

    public function becomeVendor(Request $request)
    {
        $request->validate([
            'shop_name' => 'required|string|max:255',
            'company_number' => 'required|string|max:255',
            'factory_location' => 'required|string',
            'production_capacity' => 'required|string|max:255',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->update([
            'shop_name' => $request->shop_name,
            'company_number' => $request->company_number,
            'factory_location' => $request->factory_location,
            'production_capacity' => $request->production_capacity,
        ]);

        if (!$user->hasRole(RolesEnum::Vendor)) {
            $user->assignRole(RolesEnum::Vendor);
        }

        return redirect()->route('vendor.dashboard')->with('success', 'Pendaftaran Vendor berhasil! Anda sekarang dapat mulai berjualan.');
    }

    public function shopShow(\App\Models\User $user)
    {
        $products = \App\Models\Product::where('created_by', $user->id)
            ->published()
            ->with(['user', 'departemen', 'category'])
            ->paginate(12);

        return Inertia::render('Vendor/ShopShow', [
            'vendor' => $user,
            'products' => \App\Http\Resources\ProductListResource::collection($products)
        ]);
    }
}
