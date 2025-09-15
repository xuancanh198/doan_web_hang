<?php

namespace App\Repositories\Product\Product;

use App\Repositories\BaseRepositoryInterface;

interface  ProductRepositoryInterface extends BaseRepositoryInterface
{

    public function findViewDetail(int $id, $repository = []);

    public function updateQuantityGeneric(int $id, array $data, string $column);

    public function createImportExportData(array $data);

    public function createLogData(array $data);

    public function increaseQuantity(int $id, array $data);

    public function decreaseQuantity(int $id, array $data);

    public function getListImportExport(array $query);

    public function getListLog(array $query);

    public function getListRepo(array $params = []);

    public function generateUniqueProductCode();

    public function findViewImportExport(
        int $id,
        $relationship = [],
    );

    public function findViewLog(
        int $id,
        $relationship = [],
    );
    public function deleteDataImportExport(int|array $id);
    public function updateImportExportData($id, array $data);
}
