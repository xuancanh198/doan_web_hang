<?php

namespace App\Services\Functions\Execute\Product\Category;

use App\Repositories\Product\Category\CategoryRepositoryInterface;
use App\Enums\BaseRequestAttribute;
use App\Services\Functions\Action\Image\UploadImageToFirebase;
use App\Http\Resources\CategoryDetailResource;

class CategoryService implements CategoryServiceInterface
{

    protected $request;

    protected $repository;
    public function __construct(CategoryRepositoryInterface $repository)
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
            'parent_id' => $request->parent_id,
            'status' => $request->status,
            'image' => app(UploadImageToFirebase::class)->upload($request->image),
            'description' => $request->description,
        ];
        $create = $this->repository->createData($data);
        // if ($create && $create['status'] === true) {
        //     UpdateRecordImage::dispatch($request->file('image')->getRealPath(), Category::class, $create['data']?->id);
        // }

        return $create['status'];
    }

    public function updateAction($id, $request)
    {
        $data = [
            'name' => $request->name,
            'code' => $request->code,
            'parent_id' => $request->parent_id,
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
        return new CategoryDetailResource($this->repository->findViewDetail($id)->load(['children', 'parent']));
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
