<?php

namespace App\Repositories\System\Banner;

use App\Models\Banners;
use App\Repositories\BaseRepository;
use App\Enums\BaseRequestAttribute;
use App\Enums\ColumnTableEnums;
use Carbon\Carbon;
use App\Helpers\SlugHelper;

class BannerRepository extends BaseRepository implements BannerRepositoryInterface
{

    protected $model;
    protected $columnSearch = ColumnTableEnums::COLUMNTABLESEARCHDEFAULT;

    public function __construct(Banners $model)
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
        $this->model->title = $data['title'];
        $this->model->image = $data['image'];
        $this->model->link = $data['link'];
        $this->model->position = $data['position'];
        $this->model->status = $data['status'] ?? 1;
        $this->model->order = $data['order'];
        $this->model->start_time = $data['start_time'];
        $this->model->end_time = $data['end_time'];
        $this->model->description = $data['description'];
        $this->model->created_at = Carbon::now();
        return $this->actionThenReturnBoolOrData($this->model, true);
    }

    public function updateData(int $id, array $data)
    {
        $model = $this->model->find($id);
        $this->model->title = $data['title'];
        $this->model->link = $data['link'];
        $this->model->position = $data['position'];
        $this->model->order = $data['order'];
        $this->model->start_time = $data['start_time'];
        $this->model->end_time = $data['end_time'];
        if ($data['image'] && $data['image'] !== null) {
            $model->image = $data['image'];
        }
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
        return $this->model->find($id);
    }

    public function getListRepo(array $params = [])
    {
        return $this->queryBase(
            $this->model->getStatus(),
            [
                'page'          => $params['page'] ?? BaseRequestAttribute::PAGE_DEFAULT,
                'limit'         => $params['limit'] ??  BaseRequestAttribute::LIMIT_DEFAULT,
                'search'        => $params['search'] ??  BaseRequestAttribute::DEFAULT_NULL,
                'filters'       => $params['filters'] ?? [],
                'columns'       =>  ['*'],
                'column_search' => $this->columnSearch ?? [],
            ]
        );
    }
}
