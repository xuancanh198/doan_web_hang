<?php

namespace App\Http\Controllers\Admin\Product;

use App\Http\Controllers\Controller;
use App\Services\Functions\Execute\Product\Product\ProductServiceInterface;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\ProductImportExportRequest;
use App\Http\Resources\ProductAdminResource;
use App\Http\Resources\ProductAdminImportExportResource;
use App\Http\Resources\ProductAdminLogResource;

class ProductController extends Controller
{
    protected $service;

    public function __construct(ProductServiceInterface $service)
    {
        $this->service = $service;
    }

    public function index(ProductRequest $request)
    {
        return $this->handleRequest(function () use ($request) {
            $result = $this->service->getList($request);
            return $this->returnResponseBase(ProductAdminResource::class, $request, $result);
        });
    }

    public function store(ProductRequest $request)
    {
        return $this->handleRequest(function () use ($request) {
            $result = $this->service->createAction($request);
            return $this->returnResponseMessage($result ? "success" : "fail", 'createAction');
        });
    }

    public function update($id, ProductRequest $request)
    {
        return $this->handleRequest(function () use ($id, $request) {
            $result = $this->service->updateAction($id, $request);
            return $this->returnResponseMessage($result['status'] ? "success" : "fail", 'updateAction', $result['typeFullText']);
        });
    }

    public function show($id)
    {
        return $this->handleRequest(function () use ($id) {
            $result = $this->service->findByView($id);
            return $this->returnDataBase($result);
        });
    }

    public function showImportExport($id)
    {
        return $this->handleRequest(function () use ($id) {
            $result = $this->service->findByViewImportExport($id);
            return $this->returnDataBase($result);
        });
    }

    public function showLog($id)
    {
        return $this->handleRequest(function () use ($id) {
            $result = $this->service->findByViewLog($id);
            return $this->returnDataBase($result);
        });
    }

    public function destroy($id = null, ProductRequest $request)
    {
        if ($id === null) {
            $id = $request->id;
        }
        return $this->handleRequest(function () use ($id) {
            $result = $this->service->deleteAction($id);
            return $this->returnResponseMessage($result ? "success" : "fail", 'deleteAction');
        });
    }

    public function getListLog(ProductImportExportRequest $request)
    {
        return $this->handleRequest(function () use ($request) {
            $result = $this->service->getListLog($request);
            return $this->returnResponseBase(ProductAdminLogResource::class, $request, $result);
        });
    }

    public function getLisImportExport(ProductImportExportRequest $request)
    {
        return $this->handleRequest(function () use ($request) {
            $result = $this->service->getListImportExport($request);
            return $this->returnResponseBase(ProductAdminImportExportResource::class, $request, $result);
        });
    }

    public function createImportExport(ProductImportExportRequest $request)
    {
        return $this->handleRequest(function () use ($request) {
            $result = $this->service->createImportExportAction($request);
            return $this->returnResponseMessage($result ? "success" : "fail", 'createAction');
        });
    }

    public function updateImportExport($id, ProductImportExportRequest $request)
    {
        return $this->handleRequest(function () use ($id, $request) {
            $result = $this->service->updateImportExportAction($id, $request);
            return $this->returnResponseMessage($result ? "success" : "fail", 'updateAction');
        });
    }

    public function destroyImportExport($id = null, ProductImportExportRequest $request)
    {
        if ($id === null) {
            $id = $request->id;
        }
        return $this->handleRequest(function () use ($id) {
            $result = $this->service->deleteAction($id);
            return $this->returnResponseMessage($result ? "success" : "fail", 'deleteAction');
        });
    }
}
