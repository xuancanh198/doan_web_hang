<?php

namespace App\Repositories\Product\Category;

use App\Repositories\BaseRepositoryInterface;

interface  CategoryRepositoryInterface extends BaseRepositoryInterface
{

    public function getListRepo(array $params = []);
}
