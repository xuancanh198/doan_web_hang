<?php

namespace App\Repositories\Product\Category;

use App\Models\Category;
use App\Repositories\BaseRepository;
use App\Enums\BaseRequestAttribute;
use App\Enums\ColumnTableEnums;
use Carbon\Carbon;
use App\Helpers\SlugHelper;
use Illuminate\Database\Eloquent\Builder;

class CategoryRepository extends BaseRepository implements CategoryRepositoryInterface
{

    protected $model;
    protected $columnSearch = ColumnTableEnums::COLUMNTABLESEARCHDEFAULT;

    protected $arrayQueryClient = [
        ColumnTableEnums::QUERY_STATUS
    ];

    public function __construct(Category $model)
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
        $result = $this->getListBaseFun($this->model->isExist(), $page, $limit, $search, $this->columnSearch, $excel, $typeTime, $start, $end, $filtersBase64, $isSelectAll, $this->columnSearch, $filterBaseDecode);
        return $result;
    }
    public function createData(array $data)
    {
        $this->model->slug = app(SlugHelper::class)->generateUniqueSlug($this->model, $data['name']);
        $this->model->name = $data['name'];
        $this->model->code = $data['code'];
        $this->model->status = $data['status'] ?? 1;
        $this->model->parent_id = $data['parent_id'];
        $this->model->image = $data['image'];
        $this->model->description = $data['description'];
        $this->model->created_at = Carbon::now();
        return $this->actionThenReturnBoolOrData($this->model, true);
    }

    public function updateData(int $id, array $data)
    {
        $model = $this->model->find($id);
        $model->slug = app(SlugHelper::class)->generateUniqueSlug($this->model, $data['name']);
        $model->name = $data['name'];
        $model->code = $data['code'];
        $model->status = $data['status'];
        $model->parent_id = $data['parent_id'];
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
            $this->model->isExist()->getStatus(),
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
