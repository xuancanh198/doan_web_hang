<?php

namespace App\Enums;

enum LabelSystemEnum
{
    const FILTER_TYPE_CHECK_NULL = "checkNull";
    const FILTER_VALUE_NULL = "null";
    const FILTER_VALUE_NOT_NULL = "notNull";
    const FILTER_TYPE_COLUMN = "filterColumn";
    const FILTER_TYPE_RELATIONSHIP = "filterRelationship";
    const FILTER_TYPE_METHOD = "method";
    const FILTER_CHECK_TIME_NOW = "checkTimeNow";
}
