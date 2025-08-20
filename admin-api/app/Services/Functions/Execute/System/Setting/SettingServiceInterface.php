<?php

namespace App\Services\Functions\Execute\System\Setting;

use App\Services\Functions\Execute\BaseServicesInterface;

interface  SettingServiceInterface extends BaseServicesInterface {
    public function getLangSystemSetting();
    public function getPositionBannerSetting();
}
