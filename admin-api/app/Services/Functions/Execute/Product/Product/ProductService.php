<?php

namespace App\Services\Functions\Execute\Product\Product;

use App\Repositories\Product\Product\ProductRepositoryInterface;
use App\Enums\BaseRequestAttribute;
use App\Services\Functions\Action\Image\UploadImageToFirebase;
use App\Http\Resources\ProductDetailResource;
use App\Enums\ProductTypeQuantityEnums;

class ProductService implements ProductServiceInterface
{

    protected $request;

    protected $repository;
    public function __construct(ProductRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }
    public function getList($request)
    {
        $data = [
            'page' => $request->page ?? BaseRequestAttribute::PAGE_DEFAULT,
            'limit' => $request->limit ?? BaseRequestAttribute::LIMIT_DEFAULT,
            'excel' => $request->excel ?? BaseRequestAttribute::DEFAULT_NULL,
            'search' => $request->search ?? BaseRequestAttribute::DEFAULT_NULL,
            'isSelectAll' => $request->isSelectAll ?? BaseRequestAttribute::DEFAULT_FALSE,
            'typeTime' => $request->typeTime ?? BaseRequestAttribute::DEFAULT_NULL,
            'start' => $request->start ?? BaseRequestAttribute::DEFAULT_NULL,
            'end' => $request->end ?? BaseRequestAttribute::DEFAULT_NULL,
            'filtersBase64' => $request->filtersBase64 ?? BaseRequestAttribute::DEFAULT_NULL,
            'filterBaseDecode' => $request->filterBaseDecode ?? BaseRequestAttribute::DEFAULT_NULL,
        ];
        return $this->repository->getList($data);
    }
    public function createAction($request)
    {

        $data = [
            'name' => $request->name,
            'code' => $request->code,
            'category_id' => $request->category_id,
            'author_id' => $request->author_id,
            'publisher_id' => $request->publisher_id,
            'price' => $request->price,
            'rent_price' => $request->rent_price,
            'is_buy' => $request->is_buy,
            'is_rent' => $request->is_rent,
            'pages' => $request->pages,
            'lang' => $request->lang,
            'figures' => $request->figures,
            'published_ad' => $request->published_ad,
            'started_ad' => $request->started_ad,
            'tags' => $request->tags,
            'ended_ad' => $request->ended_ad,
            'images' => $request->images !== null ? app(UploadImageToFirebase::class)->upload($request->images) : null,
            'coverPhoto' => $request->coverPhoto !== null ?  app(UploadImageToFirebase::class)->upload($request->coverPhoto) : null,
            'description' => $request->description ?? null,
        ];
        $create = $this->repository->createData($data);

        return $create['status'];
    }

    public function updateAction($id, $request)
    {
        $data = [
            'name' => $request->name,
            'code' => $request->code,
            'category_id' => $request->category_id,
            'author_id' => $request->author_id,
            'publisher_id' => $request->publisher_id,
            'price' => $request->price,
            'rent_price' => $request->rent_price,
            'pages' => $request->pages,
            'lang' => $request->lang,
            'is_buy' => $request->is_buy,
            'is_rent' => $request->is_rent,
            'figures' => $request->figures,
            'tags' => $request->tags,
            'status' => $request->status,
            'published_ad' => $request->published_ad,
            'started_ad' => $request->started_ad,
            'ended_ad' => $request->ended_ad,
            'images' => $request->images ?  app(UploadImageToFirebase::class)->upload($request->images) : null,
            'coverPhoto' => $request->coverPhoto ?  app(UploadImageToFirebase::class)->upload($request->coverPhoto) : null,
            'description' => $request->description ?? null,
        ];
        return $this->repository->updateData($id,  $data);
    }

    public function deleteAction($id)
    {
        return $this->repository->deleteData($id);
    }

    public function findByView($id)
    {
        return new ProductDetailResource(
            $this->repository->findViewDetail($id, ['author', 'category', 'publisher'])
        );
    }

    public function getListLog($request)
    {
        $data = [
            'page' => $request->page ?? BaseRequestAttribute::PAGE_DEFAULT,
            'limit' => $request->limit ?? BaseRequestAttribute::LIMIT_DEFAULT,
            'excel' => $request->excel ?? BaseRequestAttribute::DEFAULT_NULL,
            'search' => $request->search ?? BaseRequestAttribute::DEFAULT_NULL,
            'isSelectAll' => $request->isSelectAll ?? BaseRequestAttribute::DEFAULT_FALSE,
            'typeTime' => $request->typeTime ?? BaseRequestAttribute::DEFAULT_NULL,
            'start' => $request->start ?? BaseRequestAttribute::DEFAULT_NULL,
            'end' => $request->end ?? BaseRequestAttribute::DEFAULT_NULL,
            'filtersBase64' => $request->filtersBase64 ?? BaseRequestAttribute::DEFAULT_NULL,
            'filterBaseDecode' => $request->filterBaseDecode ?? BaseRequestAttribute::DEFAULT_NULL,
        ];
        return $this->repository->getListLog($data);
    }

    public function getListImportExport($request)
    {
        $data = [
            'page' => $request->page ?? BaseRequestAttribute::PAGE_DEFAULT,
            'limit' => $request->limit ?? BaseRequestAttribute::LIMIT_DEFAULT,
            'excel' => $request->excel ?? BaseRequestAttribute::DEFAULT_NULL,
            'search' => $request->search ?? BaseRequestAttribute::DEFAULT_NULL,
            'isSelectAll' => $request->isSelectAll ?? BaseRequestAttribute::DEFAULT_FALSE,
            'typeTime' => $request->typeTime ?? BaseRequestAttribute::DEFAULT_NULL,
            'start' => $request->start ?? BaseRequestAttribute::DEFAULT_NULL,
            'end' => $request->end ?? BaseRequestAttribute::DEFAULT_NULL,
            'filtersBase64' => $request->filtersBase64 ?? BaseRequestAttribute::DEFAULT_NULL,
            'filterBaseDecode' => $request->filterBaseDecode ?? BaseRequestAttribute::DEFAULT_NULL,
        ];
        return $this->repository->getListImportExport($data);
    }

    public function createImportExportAction($request)
    {
        $data = [
            'product_id' => $request->product_id,
            'code' => $request->code ?? null,
            'action' => $request->action, // mua , thuê, 
            'type' => $request->type, // Nhập hoặc xuất
            'mode' => $request->mode, // xuất kho, hoàn hàng, ...
            'quantity' => $request->quantity,
            'import_price' => $request->import_price,
            'expected_sell_price' => $request->expected_sell_price,
            'expected_rent_price' => $request->expected_rent_price,
            'actual_price_at_that_time' => $request->actual_price_at_that_time,
            'note' => $request->note,
        ];

        $create = $this->repository->createImportExportData($data);
        $this->createLogAction([
            'product_id' => $request->product_id,
            'code' => $request->code ?? null,
            'action' => $request->action,
            'mode' => $request->mode,
            'direction' => $request->direction,
            'quantity' => $request->quantity,
            'source' => 'manual',
            'note' => $request->note ?? null,
        ]);
        if ($request->action === ProductTypeQuantityEnums::BUY) {
            $this->repository->updateQuantityBuyData($request->product_id, ['action' => $request->action]);
        } else if ($request->action === ProductTypeQuantityEnums::SELL) {
            $this->repository->updateQuantityRentData($request->product_id, ['action' => $request->action]);
        }

        return $create['status'];
    }

    public function createLogAction($data)
    {
        $data = [
            'product_id' => $data->product_id,
            'code' => $data->code ?? null,
            'action' => $data->action, /// hành động
            'mode' => $data->mode, /// 
            'direction' => $data->type, // tăng hay giảm (+ hoặc -)
            'quantity' => $data->quantity, // số lượng
            'source' => 'manual',
            'note' => $request->note ?? null,
        ];

        $create = $this->repository->createLogData($data);

        return $create['status'];
    }

    public function getListService($request)
    {
        $data = [
            'page' => $request->page ?? BaseRequestAttribute::PAGE_DEFAULT,
            'limit' => $request->limit ?? BaseRequestAttribute::LIMIT_DEFAULT,
            'search' => $request->search ?? BaseRequestAttribute::DEFAULT_NULL,
            'filters' => $request->filters ?? BaseRequestAttribute::DEFAULT_NULL,
        ];
        return $this->repository->getListRepo($data);
    }
}
