<?php

namespace App\Services\Functions\Execute\Staff\Role;

use App\Repositories\Staff\Role\RoleRepositoryInterface;
use App\Enums\BaseRequestAttribute;
use App\Http\Resources\RoleDetailResource;

class RoleService implements RoleServiceInterface
{

    protected $request;

    protected $repository;
    public function __construct(RoleRepositoryInterface $repository)
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
            'description' => $request->description,
            'permisstion_detail' => $request->permisstion_detail,
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
            'description' => $request->description ?? null,
            'permisstion_detail' => $request->permisstion_detail ?? null,
        ];
        return $this->repository->updateData($id,  $data);
    }

    public function deleteAction($id)
    {
        return $this->repository->deleteData($id);
    }

    public function findByView($id)
    {
        return new RoleDetailResource($this->repository->findViewDetail($id));
    }
}
