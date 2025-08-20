<?php

namespace App\Services\Functions\Execute\Product\Publisher;

use App\Repositories\Product\Publisher\PublisherRepositoryInterface;
use App\Enums\BaseRequestAttribute;
use App\Http\Resources\PublisherDetailResource;

class PublisherService implements PublisherServiceInterface
{

    protected $request;

    protected $repository;
    public function __construct(PublisherRepositoryInterface $repository)
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
        ];
        return $this->repository->updateData($id,  $data);
    }

    public function deleteAction($id)
    {
        return $this->repository->deleteData($id);
    }

    public function findByView($id)
    {
        return new PublisherDetailResource($this->repository->findViewDetail($id));
    }
}
