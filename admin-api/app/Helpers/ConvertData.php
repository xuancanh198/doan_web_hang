<?php

namespace App\Helpers;

use Carbon\Carbon;

class ConvertData
{

    function convertDateTimeFormat($dateString, $hour = '00', $minute = '00', $second = '00')
    {
        try {
            $date = Carbon::parse($dateString)->setTime($hour, $minute, $second);
            return $date->format('Y-m-d H:i:s');
        } catch (\Exception $e) {
            return $dateString;
        }
    }

    public function convertToBool($value)
    {
        if (is_string($value)) {
            $lower = strtolower($value);
            if ($lower === 'true' || $lower === '1') {
                return true;
            } elseif ($lower === 'false' || $lower === '0') {
                return false;
            }
        } elseif (is_int($value) || is_float($value)) {
            if ($value === 1) {
                return true;
            } elseif ($value === 0) {
                return false;
            }
        }
        return $value;
    }

    function normalizeIds($value): int|array|null
    {
        if (is_numeric($value)) {
            return (int) $value;
        }

        if (is_string($value) && str_contains($value, ',')) {
            $parts = explode(',', $value);
            $parts = array_map('trim', $parts);
            $isValid = collect($parts)->every(fn($val) => is_numeric($val));

            if ($isValid) {
                return array_map('intval', $parts);
            }

            return null;
        }

        return null;
    }

    function convertArrayToJsonObject(array $permissions): string
    {
        $assoc = array_fill_keys($permissions, true);
        return json_encode($assoc, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }
}
