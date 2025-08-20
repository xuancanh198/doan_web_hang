<?php

namespace App\Services\Functions\Execute\Staff\Staff;

use App\Repositories\Staff\Staff\StaffRepositoryInterface;
use App\Repositories\Staff\Role\RoleRepositoryInterface;
use App\Enums\BaseRequestAttribute;
use App\Http\Resources\StaffDetailResource;
use App\Services\Functions\Action\Image\UploadImageToFirebase;

class StaffService implements StaffServiceInterface
{

    protected $request;

    protected $repository;

    protected $repositoryRole;
    public function __construct(StaffRepositoryInterface $repository, RoleRepositoryInterface $repositoryRole)
    {
        $this->repository = $repository;
        $this->repositoryRole = $repositoryRole;
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
            'role_id' => $request->role_id,
            'code' => $request->code,
            'username' => $request->username,
            'fullname' => $request->fullname,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'description' => $request->description,
            'avatar' => $request->avatar !== null ? app(UploadImageToFirebase::class)->upload($request->avatar) : null,
            'permisstion_detail' => $this->repositoryRole->findViewDetail($request->role_id)->permisstion_detail ?? null,
        ];
        $create = $this->repository->createData($data);
        return $create['status'];
    }

    public function updateAction($id, $request)
    {
        $data = [
            'role_id' => $request->role_id,
            'code' => $request->code,
            'username' => $request->username,
            'fullname' => $request->fullname,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'description' => $request->description,
            'avatar' => $request->avatar !== null ? app(UploadImageToFirebase::class)->upload($request->avatar) : null,
            'permisstion_detail' => $this->permisstion_detail ?? null,
        ];
        return $this->repository->updateData($id,  $data);
    }

    public function deleteAction($id)
    {
        return $this->repository->deleteData($id);
    }

    public function findByView($id)
    {
        return new StaffDetailResource($this->repository->findViewDetail($id));
    }
}
