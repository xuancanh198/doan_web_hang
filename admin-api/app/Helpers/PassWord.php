<?php

namespace App\Helpers;

use Carbon\Carbon;

class PassWord
{
    function generateRandomPassword($length = 12): string
    {
        $upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $lower = 'abcdefghijklmnopqrstuvwxyz';
        $digits = '0123456789';
        $special = '!@#$%^&*()-_=+<>?';
        $all = $upper . $lower . $digits . $special;

        $password = $upper[random_int(0, strlen($upper) - 1)] .
            $lower[random_int(0, strlen($lower) - 1)] .
            $digits[random_int(0, strlen($digits) - 1)] .
            $special[random_int(0, strlen($special) - 1)];

        for ($i = 4; $i < $length; $i++) {
            $password .= $all[random_int(0, strlen($all) - 1)];
        }

        return str_shuffle($password);
    }
}
