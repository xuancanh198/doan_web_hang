<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BannerAdminResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'slug'        => $this->slug,
            'title'       => $this->title,
            'image'       => $this->image,
            'link'        => $this->link,
            'position'    => $this->position,
            'status'      => (bool) $this->status,
            'order'       => $this->order,
            'start_time'  => $this->start_time?->format('Y-m-d H:i:s') ?? null,
            'end_time'    => $this->end_time?->format('Y-m-d H:i:s') ?? null,
            'description' => $this->description,
            'created_at'  => $this->created_at?->format('Y-m-d H:i:s'),
            'updated_at'  => $this->updated_at?->format('Y-m-d H:i:s'),
        ];
    }
}
