<?php

namespace App\Services\Functions\Execute\System\Banner;

use App\Services\Functions\Execute\BaseServicesInterface;

interface  BannerServiceInterface extends BaseServicesInterface
{
    public function getListService($request);
}
