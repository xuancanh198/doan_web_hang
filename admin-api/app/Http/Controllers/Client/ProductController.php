<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Services\Functions\Execute\Product\Product\ProductServiceInterface;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryAdminResource;


class ProductController extends Controller
{
    protected $service;
    protected $request;

    public function __construct(ProductServiceInterface $service, CategoryRequest $request)
    {
        $this->request = $request;
        $this->service = $service;
    }

    public function index()
    {
        return $this->handleRequest(function () {
            $result = $this->service->getListService($this->request);
            return $this->returnResponseBase(CategoryAdminResource::class, $this->request, $result);
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
