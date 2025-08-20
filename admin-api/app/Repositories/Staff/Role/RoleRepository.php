<?php

namespace App\Repositories\Staff\Role;

use App\Models\Role;
use App\Repositories\BaseRepository;
use App\Enums\BaseRequestAttribute;
use App\Enums\ColumnTableEnums;
use Carbon\Carbon;
use App\Helpers\ConvertData;

class RoleRepository extends BaseRepository implements RoleRepositoryInterface
{

    protected $model;
    protected $columnSearch = ColumnTableEnums::COLUMNTABLESEARCHDEFAULT;

    public function __construct(Role $model)
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
        $this->model->name = $data['name'];
        $this->model->code = $data['code'];
        $this->model->status = $data['status'] ?? 1;
        $this->model->description = $data['description'];
        $this->model->permisstion_detail = app(ConvertData::class)->convertArrayToJsonObject($data['permisstion_detail']);
        $this->model->created_at = Carbon::now();
        return $this->actionThenReturnBoolOrData($this->model, true);
    }

    public function updateData(int $id, array $data)
    {
        $model = $this->model->find($id);
        $model->name = $data['name'];
        $model->code = $data['code'];
        $model->status = $data['status'];
        if ($data['description'] && $data['description'] !== null) {
            $model->description = $data['description'];
        }
        if ($data['permisstion_detail'] && $data['permisstion_detail'] !== null) {
            $model->permisstion_detail = app(ConvertData::class)->convertArrayToJsonObject($data['permisstion_detail']);
        }
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
}
