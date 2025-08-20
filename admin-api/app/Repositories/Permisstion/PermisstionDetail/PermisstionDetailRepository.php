<?php

namespace App\Repositories\Permisstion\PermisstionDetail;

use App\Models\PermisstionDetail;
use App\Repositories\BaseRepository;
use App\Enums\BaseRequestAttribute;
use App\Enums\ColumnTableEnums;
use Carbon\Carbon;

class PermisstionDetailRepository extends BaseRepository implements PermisstionDetailRepositoryInterface
{

    protected $model;
    protected $columnSearch = ColumnTableEnums::COLUMNTABLES_PERMISSTION_DETAIL_EARCHDEFAULT;

    public function __construct(PermisstionDetail $model)
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
        $this->model->url  = $data['url'];
        $this->model->status = $data['status'] ?? 1;
        $this->model->permisstion_id = $data['permisstion_id'];
        $this->model->action_id = $data['action_id'];
        $this->model->description = $data['description'];
        $this->model->created_at = Carbon::now();
        return $this->actionThenReturnBoolOrData($this->model, true);
    }

    public function updateData(int $id, array $data)
    {
        $model = $this->model->find($id);
        $model->name  = $data['name'];
        $model->code = $data['code'];
        $model->url  = $data['url'];
        $model->status = $data['status'] ?? 1;
        $model->permisstion_id  = $data['permisstion_id'];
        $model->action_id = $data['action_id'];
        if ($data['description'] && $data['description'] !== null) {
            $model->description = $data['description'];
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
        return $this->model->with(['action', 'permisstion'])->find($id);
    }
}
