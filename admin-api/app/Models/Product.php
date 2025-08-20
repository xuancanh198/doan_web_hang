<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\TablesEnum;
use App\Enums\ActiveLogEnum;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use App\Models\Author;
use App\Models\Publisher;

class Product extends Model
{
    protected $table = TablesEnum::PRODUCT_TABLE;

    protected $id = TablesEnum::PRIMARY_ID;

    protected static $logName = ActiveLogEnum::CATEGORY_VALUE;

    protected $fillable = TablesEnum::PRODUCT_COLUMN;

    protected $hidden = TablesEnum::PRODUCT_COLUMN_COLUMN_HIDDEN;

    protected static $logOnlyDirty = true;

    protected $casts = TablesEnum::PRODUCT_CASTS;

    public function getFiguresAttribute($value)
    {
        $decoded = json_decode($value, true);
        if (is_string($decoded)) {
            return json_decode($decoded, true);
        }

        return $decoded ?? [];
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
    public function scopeGetActive($query, $status = 1)
    {
        return $query->where('status', $status);
    }

    public function scopeIsBuy($query, $status = true)
    {
        return $query->where('is_buy', $status);
    }

    public function scopeIsRent($query, $status = true)
    {
        return $query->where('is_rent', $status);
    }
    public function scopeIsExist($query)
    {
        return $query->whereNotNull('image');
    }
    public function author()
    {
        return $this->belongsTo(Author::class, 'author_id', 'id');
    }
    public function category()
    {
        return $this->belongsTo(Category::class, foreignKey: 'category_id');
    }
    public function publisher()
    {
        return $this->belongsTo(Publisher::class, foreignKey: 'publisher_id');
    }
    public function setTagsAttribute($value)
    {
        $this->attributes['tags'] = is_array($value)
            ? json_encode($value)
            : $value;
    }

    public function setImagesAttribute($value)
    {
        $this->attributes['images'] = is_array($value)
            ? json_encode($value)
            : $value;
    }
}
