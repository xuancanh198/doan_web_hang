<?php

namespace App\Helpers;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class SlugHelper
{
    public static function generateUniqueSlug(Model $model, string $name, int $id = null): string
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;

        $query = $model->where('slug', 'LIKE', "{$slug}%");

        if ($id) {
            $query->where('id', '!=', $id);
        }

        $existingSlugs = $query->pluck('slug')->toArray();

        if (!in_array($slug, $existingSlugs)) {
            return $slug;
        }

        $i = 1;
        while (in_array("{$originalSlug}-{$i}", $existingSlugs)) {
            $i++;
        }

        return "{$originalSlug}-{$i}";
    }
}
