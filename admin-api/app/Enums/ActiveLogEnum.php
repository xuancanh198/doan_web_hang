<?php

namespace App\Enums;

enum ActiveLogEnum
{
    const CATEGORY_VALUE = "category";

    const TYPE_LOG_ADMIN = 'admin';

    const CATEGORY_COLUMN_LOG_ACTIVE = ['name', 'code', 'status', 'parent_id'];


    const AUTHOR_COLUMN_LOG_ACTIVE = ['name', 'code', 'status', 'parent_id'];

    const SETTING_COLUMN_LOG_ACTIVE = ['key', 'value', 'group', 'type'];
}
