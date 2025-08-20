<?php

namespace App\Repositories\System\LogActive;

interface  LogActiveRepositoryInterface
{
    public function getList(array $query);

    public function findViewDetail(int $id);

    public function deleteData(int|array $id);
}
