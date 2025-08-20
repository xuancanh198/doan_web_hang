<?php

namespace App\Services\Functions\Execute\System\LogActive;

use App\Repositories\System\LogActive\LogActiveRepositoryInterface;
use App\Enums\BaseRequestAttribute;
use App\Http\Resources\LogActiveDetailResource;
use App\Services\Functions\Execute\System\LogActive\LogActiveServiceInterface;

class LogActiveService implements LogActiveServiceInterface
{

    protected $request;

    protected $repository;
    public function __construct(LogActiveRepositoryInterface $repository)
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

    public function deleteAction($id)
    {
        return $this->repository->deleteData($id);
    }

    public function findByView($id)
    {
        return new LogActiveDetailResource($this->repository->findViewDetail($id));
    }
}
