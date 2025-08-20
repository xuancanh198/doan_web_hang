<?php

namespace App\Repositories\System\Banner;

use App\Repositories\BaseRepositoryInterface;

interface  BannerRepositoryInterface extends BaseRepositoryInterface
{
    public function getListRepo(array $params = []);
}
