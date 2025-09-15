<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\TablesEnum;
use App\Enums\ActiveLogEnum;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Support\Facades\Auth;

class ImportExportTaskLog extends Model
{
    protected $table = TablesEnum::IMPORT_EXPORT_TASK_LOGS_TABLE;

    protected $id = TablesEnum::PRIMARY_ID;

    protected static $logName = ActiveLogEnum::CATEGORY_VALUE;

    protected $fillable = TablesEnum::IMPORT_EXPORT_TASK_LOGS_COLUMN;

    protected static $logOnlyDirty = true;

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
            'created' => "Người dùng " . Auth::user()->username . " đã thêm log cho tiến trình ID: " . $activity->subject->task_id,
            'updated' => "Người dùng " . Auth::user()->username . " đã cập nhật log tiến trình ID: " . $activity->subject->task_id,
            'deleted' => "Người dùng " . Auth::user()->username . " đã xóa log tiến trình ID: " . $activity->subject->task_id,
            default   => $activity->description,
        };

        $activity->subject_type = self::$logName;
    }

    // QUAN HỆ
    public function task()
    {
        return $this->belongsTo(ImportExportTask::class, 'task_id');
    }

    // SCOPE
    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
