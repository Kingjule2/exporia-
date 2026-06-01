<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductListResource extends JsonResource
{

    
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'image' => $this->image,
            'user' => [
                'id' => $this->user?->id,
                'name' => $this->user?->name ?? 'Unknown',
            ],
            'departemen' => [
                'id' => $this->departemen?->id,
                'name' => $this->departemen?->name ?? 'Unknown',
            ],
            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name ?? 'Unknown',
            ],
        ];
    }
}