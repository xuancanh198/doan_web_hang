<?php

namespace App\Http\Controllers\Admin\Product;

use App\Http\Controllers\Controller;
use App\Services\Functions\Execute\Product\Series\SeriesServiceInterface;
use App\Http\Requests\SeriesRequest;
use App\Http\Resources\SeriesAdminResource;

class SeriesController extends Controller
{
    protected $service;
    protected $request;

    public function __construct(SeriesServiceInterface $service, SeriesRequest $request)
    {
        $this->request = $request;
        $this->service = $service;
    }

    public function index()
    {

        return $this->handleRequest(function () {
            $result = $this->service->getList($this->request);
            return $this->returnResponseBase(SeriesAdminResource::class, $this->request, $result);
        });
    }

    public function store()
    {
        return $this->handleRequest(function () {
            $result = $this->service->createAction($this->request);
            return $this->returnResponseMessage($result ? "success" : "fail", 'createAction');
        });
    }

    public function update($id)
    {
        return $this->handleRequest(function () use ($id) {
            $result = $this->service->updateAction($id, $this->request);
            return $this->returnResponseMessage($result ? "success" : "fail", 'updateAction');
        });
    }

    public function show($id)
    {
        return $this->handleRequest(function () use ($id) {
            $result = $this->service->findByView($id);
            return $this->returnDataBase($result);
        });
    }

    public function destroy($id = null)
    {
        if ($id === null) {
            $id = $this->request->id;
        }
        return $this->handleRequest(function () use ($id) {
            $result = $this->service->deleteAction($id);
            return $this->returnResponseMessage($result ? "success" : "fail", 'deleteAction');
        });
    }
}
