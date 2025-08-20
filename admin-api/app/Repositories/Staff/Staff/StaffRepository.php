<?php

namespace App\Repositories\Staff\Staff;

use App\Models\Staff;
use App\Repositories\BaseRepository;
use App\Enums\BaseRequestAttribute;
use App\Enums\ColumnTableEnums;
use Carbon\Carbon;
use App\Helpers\ConvertData;
use App\Helpers\PassWord;
use Illuminate\Support\Facades\Hash;

class StaffRepository extends BaseRepository implements StaffRepositoryInterface
{

    protected $model;
    protected $columnSearch = ColumnTableEnums::COLUMNTABLESEARCHDEFAULT;

    public function __construct(Staff $model)
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
        $this->model->role_id = $data['role_id'];
        $this->model->code = $data['code'];
        $this->model->username = $data['username'];
        $this->model->password =  Hash::make(app(PassWord::class)->generateRandomPassword());
        $this->model->fullname = $data['fullname'];
        $this->model->email = $data['email'];
        $this->model->phone = $data['phone'];
        $this->model->status = 1;
        $this->model->address = $data['address'];
        $this->model->description = $data['description'];
        $this->model->avatar = $data['avatar'];
        $this->model->permisstion_detail = $data['permisstion_detail'];
        $this->model->created_at = Carbon::now();
        return $this->actionThenReturnBoolOrData($this->model, true);
    }

    public function updateData(int $id, array $data)
    {
        $model = $this->model->find($id);

        $model->role_id = $data['role_id'] ?? $model->role_id;
        $model->code = $data['code'] ?? $model->code;
        $model->username = $data['username'] ?? $model->username;
        $model->fullname = $data['fullname'] ?? $model->fullname;
        $model->email = $data['email'] ?? $model->email;
        $model->phone = $data['phone'] ?? $model->phone;
        $model->status = $data['status'] ?? $model->status;
        $model->address = $data['address'] ?? $model->address;
        $model->description = $data['describe'] ?? $model->description;
        if (isset($data['avatar']) && $data['avatar'] !== null) {
            $model->avatar = $data['avatar'] ?? $model->avatar;
        }
        $model->avatar = $data['avatar'] ?? $model->avatar;

        if (isset($data['permisstion_detail']) && $data['permisstion_detail'] !== null) {
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
        return $this->model->with(['role'])->find($id);
    }
}
