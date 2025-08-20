<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\TablesEnum;
use App\Enums\ActiveLogEnum;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Support\Facades\Auth;
use App\Models\Action;
use App\Models\Permisstion;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PermisstionDetail extends Model
{
    protected $table = TablesEnum::PERMISSTION_DETAIL_TABLE;

    protected $id = TablesEnum::PRIMARY_ID;

    protected static $logName = ActiveLogEnum::CATEGORY_VALUE;

    protected $fillable = TablesEnum::PERMISSTIONDETAIL_COLUMN;

    // protected $hidden = TablesEnum::PERMISSTIONDETAIL_COLUMN_HIDDEN;

    protected static $logOnlyDirty = true;

    public function permisstion()
    {
        return $this->BelongsTo(Permisstion::class, 'permisstion_id', 'id');
    }
    public function action()
    {
        return $this->BelongsTo(Action::class,  'action_id', 'id');
    }
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->useLogName(ActiveLogEnum::TYPE_LOG_ADMIN)
            ->logOnly(ActiveLogEnum::CATEGORY_COLUMN_LOG_ACTIVE)
            ->logOnlyDirty();
    }

    public static function tapActivity(Activity $activity, string $eventName)
    {

        $activity->description = match ($eventName) {
            'created' => "Nhân viên " . Auth::user()->username . " đã được tạo mới hành động " . $activity->subject->name,
            'updated' => "Nhân viên " . Auth::user()->username . " đã được cập nhật  hành động " . $activity->subject->name,
            'deleted' => "Nhân viên " . Auth::user()->username . " đã được xóa hành động " . $activity->subject->name,
            default => $activity->description,
        };
        $activity->subject_type = self::$logName;
    }
    public function scopeGetActive($query, $status)
    {
        return $query->where('status', $status);
    }
}
