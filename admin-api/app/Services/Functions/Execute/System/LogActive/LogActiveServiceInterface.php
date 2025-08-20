<?php

namespace App\Services\Functions\Execute\System\LogActive;

interface  LogActiveServiceInterface
{
    public function getList($request);
    public function deleteAction($id);

    public function findByView($id);
}
