<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'vendor_user_id',
        'total_price',
        'status',
        'online_payment_commission',
        'website_commission',
        'vendor_subtotal',
        'payment_intent',
        'stripe_session_id',
    ];

    public function orderItem(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function vendorUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'vendor_user_id');
    }
}
