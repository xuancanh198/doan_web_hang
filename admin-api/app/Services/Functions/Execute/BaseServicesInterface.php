<?php

namespace App\Services\Functions\Execute;

interface  BaseServicesInterface
{
    public function getList($request);
    public function createAction($request);

    public function findByView(int $id);
    public function updateAction(int $id, $request);
    public function deleteAction(int |array $id);
}
