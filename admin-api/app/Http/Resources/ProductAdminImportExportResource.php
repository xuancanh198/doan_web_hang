<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductAdminImportExportResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'code' => $this->code,
            'type' => $this->type,
            'mode' => $this->mode,
            'quantity' => $this->quantity,
            'import_price' => $this->import_price,
            'expected_sell_price' => $this->expected_sell_price,
            'expected_rent_price' => $this->expected_rent_price,
            'actual_price_at_that_time' => $this->actual_price_at_that_time,
            'note' => $this->note,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'product' => $this->whenLoaded('product', function () {
                return [
                    'id' => $this->product->id,
                    'name' => $this->product->name,
                    'slug' => $this->product->slug,
                ];
            }),
        ];
    }
}
