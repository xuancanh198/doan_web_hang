<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\TablesEnum;
use App\Enums\ActiveLogEnum;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Support\Facades\Auth;

class LogActive extends Model
{
    protected $table = TablesEnum::LOGACTIVE_TABLE;

    protected $id = TablesEnum::PRIMARY_ID;

    protected static $logName = ActiveLogEnum::CATEGORY_VALUE;

    protected $fillable = TablesEnum::LOGACTIVE_COLUMN;
}
