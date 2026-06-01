<x-mail::message>
    # Vendor Account Verification

    Hi {{ $user->name }},

    You have requested to become a vendor. Please click the button below to verify your account and activate your vendor
    status.

    <x-mail::button :url="$url">
        Verify Vendor Status
    </x-mail::button>

    If you did not make this request, please ignore this email.

    Thanks,<br>
    {{ config('app.name') }}
</x-mail::message>