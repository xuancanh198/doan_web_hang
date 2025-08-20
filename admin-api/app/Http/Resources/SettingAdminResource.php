<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingAdminResource extends JsonResource
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
            "key" => $this->key,
            "value" => $this->value,
            "group" => $this->group,
            "type" => $this->type,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
