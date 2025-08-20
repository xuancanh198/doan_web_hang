<?php

namespace App\Repositories\System\Setting;

use App\Models\Setting;
use App\Repositories\BaseRepository;
use App\Enums\BaseRequestAttribute;
use App\Enums\ColumnTableEnums;
use Carbon\Carbon;
use App\Helpers\SlugHelper;

class SettingRepository extends BaseRepository implements SettingRepositoryInterface
{

    protected $model;
    protected $columnSearch = ColumnTableEnums::COLUMNTABLESEARCHDEFAULT;

    public function __construct(Setting $model)
    {
        $this->model = $model;
    }
    public function getList(array $query)
    {
        $page = $query['page'] ?? BaseRequestAttribute::PAGE_DEFAULT;
        $limit = $query['limit'] ?? BaseRequestAttribute::LIMIT_DEFAULT;
        $excel = $query['excel'] ?? BaseRequestAttribute::DEFAULT_NULL;
        $search = $query['search'] ?? BaseRequestAttribute::DEFAULT_NULL;
        $typeTime = $query['typeTime'] ?? BaseRequestAttribute::DEFAULT_NULL;
        $start = $query['start'] ?? BaseRequestAttribute::DEFAULT_NULL;
        $end = $query['end'] ?? BaseRequestAttribute::DEFAULT_NULL;
        $filtersBase64 = $query['filtersBase64'] ?? BaseRequestAttribute::DEFAULT_NULL;
        $filterBaseDecode = $query['filterBaseDecode'] ?? BaseRequestAttribute::DEFAULT_NULL;
        $isSelectAll = $query['isSelectAll'] ?? BaseRequestAttribute::DEFAULT_FALSE;
        $result = $this->getListBaseFun($this->model, $page, $limit, $search, $this->columnSearch, $excel, $typeTime, $start, $end, $filtersBase64, $isSelectAll, $this->columnSearch, $filterBaseDecode);
        return $result;
    }
    public function createData(array $data)
    {
        $this->model->key = $data['key'];
        $this->model->value = $data['value'];
        $this->model->group = $data['group'];
        $this->model->type = $data['type'];
        $this->model->description = $data['description'];
        $this->model->name = $data['name'];
        $this->model->status = 1;
        $this->model->created_at = Carbon::now();
        return $this->actionThenReturnBoolOrData($this->model, true);
    }

    public function updateData(int $id, array $data)
    {
        $model = $this->model->find($id);
        $model->key = $data['key'];
        $model->value = $data['value'];
        $model->group = $data['group'];
        $model->type = $data['type'];
        $model->description = $data['description'];
        $model->name = $data['name'];
        $model->updated_at = Carbon::now();
        return $this->actionThenReturnBoolOrData($model, true);
    }
    public function deleteData(int|array $id)
    {
        return $this->deleteOneOrManyRecord($this->model, $id);
    }
    public function findViewDetail(int $id)
    {
        return $this->model->find($id);
    }
    public function getBaseSetting($group)
    {
        return $this->model->where('group', $group)->select(['value', 'name'])->get()->toArray();
    }
}
