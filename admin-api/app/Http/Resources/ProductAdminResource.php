<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductAdminResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'status' => $this->status,
            'price' => $this->price,
            'pages' => $this->pages,
            'view_count' => $this->view_count,
            'quantity' => $this->quantity,
            'add_card_view' => $this->add_card_view,
            'coverPhoto' => $this->coverPhoto,
            'images' => $this->images,
            'lang' => $this->lang,
            'tags' => $this->tags,
            'figures' => $this->figures,
            'published_ad' => $this->published_ad,
            'started_ad' => $this->started_ad,
            'ended_ad' => $this->ended_ad,
            'parent_id' => $this->parent_id,
            'image' => $this->image,
            'description' => $this->description,
            'rent_price' => $this->rent_price,
            'buy_quantity' => $this->buy_quantity,
            'rent_quantity' => $this->rent_quantity,
            'is_buy' => $this->is_buy,
            'is_rent' => $this->is_rent,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
