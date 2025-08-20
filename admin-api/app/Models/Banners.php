<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\TablesEnum;
use App\Enums\ActiveLogEnum;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Support\Facades\Auth;

class Banners extends Model
{
    use LogsActivity;

    protected $table = TablesEnum::BANNER_TABLE;

    protected static $logName = ActiveLogEnum::CATEGORY_VALUE;

    protected $fillable = TablesEnum::BANNER_COLUMN;

    protected static $logOnlyDirty = true;

    protected $casts = [
        'status' => 'boolean',
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName(ActiveLogEnum::TYPE_LOG_ADMIN)
            ->logOnly(ActiveLogEnum::CATEGORY_COLUMN_LOG_ACTIVE)
            ->logOnlyDirty();
    }

    public static function tapActivity(Activity $activity, string $eventName)
    {
        $user = Auth::user()?->username ?? 'Hệ thống';

        $activity->description = match ($eventName) {
            'created' => "Nhân viên {$user} đã tạo banner {$activity->subject->title}",
            'updated' => "Nhân viên {$user} đã cập nhật banner {$activity->subject->title}",
            'deleted' => "Nhân viên {$user} đã xóa banner {$activity->subject->title}",
            default => $activity->description,
        };

        $activity->subject_type = self::$logName;
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }

    public function scopeVisibleNow($query)
    {
        return $query
            ->where(function ($q) {
                $q->whereNull('start_time')->orWhere('start_time', '<=', now());
            })
            ->where(function ($q) {
                $q->whereNull('end_time')->orWhere('end_time', '>=', now());
            });
    }
}
