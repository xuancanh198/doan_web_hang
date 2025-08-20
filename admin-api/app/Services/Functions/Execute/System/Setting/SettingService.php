<?php

namespace App\Services\Functions\Execute\System\Setting;

use App\Repositories\System\Setting\SettingRepositoryInterface;
use App\Enums\BaseRequestAttribute;
use App\Services\Functions\Action\Image\UploadImageToFirebase;
use App\Http\Resources\SettingDetailResource;
use App\Enums\SettingType;

class SettingService implements SettingServiceInterface
{

    protected $request;

    protected $repository;
    public function __construct(SettingRepositoryInterface $repository)
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
            'key' => $request->key,
            'group' => $request->group,
            'name' => $request->name,
            'type' => $request->type,
            'description' => $request->description ?? null,
        ];

        if ($request->type === 'image' && $request->hasFile('value')) {
            $data['value'] = app(UploadImageToFirebase::class)->upload($request->file('value'));
        } else {
            $data['value'] = $request->value;
        }

        $create = $this->repository->createData($data);
        return $create['status'];
    }


    public function updateAction($id, $request)
    {
        $data = [
            'key' => $request->key,
            'group' => $request->group,
            'name' => $request->name,
            'type' => $request->type,
            'description' => $request->description ?? null,
        ];

        if ($request->type === 'image' && $request->hasFile('value')) {
            $data['value'] = app(UploadImageToFirebase::class)->upload($request->file('value'));
        } else {
            $data['value'] = $request->value;
        }

        return $this->repository->updateData($id, $data);
    }


    public function deleteAction($id)
    {
        return $this->repository->deleteData($id);
    }

    public function findByView($id)
    {
        return new SettingDetailResource($this->repository->findViewDetail($id));
    }
    public function getLangSystemSetting()
    {
        return $this->repository->getBaseSetting('lang');
    }
    public function getPositionBannerSetting()
    {
        return $this->repository->getBaseSetting('position.banner');
    }
}
