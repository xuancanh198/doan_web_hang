<?php

namespace App\Services\Functions\Execute\Product\Category;

use App\Services\Functions\Execute\BaseServicesInterface;

interface  CategoryServiceInterface extends BaseServicesInterface
{
    public function getListService($request);
}
