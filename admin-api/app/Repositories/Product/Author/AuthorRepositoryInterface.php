<?php

namespace App\Repositories\Product\Author;

use App\Repositories\BaseRepositoryInterface;

interface  AuthorRepositoryInterface extends BaseRepositoryInterface
{
    public function getListRepo(array $params = []);
}
