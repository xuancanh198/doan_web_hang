<?php

namespace App\Services\Functions\Execute\Permisstion\PermisstionDetail;

use App\Repositories\Permisstion\PermisstionDetail\PermisstionDetailRepository;
use App\Enums\BaseRequestAttribute;
use App\Http\Resources\PermisstionDetailResource;

class PermisstionDetailService implements PermisstionDetailServiceInterface
{

    protected $request;

    protected $repository;
    public function __construct(PermisstionDetailRepository $repository)
    {
        $this->repository = $repository;
    }
    public function getList($request)
    {
        $data = [
            'page' => $request->page ?? BaseRequestAttribute::PAGE_DEFAULT,
            'limit' => $request->limit ?? BaseRequestAttribute::LIMIT_DEFAULT,
            'excel' => $request->excel ?? BaseRequestAttribute::DEFAULT_NULL,
            'search' => $request->search ?? BaseRequestAttribute::DEFAULT_NULL,
            'isSelectAll' => $request->isSelectAll ?? BaseRequestAttribute::DEFAULT_FALSE,
            'typeTime' => $request->typeTime ?? BaseRequestAttribute::DEFAULT_NULL,
            'start' => $request->start ?? BaseRequestAttribute::DEFAULT_NULL,
            'end' => $request->end ?? BaseRequestAttribute::DEFAULT_NULL,
            'filtersBase64' => $request->filtersBase64 ?? BaseRequestAttribute::DEFAULT_NULL,
            'filterBaseDecode' => $request->filterBaseDecode ?? BaseRequestAttribute::DEFAULT_NULL,
        ];
        return $this->repository->getList($data);
    }
    public function createAction($request)
    {
        $data = [
            'name' => $request->name,
            'code' => $request->code,
            'status' => $request->status,
            'url' => $request->url,
            'permisstion_id' => $request->permisstion_id,
            'action_id' => $request->action_id,
            'description' => $request->description,
        ];
        $create = $this->repository->createData($data);
        return $create['status'];
    }

    public function updateAction($id, $request)
    {
        $data = [
            'name' => $request->name,
            'code' => $request->code,
            'status' => $request->status,
            'url' => $request->url,
            'permisstion_id' => $request->permisstion_id,
            'action_id' => $request->action_id,
            'description' => $request->description,
        ];
        return $this->repository->updateData($id,  $data);
    }

    public function deleteAction($id)
    {
        return $this->repository->deleteData($id);
    }

    public function findByView($id)
    {
        return new PermisstionDetailResource($this->repository->findViewDetail($id));
    }
}
