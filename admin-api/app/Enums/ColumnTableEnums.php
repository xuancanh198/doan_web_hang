<?php

namespace App\Enums;

enum ColumnTableEnums
{
    const COLUMNTABLESEARCHDEFAULT = ['id', 'name', 'code'];

    const COLUMNTABLES_PERMISSTION_DETAIL_EARCHDEFAULT = ['id', 'name', 'code', 'action_id', 'permisstion_id'];

    const COLUMNTABLESELECTDEFAULT = ['id', 'name', 'code'];

    const QUERY_STATUS = [
        'status' => 1
    ];
}
