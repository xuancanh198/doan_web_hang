<?php

namespace App\Services\Functions\Action\Image;

use Intervention\Image\Facades\Image;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class CapacityReductionImage
{
    public function optimizeImage(UploadedFile|string $image, int $quality = 80) {}
}
