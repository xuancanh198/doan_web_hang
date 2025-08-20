<?php

namespace App\Repositories;

interface BaseRepositoryInterface
{
    public function getList(array $query);
    public function createData(array $data);

    public function findViewDetail(int $id);
    public function updateData(int $id, array $data);
    public function deleteData(int |array $id);
}
