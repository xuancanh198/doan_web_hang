<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "slug" => $this->slug,
            "code" => $this->code,
            "status" => $this->status,
            "image" => $this->image,
            "description" => $this->description,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "children" => $this->children,
            "parent" => $this->parent ?
                [
                    "id" => $this->id,
                    "name" => $this->name,
                    "slug" => $this->slug,
                    "code" => $this->code,
                ] : $this->parent,
        ];
    }
}
