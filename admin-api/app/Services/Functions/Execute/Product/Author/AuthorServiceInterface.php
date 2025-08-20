<?php

namespace App\Services\Functions\Execute\Product\Author;

use App\Services\Functions\Execute\BaseServicesInterface;

interface  AuthorServiceInterface extends BaseServicesInterface
{
    public function getListService($request);
}
