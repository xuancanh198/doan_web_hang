<?php

namespace App\Imports;

use App\Models\Category;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class CategoriesImport implements ToCollection, WithHeadingRow, WithChunkReading
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            if (empty($row['name'])) continue;

            $category = Category::firstOrNew([
                'code' => $row['code'] ?? null
            ]);

            $category->name = $row['name'];
            $category->status = $row['status'] ?? 1;
            $category->parent_id = $row['parent_id'] ?? null;
            $category->image = $row['image'] ?? null;
            $category->description = $row['description'] ?? null;
            $category->created_at = $row['created_at'] ?? now();
            $category->updated_at = $row['updated_at'] ?? now();

            $category->save();
        }
    }

    public function chunkSize(): int
    {
        return 500;
    }
}
