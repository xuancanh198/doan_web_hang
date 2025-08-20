<?php

namespace App\Repositories\Product\Product;

use App\Repositories\BaseRepositoryInterface;

interface  ProductRepositoryInterface extends BaseRepositoryInterface
{

    public function findViewDetail(int $id, $repository = []);

    public function updateQuantityGeneric(int $id, array $data, string $column, string $dataKey);

    public function createImportExportData(array $data);

    public function createLogData(array $data);

    public function updateQuantityBuyData(int $id, array $data);

    public function updateQuantityRentData(int $id, array $data);

    public function getListImportExport(array $query);

    public function getListLog(array $query);

    public function getListRepo(array $params = []);
}
