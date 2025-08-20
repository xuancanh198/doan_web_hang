<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Product\CategoryController;
use App\Http\Controllers\Admin\Product\PublisherController;
use App\Http\Controllers\Admin\Product\AuthorController;
use App\Http\Controllers\Admin\Product\SeriesController;
use App\Http\Controllers\Admin\Product\ProductController;
use App\Http\Controllers\Admin\System\SettingController;
use App\Http\Controllers\Admin\System\BannerController;
use App\Http\Controllers\Admin\System\LogActiveController;
use App\Http\Controllers\Admin\Permisstion\PermisstionController;
use App\Http\Controllers\Admin\Permisstion\ActionController;
use App\Http\Controllers\Admin\Permisstion\PermisstionDetailController;
use App\Http\Controllers\Admin\Staff\RoleController;
use App\Http\Controllers\Admin\Staff\StaffController;
use App\Http\Controllers\Client\CategoryClientController;
use App\Http\Controllers\Client\SeriesClientController;
use App\Http\Controllers\Client\AuthorClientController;

Route::group(['prefix' => 'admin'], function () {
    Route::group(['prefix' => 'staff'], function () {
        Route::group(['prefix' => 'role'], function () {
            Route::get('/', [RoleController::class, 'index']);
            Route::post('/', [RoleController::class, 'store']);
            Route::get('/{id}', [RoleController::class, 'show']);
            Route::put('/{id}', [RoleController::class, 'update']);
            Route::delete('/{id?}', [RoleController::class, 'destroy']);
        });
        Route::group(['prefix' => 'staff'], function () {
            Route::get('/', [StaffController::class, 'index']);
            Route::post('/', [StaffController::class, 'store']);
            Route::get('/{id}', [StaffController::class, 'show']);
            Route::put('/{id}', [StaffController::class, 'update']);
            Route::delete('/{id?}', [StaffController::class, 'destroy']);
        });
    });
    Route::group(['prefix' => 'product'], function () {
        Route::group(['prefix' => 'category'], function () {
            Route::get('/', [CategoryController::class, 'index']);
            Route::post('/', [CategoryController::class, 'store']);
            Route::get('/{id}', [CategoryController::class, 'show']);
            Route::put('/{id}', [CategoryController::class, 'update']);
            Route::delete('/{id?}', [CategoryController::class, 'destroy']);
        });
        Route::group(['prefix' => 'publisher'], function () {
            Route::get('/', [PublisherController::class, 'index']);
            Route::post('/', [PublisherController::class, 'store']);
            Route::get('/{id}', [PublisherController::class, 'show']);
            Route::put('/{id}', [PublisherController::class, 'update']);
            Route::delete('/{id?}', [PublisherController::class, 'destroy']);
        });
        Route::group(['prefix' => 'author'], function () {
            Route::get('/', [AuthorController::class, 'index']);
            Route::post('/', [AuthorController::class, 'store']);
            Route::get('/{id}', [AuthorController::class, 'show']);
            Route::put('/{id}', [AuthorController::class, 'update']);
            Route::delete('/{id?}', [AuthorController::class, 'destroy']);
        });
        Route::group(['prefix' => 'series'], function () {
            Route::get('/', [SeriesController::class, 'index']);
            Route::post('/', [SeriesController::class, 'store']);
            Route::get('/{id}', [SeriesController::class, 'show']);
            Route::put('/{id}', [SeriesController::class, 'update']);
            Route::delete('/{id?}', [SeriesController::class, 'destroy']);
        });
        Route::group(['prefix' => 'product'], function () {
            Route::get('/', [ProductController::class, 'index']);
            Route::get('/get-log', [ProductController::class, 'getListLog']);
            Route::get('/get-import-export', [ProductController::class, 'getLisImportExport']);
            Route::post('/', [ProductController::class, 'store']);
            Route::post('/create-import-export', [ProductController::class, 'createImportExport']);
            Route::get('/{id}', [ProductController::class, 'show']);
            Route::put('/{id}', [ProductController::class, 'update']);
            Route::delete('/{id?}', [ProductController::class, 'destroy']);
        });
    });
    Route::group(['prefix' => 'system'], function () {
        Route::group(['prefix' => 'setting'], function () {
            Route::get('/', [SettingController::class, 'index']);
            Route::get('/get-system-lang', [SettingController::class, 'getLangSystem']);
            Route::get('/get-position-banner', [SettingController::class, 'getPositionBanner']);
            Route::post('/', [SettingController::class, 'store']);
            Route::get('/{id}', [SettingController::class, 'show']);
            Route::put('/{id}', [SettingController::class, 'update']);
            Route::delete('/{id?}', [SettingController::class, 'destroy']);
        });
        Route::group(['prefix' => 'banner'], function () {
            Route::get('/', [BannerController::class, 'index']);
            Route::post('/', [BannerController::class, 'store']);
            Route::get('/{id}', [BannerController::class, 'show']);
            Route::put('/{id}', [BannerController::class, 'update']);
            Route::delete('/{id?}', [BannerController::class, 'destroy']);
        });
        Route::group(['prefix' => 'log-active'], function () {
            Route::get('/', [LogActiveController::class, 'index']);
            Route::get('/{id}', [LogActiveController::class, 'show']);
            Route::delete('/{id?}', [LogActiveController::class, 'destroy']);
        });
    });
    Route::group(['prefix' => 'permisstion'], function () {
        Route::group(['prefix' => 'permisstion'], function () {
            Route::get('/', [PermisstionController::class, 'index']);
            Route::post('/', [PermisstionController::class, 'store']);
            Route::get('/{id}', [PermisstionController::class, 'show']);
            Route::put('/{id}', [PermisstionController::class, 'update']);
            Route::delete('/{id?}', [PermisstionController::class, 'destroy']);
        });
        Route::group(['prefix' => 'action'], function () {
            Route::get('/', [ActionController::class, 'index']);
            Route::post('/', [ActionController::class, 'store']);
            Route::get('/{id}', [ActionController::class, 'show']);
            Route::put('/{id}', [ActionController::class, 'update']);
            Route::delete('/{id?}', [ActionController::class, 'destroy']);
        });
        Route::group(['prefix' => 'permisstion-detail'], function () {
            Route::get('/', [PermisstionDetailController::class, 'index']);
            Route::post('/', [PermisstionDetailController::class, 'store']);
            Route::get('/{id}', [PermisstionDetailController::class, 'show']);
            Route::put('/{id}', [PermisstionDetailController::class, 'update']);
            Route::delete('/{id?}', [PermisstionDetailController::class, 'destroy']);
        });
    });
});
Route::group(['prefix' => 'client'], function () {
    Route::group(['prefix' => 'category'], function () {
        Route::get('/', [CategoryClientController::class, 'index']);
    });
    Route::group(['prefix' => 'series'], function () {
        Route::get('/', [SeriesClientController::class, 'index']);
    });
    Route::group(['prefix' => 'author'], function () {
        Route::get('/', [AuthorClientController::class, 'index']);
    });
});
