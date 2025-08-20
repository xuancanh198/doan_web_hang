<?php

namespace App\Repositories\Product\Product;

use App\Models\Product;
use App\Models\ProductImportExports;
use App\Models\ProductInventoryLogs;
use App\Repositories\BaseRepository;
use App\Enums\BaseRequestAttribute;
use App\Enums\ColumnTableEnums;
use Carbon\Carbon;
use App\Helpers\SlugHelper;
use App\Enums\ProductTypeQuantityEnums;
use Illuminate\Support\Facades\DB;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{

    protected $model;

    protected $modelLog;

    protected $modelExports;
    protected $columnSearch = ColumnTableEnums::COLUMNTABLESEARCHDEFAULT;

    public function __construct(Product $model, ProductInventoryLogs $modelLog, ProductImportExports $modelExports)
    {
        $this->model = $model;
        $this->modelLog = $modelLog;
        $this->modelExports = $modelExports;
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
        $this->model->slug = app(SlugHelper::class)->generateUniqueSlug($this->model, $data['name']);
        $this->model->name = $data['name'];
        $this->model->code = $data['code'];
        $this->model->status = 1;
        $this->model->description = $data['description'];
        $this->model->category_id = $data['category_id'];
        $this->model->author_id  = $data['author_id'];
        $this->model->publisher_id  = $data['publisher_id'];
        $this->model->price  = $data['price'];
        $this->model->rent_price  = $data['rent_price'];
        $this->model->pages = $data['pages'];
        $this->model->coverPhoto  = $data['coverPhoto'];
        $this->model->images  = $data['images'];
        $this->model->lang  = $data['lang'];
        $this->model->tags  = $data['tags'];
        $this->model->figures  = $data['figures'];
        $this->model->published_ad  = $data['published_ad'];
        $this->model->started_ad  = $data['started_ad'];
        $this->model->ended_ad  = $data['ended_ad'];
        $this->model->created_at = Carbon::now();
        return $this->actionThenReturnBoolOrData($this->model, true);
    }

    public function updateData(int $id, array $data)
    {
        $model = $this->model->find($id);
        $model->slug = app(SlugHelper::class)->generateUniqueSlug($this->model, $data['name']);
        $model->name = $data['name'];
        $model->code = $data['code'];
        $model->category_id = $data['category_id'];
        $model->author_id  = $data['author_id'];
        $model->publisher_id  = $data['publisher_id'];
        $model->rent_price  = $data['rent_price'];
        $model->price  = $data['price'];
        $model->pages = $data['pages'];
        $model->lang  = $data['lang'];
        $model->tags  = $data['tags'];
        $model->figures  = $data['figures'];
        $model->published_ad  = $data['published_ad'];
        $model->started_ad  = $data['started_ad'];
        $model->ended_ad  = $data['ended_ad'];
        $model->status = $data['status'];
        $model->is_buy = $data['is_buy'];
        $model->is_rent = $data['is_rent'];
        if ($data['coverPhoto'] && $data['coverPhoto'] !== null) {
            $model->coverPhoto = $data['coverPhoto'];
        }
        if ($data['images'] && $data['images'] !== null) {
            $model->images = $data['images'];
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
    public function findViewDetail(
        int $id,
        $relationship = [],
    ) {
        $result = $this->model;
        if (count($relationship) > 0) {
            $result = $result->with($relationship);
        }
        return $result->find($id);
    }

    public function getListLog(array $query)
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
        $result = $this->getListBaseFun($this->modelLog, $page, $limit, $search, $this->columnSearch, $excel, $typeTime, $start, $end, $filtersBase64, $isSelectAll, $this->columnSearch, $filterBaseDecode);
        return $result;
    }

    public function getListImportExport(array $query)
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
        $result = $this->getListBaseFun($this->modelExports , $page, $limit, $search, $this->columnSearch, $excel, $typeTime, $start, $end, $filtersBase64, $isSelectAll, $this->columnSearch, $filterBaseDecode);
        return $result;
    }


    public function updateQuantityGeneric(int $id, array $data, string $column, string $dataKey)
    {
        $model = $this->model->find($id);
        if (!$model) return false;

        $quantity = (int) ($data[$dataKey] ?? 0);

        if ($data['type'] === ProductTypeQuantityEnums::IMPORT) {
            $model->column += $quantity;
        } elseif ($data['type'] === ProductTypeQuantityEnums::EXPORT) {
            $model->column -= $quantity;
        }

        return $this->actionThenReturnBoolOrData($model, true);
    }

    public function createImportExportData(array $data)
    {
        $this->modelExports->product_id  = $data['product_id'];
        $this->modelExports->code = $data['code'] ?? null;
        $this->modelExports->action = $data['action'];
        $this->modelExports->type = $data['type'];
        $this->modelExports->mode = $data['mode'];
        $this->modelExports->quantity = $data['quantity'];
        $this->modelExports->import_price = $data['import_price'];
        $this->modelExports->expected_sell_price = $data['expected_sell_price'];
        $this->modelExports->expected_rent_price = $data['expected_rent_price'];
        $this->modelExports->actual_price_at_that_time = $data['actual_price_at_that_time'];
        $this->modelExports->note = $data['note'];
        $this->modelExports->created_at = Carbon::now();
        return $this->actionThenReturnBoolOrData($this->modelExports, true);
    }


    public function createLogData(array $data)
    {
        $this->modelLog->product_id  = $data['product_id'];
        $this->modelLog->code = $data['code'] ?? null;
        $this->modelLog->action = $data['action'];
        $this->modelLog->mode  = $data['mode'];
        $this->modelLog->direction = $data['direction'];
        $this->modelLog->quantity = $data['quantity'];
        $this->modelLog->source = $data['source'];
        $this->modelLog->note  = $data['note'];
        $this->modelLog->created_at = Carbon::now();
        return $this->actionThenReturnBoolOrData($this->modelLog, true);
    }

    public function updateQuantityBuyData(int $id, array $data)
    {
        return $this->updateQuantityGeneric($id, $data, 'buy_quantity', 'buy_quantity');
    }

    public function updateQuantityRentData(int $id, array $data)
    {
        return $this->updateQuantityGeneric($id, $data, 'rent_quantity', 'rent_quantity');
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
