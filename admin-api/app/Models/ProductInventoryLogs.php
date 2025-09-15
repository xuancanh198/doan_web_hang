<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\TablesEnum;

class ProductInventoryLogs extends Model
{
    protected $table = TablesEnum::ProductInventoryLogs_TABLE;

    protected $id = TablesEnum::PRIMARY_ID;

    protected $fillable = TablesEnum::PRODUCT_Inventory_COLUMN;

    public function product()
    {
        return $this->belongsTo(Product::class, foreignKey: 'product_id');
    }
}
