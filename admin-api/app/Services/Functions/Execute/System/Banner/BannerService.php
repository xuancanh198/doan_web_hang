<?php

namespace App\Services\Functions\Execute\System\Banner;

use App\Repositories\System\Banner\BannerRepositoryInterface;
use App\Enums\BaseRequestAttribute;
use App\Services\Functions\Action\Image\UploadImageToFirebase;
use App\Http\Resources\BannerDetailResource;

class BannerService implements BannerServiceInterface
{

    protected $request;

    protected $repository;
    public function __construct(BannerRepositoryInterface $repository)
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
            'title' => $request->title,
            'image' => app(UploadImageToFirebase::class)->upload($request->image),
            'link' => $request->link ?? null,
            'position' => $request->position,
            'status' => $request->status ?? 1,
            'order' => $request->order,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'description' => $request->description,
        ];
        $create = $this->repository->createData($data);

        return $create['status'];
    }

    public function updateAction($id, $request)
    {
        $data = [
            'name' => $request->name,
            'title' => $request->title,
            'image' =>  $request->file('image') ? app(UploadImageToFirebase::class)->upload($request->file('image')) : null,
            'link' => $request->link,
            'position' => $request->position,
            'status' => $request->status ?? 1,
            'order' => $request->order,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
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
        return new BannerDetailResource($this->repository->findViewDetail($id));
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
