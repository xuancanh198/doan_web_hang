<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Services\Functions\Execute\Product\Author\AuthorServiceInterface;
use App\Http\Requests\AuthorRequest;
use App\Http\Resources\AuthorAdminResource;

class AuthorClientController extends Controller
{
    protected $service;
    protected $request;

    public function __construct(AuthorServiceInterface $service, AuthorRequest $request)
    {
        $this->request = $request;
        $this->service = $service;
    }

    public function index()
    {
        return $this->handleRequest(function () {
            $result = $this->service->getListService($this->request);
            return $this->returnResponseBase(AuthorAdminResource::class, $this->request, $result);
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
