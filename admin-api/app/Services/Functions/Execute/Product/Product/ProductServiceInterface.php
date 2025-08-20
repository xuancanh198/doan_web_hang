<?php

namespace App\Services\Functions\Execute\Product\Product;

use App\Services\Functions\Execute\BaseServicesInterface;

interface  ProductServiceInterface extends BaseServicesInterface
{
    public function createImportExportAction($request);
    public function getListLog($request);

    public function getListImportExport($request);
    public function getListService($request);
}
