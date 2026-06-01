<x-mail::message>
    # Order Paid Successfully

    Order #{{ $order->id }} has been paid.

    **Total Price:** {{ $order->total_price }}
    **Customer:** {{ $order->user->name }} ({{ $order->user->email }})

    <x-mail::button :url="config('app.url')">
        Visit Site
    </x-mail::button>

    Thanks,<br>
    {{ config('app.name') }}
</x-mail::message>