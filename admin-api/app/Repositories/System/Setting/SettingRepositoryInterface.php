<?php

namespace App\Repositories\System\Setting;

use App\Repositories\BaseRepositoryInterface;

interface  SettingRepositoryInterface extends BaseRepositoryInterface
{
    public function getBaseSetting($group);
}
