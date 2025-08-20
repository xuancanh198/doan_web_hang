<?php

namespace App\Repositories;

use App\Enums\LabelSystemEnum;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;


class  BaseRepository
{
    public function getListBaseFun(
        $model,
        $page = 1,
        $limit = 10,
        $search,
        $columSearch,
        $excel = false,
        $typeTime = null,
        $start = null,
        $end = null,
        $filtersBase64 = null,
        $isSelect = false,
        $columnSelect = [],
        $filterBaseDecode = null
    ) {
        $query = $model->newQuery();
        if (filter_var($isSelect, FILTER_VALIDATE_BOOLEAN) || $isSelect == "true") {
            try {
                $query->select($columnSelect);
                return $query->get();
            } catch (\Throwable $e) {
            }
        }

        if ($excel === true) {
            return $query->get();
        }

        if ($search !== null) {
            try {
                foreach ($columSearch as $index => $item) {
                    if ($index === 0) {
                        $query->where($item, 'LIKE', '%' . $search . '%');
                    } else {
                        $query->orWhere($item, 'LIKE', '%' . $search . '%');
                    }
                }
            } catch (\Throwable $e) {
            }
        }

        if ($start !== null && $end !== null && $typeTime !== null) {
            try {
                $query->whereBetween($typeTime, [$start, $end]);
            } catch (\Throwable $e) {
            }
        }
        if ($filterBaseDecode !== null) {
            try {
                $filterDecode = json_decode(base64_decode($filterBaseDecode));
                foreach ($filterDecode as $item) {
                    if ($item?->type === LabelSystemEnum::FILTER_TYPE_CHECK_NULL) {
                        if ($item?->value === LabelSystemEnum::FILTER_VALUE_NULL) {
                            $query->whereNull($item->column);
                        } elseif ($item?->value === LabelSystemEnum::FILTER_VALUE_NOT_NULL) {
                            $query->whereNotNull($item->column);
                        }
                    } elseif ($item?->type === LabelSystemEnum::FILTER_TYPE_COLUMN) {
                        $query->where($item->column, $item->value);
                    } elseif ($item?->type === LabelSystemEnum::FILTER_TYPE_RELATIONSHIP && $item?->relationship) {
                        $query->whereHas($item->relationship, function ($query) use ($item) {
                            $query->whereIn($item->column, $item->value);
                        });
                    } elseif ($item?->type === LabelSystemEnum::FILTER_TYPE_RELATIONSHIP && $item?->relationship) {
                        $query->where($item->column, (int) $item->value);
                    } elseif ($item?->type === LabelSystemEnum::FILTER_TYPE_METHOD) {
                        $method = $item->column;
                        $query->$method((int) $item->value);
                    } elseif ($item?->type === LabelSystemEnum::FILTER_CHECK_TIME_NOW) {
                        $query->where($item->column, $item->value, Carbon::now());
                    }
                }
            } catch (\Throwable $e) {
            }
        }
        if ($filtersBase64 !== null) {

            try {
                $arrayFilter = json_decode(base64_decode($filtersBase64), true);
                foreach ($arrayFilter as $item) {
                    $query->orderBy($item['colum'], $item['order_by']);
                }
            } catch (\Throwable $e) {
            }
        }
        try {
            $result = $query->paginate($limit, ['*'], 'page', $page);
            return $result;
        } catch (\Throwable $e) {
            return null;
        }
    }

    public function actionThenReturnBoolOrData($model, $returnData = false)
    {
        $result =  $model->save();
        if ($returnData === true) {
            return [
                'status' =>  $result ? true : false,
                'data' =>  $result ? $model : null
            ];
        }
        return $result ? true : false;
    }
    public function deleteOneOrManyRecord($model, $id)
    {
        return is_array($id)
            ? $model->whereIn('id', $id)->delete()
            : $model->where('id', $id)->delete();
    }

    public function queryBase(Builder $model, array $params = [])
    {
        $page = $params['page'] ?? 1;
        $limit = $params['limit'] ?? 10;
        $search = $params['search'] ?? null;
        $filters = $params['filters'] ?? [];
        $columns = $params['columns'] ?? ['*'];
        $columnSearch = $params['column_search'] ?? [];

        $query = $model->newQuery();

        // Tìm kiếm
        if ($search && count($columnSearch)) {
            $query->where(function (Builder $q) use ($search, $columnSearch) {
                foreach ($columnSearch as $index => $column) {
                    if ($index === 0) {
                        $q->where($column, 'LIKE', "%$search%");
                    } else {
                        $q->orWhere($column, 'LIKE', "%$search%");
                    }
                }
            });
        }

        // Sắp xếp
        foreach ($filters as $item) {
            if (!empty($item['colum']) && !empty($item['order_by'])) {
                $query->orderBy($item['colum'], $item['order_by']);
            }
        }

        return $query->paginate($limit, $columns, 'page', $page);
    }
}
