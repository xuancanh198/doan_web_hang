<?php

namespace App\Enums;

enum TablesEnum
{
    const PRIMARY_ID = "id";

    const PUBLISHER_TABLE = 'publisher';

    const CATEGORY_TABLE = 'category';

    const PRODUCT_TABLE = 'product';

    const ProductInventoryLogs_TABLE = 'product_inventory_logs';

    const Product_Import_Exports_TABLE = 'product_import_exports';

    const PERMISSTION_TABLE = 'permisstion';

    const ACTION_TABLE = 'action';

    const PERMISSTION_DETAIL_TABLE = 'permisstion_detail';

    const SERIES_TABLE = 'series';


    const ROLE_TABLE = 'role';

    const STAFF_TABLE = 'staff';

    const AUTHOR_TABLE = 'author';

    const SETTING_TABLE = 'settings';

    const LOGACTIVE_TABLE = 'activity_log';

    const CATEGORY_COLUMN = ['name', 'code', 'status', 'parent_id', 'image', 'description', 'created_at', 'updated_at'];

    const LOGACTIVE_COLUMN = ['log_name', 'description', 'subject_type', 'event', 'subject_id', 'causer_type', 'causer_id', 'properties', 'batch_uuid', 'created_at', 'updated_at'];


    const PERMISSTIONDETAIL_COLUMN_HIDDEN = ['permisstion_id', 'action_id'];
    const PERMISSTIONDETAIL_COLUMN = ['name', 'code', 'status', 'url', 'description', 'created_at', 'updated_at'];

    const AUTHOR_COLUMN = ['name', 'code', 'status', 'image', 'description', 'created_at', 'updated_at'];

    const PUBLISHER_COLUMN = ['name', 'code', 'status', 'description', 'created_at', 'updated_at'];

    const SERIES_COLUMN = ['name', 'code', 'status', 'description', 'created_at', 'updated_at'];


    const SETTING_COLUMN = ['name', 'key', 'value', 'group', 'type', 'description', 'created_at', 'updated_at'];

    const PERMISSTION_COLUMN = ['name', 'code', 'status',  'description', 'created_at', 'updated_at'];

    const ACTION_COLUMN = ['name', 'code', 'status',  'description', 'created_at', 'updated_at'];

    const PRODUCT_COLUMN = ['name', 'code', 'status', 'category_id', 'author_id', 'publisher_id', 'price', 'pages', 'view_count', 'quantity', 'add_card_view', 'coverPhoto', 'images', 'lang', 'tags', 'figures', 'published_ad', 'started_ad', 'ended_ad', 'parent_id', 'image', 'description', 'rent_price', 'buy_quantity', 'rent_quantity', 'is_buy', 'is_rent', 'created_at', 'updated_at'];

    const PRODUCT_Inventory_COLUMN = ['product_id', 'code', 'type', 'mode', 'direction', 'quantity', 'source', 'note', 'created_at', 'updated_at'];

    const PRODUCT_ImportExports_COLUMN = ['product_id', 'code', 'action', 'mode', 'quantity', 'import_price', 'expected_sell_price', 'expected_rent_price', 'actual_price_at_that_time', 'note', 'created_at', 'updated_at'];
    const ROLE_COLUMN = ['name', 'code', 'status', 'description', 'created_at', 'updated_at'];

    const STAFF_COLUMN = ['username', 'password', 'code', 'fullname', 'email', 'phone', 'status', 'address', 'describe', 'avatar', 'permisstion_detail', 'created_at', 'updated_at'];

    public const BANNER_TABLE = 'banners';
    public const BANNER_COLUMN = [
        'title',
        'image',
        'link',
        'position',
        'order',
        'status',
        'start_time',
        'end_time',
        'description',
    ];

    const PRODUCT_CASTS = [
        'tags' => 'array',
        'images' => 'array',
    ];

    const ROLE_CASTS = [
        'tags' => 'array',
        'images' => 'array',
        'figures'
    ];
    const PRODUCT_COLUMN_COLUMN_HIDDEN = ['category_id', 'author_id', 'publisher_id'];
    const LogOnlyDirtyTrue = true;
}
