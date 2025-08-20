<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\TablesEnum;

class ProductImportExports extends Model
{
    protected $table = TablesEnum::Product_Import_Exports_TABLE;

    protected $id = TablesEnum::PRIMARY_ID;

    protected $fillable = TablesEnum::PRODUCT_ImportExports_COLUMN;
}
