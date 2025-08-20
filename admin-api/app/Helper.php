<?php

use Illuminate\Support\Facades\Cache;
use App\Models\Setting;

if (!function_exists('setting')) {
    function setting($key, $default = null)
    {
        return Cache::rememberForever("setting_{$key}", function () use ($key, $default) {
            $setting = Setting::where('key', $key)->first();
            return $setting ? $setting->value : $default;
        });
    }
}
