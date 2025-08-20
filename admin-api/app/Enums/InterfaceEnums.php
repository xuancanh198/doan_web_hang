<?php

namespace App\Enums;

enum InterfaceEnums
{
    const REPOSITORY_LINK =  [
        'App\Repositories\Product\Product\ProductRepositoryInterface' => 'App\Repositories\Product\Product\ProductRepository',
        'App\Repositories\Product\Category\CategoryRepositoryInterface' => 'App\Repositories\Product\Category\CategoryRepository',
        'App\Repositories\Product\Publisher\PublisherRepositoryInterface' => 'App\Repositories\Product\Publisher\PublisherRepository',
        'App\Repositories\Product\Author\AuthorRepositoryInterface' => 'App\Repositories\Product\Author\AuthorRepository',
        'App\Repositories\Product\Series\SeriesRepositoryInterface' => 'App\Repositories\Product\Series\SeriesRepository',
        'App\Repositories\System\Setting\SettingRepositoryInterface' => 'App\Repositories\System\Setting\SettingRepository',
        'App\Repositories\System\LogActive\LogActiveRepositoryInterface' => 'App\Repositories\System\LogActive\LogActiveRepository',
        'App\Repositories\Permisstion\Permisstion\PermisstionRepositoryInterface' => 'App\Repositories\Permisstion\Permisstion\PermisstionRepository',
        'App\Repositories\Permisstion\Action\ActionRepositoryInterface' => 'App\Repositories\Permisstion\Action\ActionRepository',
        'App\Repositories\Permisstion\PermisstionDetail\PermisstionDetailRepositoryInterface' => 'App\Repositories\Permisstion\PermisstionDetail\PermisstionDetailRepository',
        'App\Repositories\Staff\Role\RoleRepositoryInterface' => 'App\Repositories\Staff\Role\RoleRepository',
        'App\Repositories\Staff\Staff\StaffRepositoryInterface' => 'App\Repositories\Staff\Staff\StaffRepository',
        'App\Repositories\System\Banner\BannerRepositoryInterface' => 'App\Repositories\System\Banner\BannerRepository',
    ];
    const SERVICES_LINK =  [
        'App\Services\Functions\Execute\Product\Product\ProductServiceInterface' => 'App\Services\Functions\Execute\Product\Product\ProductService',
        'App\Services\Functions\Execute\Product\Category\CategoryServiceInterface' => 'App\Services\Functions\Execute\Product\Category\CategoryService',
        'App\Services\Functions\Execute\Product\Publisher\PublisherServiceInterface' => 'App\Services\Functions\Execute\Product\Publisher\PublisherService',
        'App\Services\Functions\Execute\Product\Author\AuthorServiceInterface' => 'App\Services\Functions\Execute\Product\Author\AuthorService',
        'App\Services\Functions\Execute\Product\Series\SeriesServiceInterface' => 'App\Services\Functions\Execute\Product\Series\SeriesService',
        'App\Services\Functions\Execute\System\Setting\SettingServiceInterface' => 'App\Services\Functions\Execute\System\Setting\SettingService',
        'App\Services\Functions\Execute\System\LogActive\LogActiveServiceInterface' => 'App\Services\Functions\Execute\System\LogActive\LogActiveService',
        'App\Services\Functions\Execute\Permisstion\Permisstion\PermisstionServiceInterface' => 'App\Services\Functions\Execute\Permisstion\Permisstion\PermisstionService',
        'App\Services\Functions\Execute\Permisstion\Action\ActionServiceInterface' => 'App\Services\Functions\Execute\Permisstion\Action\ActionService',
        'App\Services\Functions\Execute\Permisstion\PermisstionDetail\PermisstionDetailServiceInterface' => 'App\Services\Functions\Execute\Permisstion\PermisstionDetail\PermisstionDetailService',
        'App\Services\Functions\Execute\Staff\Role\RoleServiceInterface' => 'App\Services\Functions\Execute\Staff\Role\RoleService',
        'App\Services\Functions\Execute\Staff\Staff\StaffServiceInterface' => 'App\Services\Functions\Execute\Staff\Staff\StaffService',
        'App\Services\Functions\Execute\System\Banner\BannerServiceInterface' => 'App\Services\Functions\Execute\System\Banner\BannerService',
    ];
}
