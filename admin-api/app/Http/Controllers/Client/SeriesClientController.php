<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Services\Functions\Execute\Product\Series\SeriesServiceInterface;
use App\Http\Requests\SeriesRequest;
use App\Http\Resources\SeriesAdminResource;

class SeriesClientController extends Controller
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
            $result = $this->service->getListService($this->request);
            return $this->returnResponseBase(SeriesAdminResource::class, $this->request, $result);
        });
    }
    public function show($id)
    {
        return $this->handleRequest(function () use ($id) {
            $result = $this->service->findByView($id);
            return $this->returnDataBase($result);
        });
    }
}
