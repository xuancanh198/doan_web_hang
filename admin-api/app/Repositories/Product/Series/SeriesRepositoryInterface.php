<?php

namespace App\Repositories\Product\Series;

use App\Repositories\BaseRepositoryInterface;

interface  SeriesRepositoryInterface extends BaseRepositoryInterface
{
    public function getListRepo(array $params = []);
}
