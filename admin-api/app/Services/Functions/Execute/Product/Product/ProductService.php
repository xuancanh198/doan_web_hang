<?php

namespace App\Services\Functions\Execute\Product\Product;

use Illuminate\Support\Facades\DB;

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
            'coverPhoto' => $request->coverPhoto !== null ? app(UploadImageToFirebase::class)->upload($request->coverPhoto) : null,
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
            'images' => $request->images ? app(UploadImageToFirebase::class)->upload($request->images) : null,
            'coverPhoto' => $request->coverPhoto ? app(UploadImageToFirebase::class)->upload($request->coverPhoto) : null,
            'description' => $request->description ?? null,
        ];
        return $this->repository->updateData($id, $data);
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
        return DB::transaction(function () use ($request) {
            $code = $this->repository->generateUniqueProductCode();

            $data = [
                'product_id' => $request->product_id,
                'code' => $code,
                'type' => $request->type, // Nhập hoặc xuất
                'mode' => $request->mode, // xuất kho, hoàn hàng, ...
                'quantity' => $request->quantity,
                'import_price' => $request->import_price,
                'expected_sell_price' => $request->expected_sell_price,
                'expected_rent_price' => $request->expected_rent_price,
                'actual_price_at_that_time' => $request->actual_price_at_that_time,
                'note' => $request->note,
            ];

            // 1. Tạo bản ghi import/export
            $create = $this->repository->createImportExportData($data);

            // 2. Ghi log
            $this->repository->createLogData([
                'product_id' => $request->product_id,
                'code' => $code,
                'action' => $request->action,
                'mode' => $request->mode,
                'direction' => $request->type,
                'quantity' => $request->quantity,
                'source' => 'manual',
                'note' => $request->note ?? null,
            ]);

            // 3. Cập nhật số lượng
            if ($request->action === ProductTypeQuantityEnums::BUY || $request->action === ProductTypeQuantityEnums::IMPORT) {
                $this->repository->increaseQuantity($request->product_id, [
                    'type' => $request->type,
                    'quantity' => $request->quantity,
                ]);
            } elseif ($request->action === ProductTypeQuantityEnums::SELL || $request->action === ProductTypeQuantityEnums::EXPORT) {
                $this->repository->decreaseQuantity($request->product_id, [
                    'type' => $request->type,
                    'quantity' => $request->quantity,
                ]);
            }

            return $create['status'];
        });
    }


    public function findByViewImportExport($id)
    {
        return new ProductDetailResource(
            $this->repository->findViewImportExport($id, ['product'])
        );
    }

    public function findByViewLog($id)
    {
        return new ProductDetailResource(
            $this->repository->findViewLog($id, ['product'])
        );
    }

    public function updateImportExportAction($id, $request)
    {
        $findData = $this->repository->findViewImportExport($id, ['product']);

        // Lấy số lượng kho hiện tại theo loại sản phẩm
        $available_quantity = $findData->model === ProductTypeQuantityEnums::SELL
            ? $findData->product->buy_quantity
            : $findData->product->rent_quantity;

        // Tính delta: số lượng mới - số lượng cũ
        $delta_quantity = $request->quantity - $findData->quantity;

        // Nếu giảm kho mà vượt số lượng thực tế, cảnh báo
        if ($available_quantity - abs($delta_quantity) < 0) {
            return [
                'status' => 'warning',
                'message' => 'Không thể thực hiện do sai số lớn hơn số lượng hàng trong kho',
                'typeFullText' => true
            ];
        }
        return DB::transaction(function () use ($request, $findData, $delta_quantity, $id) {
            $data = [
                'quantity' => $request->quantity,
                'import_price' => $request->import_price,
                'expected_sell_price' => $request->expected_sell_price,
                'expected_rent_price' => $request->expected_rent_price,
                'actual_price_at_that_time' => $request->actual_price_at_that_time,
                'note' => $request->note,
            ];
            // 1. Tạo bản ghi import/export
            $update = $this->repository->updateImportExportData($id, $data);
            // 2. Ghi log
            $this->repository->createLogData([
                'product_id' => $findData->product_id,
                'code' =>  'UPDATE' . $findData->code,
                'action' => 'updateImportExport',
                'mode' => $findData->mode,
                'direction' => $findData->type,
                'quantity' => $request->quantity,
                'source' => 'manual',
                'note' => $request->note ?? 'Thay đổi số lượng nhập xuất',
            ]);

            // 3. Cập nhật số lượng
            if ($delta_quantity > 0) {
                $this->repository->increaseQuantity($request->product_id, [
                    'type' => ProductTypeQuantityEnums::INCREASE,
                    'quantity' => $request->quantity,
                ]);
            } elseif ($delta_quantity < 0) {
                $this->repository->decreaseQuantity($request->product_id, [
                    'type' => ProductTypeQuantityEnums::DECREASE,
                    'quantity' => $request->quantity,
                ]);
            }

            return [
                'status' => $update['status'],
                'typeFullText' => false
            ];
        });
    }

    public function deleteImportExportAction($id)
    {
        $findData = $this->repository->findViewImportExport($id, ['product']);

        // Lấy số lượng kho hiện tại theo loại sản phẩm
        $available_quantity = $findData->model === ProductTypeQuantityEnums::SELL
            ? $findData->product->buy_quantity
            : $findData->product->rent_quantity;

        $delta_quantity =  $findData->quantity;

        // Nếu giảm kho mà vượt số lượng thực tế, cảnh báo
        if ($available_quantity - abs($delta_quantity) < 0) {
            return [
                'status' => 'warning',
                'message' => trans('message.insufficient_quantity')
            ];
        }
        return DB::transaction(function () use ($findData, $delta_quantity) {
            $delete = $this->repository->deleteDataImportExport($findData->id);

            // 2. Ghi log
            $this->repository->createLogData([
                'product_id' => $findData->product_id,
                'code' =>  'DELETE' . $findData->code,
                'action' => 'deleteImportExport',
                'mode' => $findData->mode,
                'direction' => $findData->type,
                'quantity' => $findData->quantity,
                'source' => 'manual',
                'note' => $request->note ?? 'Thay đổi số lượng nhập xuất',
            ]);

            $this->repository->decreaseQuantity($findData->product_id, [
                'type' => ProductTypeQuantityEnums::DECREASE,
                'quantity' => $findData->quantity,
            ]);

            return $delete['status'];
        });
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
