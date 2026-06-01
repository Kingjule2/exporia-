<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Illuminate\Database\Eloquent\Builder;
use App\Enums\ProductStatusEnum;
use App\Enums\RolesEnum;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model implements HasMedia
{
    use InteractsWithMedia, SoftDeletes;

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(100);

        $this->addMediaConversion('small')
            ->width(480);
        $this->addMediaConversion('large')
            ->width(1200);
    }
    public function departemen(): BelongsTo
    {
        return $this->belongsTo(Departemen::class);
    }

    public function scopeForVendor(Builder $query): Builder
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();
        if (!$user) {
            return $query->whereRaw('1=0');
        }
        if ($user->hasRole(RolesEnum::Admin)) {
            return $query;
        }
        return $query->where('created_by', $user->id);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', ProductStatusEnum::Published->value);
    }



    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function variationTypes(): HasMany
    {
        return $this->hasMany(VariationType::class);
    }

    public function variations(): HasMany
    {
        return $this->hasMany(ProductVariation::class, 'product_id');
    }

    public function getImageAttribute(): ?string
    {
        return $this->getFirstMediaUrl('images', 'thumb') ?: null;
    }
}
