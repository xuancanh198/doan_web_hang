<?php

namespace App\Enums;

enum ImportExportEnum
{
    // Status
    const STATUS_PENDING = 'pending';
    const STATUS_PROCESSING = 'processing';
    const STATUS_SUCCESS = 'success';
    const STATUS_FAILED = 'failed';
    const STATUS_STOPPED = 'stopped';
    const STATUS_PARTIAL = 'partial';

        // Type
    const TYPE_IMPORT = 'import';
    const TYPE_EXPORT = 'export';

        // Log Type
    const LOG_START = 'start';
    const LOG_ERROR = 'error';
    const LOG_RETRY = 'retry';
    const LOG_CONTINUE = 'continue';
    const LOG_STOP = 'stop';
    const LOG_COMPLETE = 'complete';

    const CREATE_NEW = 'create_new';
}
