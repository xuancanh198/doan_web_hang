<?php

namespace App\Services\Functions\Execute\Product\Author;

use App\Repositories\Product\Author\AuthorRepositoryInterface;
use App\Enums\BaseRequestAttribute;
use App\Services\Functions\Action\Image\UploadImageToFirebase;
use App\Http\Resources\AuthorDetailResource;

class AuthorService implements AuthorServiceInterface
{

    protected $request;

    protected $repository;
    public function __construct(AuthorRepositoryInterface $repository)
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
            'image' => app(UploadImageToFirebase::class)->upload($request->image),
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
            'image' =>  $request->file('image') ? app(UploadImageToFirebase::class)->upload($request->file('image')) : null,
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
        return new AuthorDetailResource($this->repository->findViewDetail($id));
    }

    public function getListService($request)
    {
        $data = [
            'page' => $request->page ?? BaseRequestAttribute::PAGE_DEFAULT,
            'limit' => $request->limit ?? BaseRequestAttribute::LIMIT_DEFAULT,
            'search' => $request->search ?? BaseRequestAttribute::DEFAULT_NULL,
            'filters' => $request->filters ?? BaseRequestAttribute::DEFAULT_NULL,
        ];
        return $this->repository->getListRepo($data);
    }
}
