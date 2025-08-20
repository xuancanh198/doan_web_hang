<?php

namespace App\Http\Controllers\Admin\System;

use App\Http\Controllers\Controller;
use App\Services\Functions\Execute\System\LogActive\LogActiveService;
use App\Http\Requests\LogActiveRequest;
use App\Http\Resources\LogActiveAdminResource;

class LogActiveController extends Controller
{
    protected $service;
    protected $request;

    public function __construct(LogActiveService $service, LogActiveRequest $request)
    {
        $this->request = $request;
        $this->service = $service;
    }

    public function index()
    {
        return $this->handleRequest(function () {
            $result = $this->service->getList($this->request);
            return $this->returnResponseBase(LogActiveAdminResource::class, $this->request, $result);
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
