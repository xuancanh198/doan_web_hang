<?php

namespace App\Services\Functions\Action\Image;

use App\Services\Functions\Action\Image\UploadImageToFirebase;

class UpdateRecord
{
    public function updateRecordWhenHasUrl($image, $model, $id, $imageColumn = 'image')
    {
        $imageNew = app(UploadImageToFirebase::class)->upload($image);
        $model->where('id', $id)->update([
            $imageColumn => $imageNew
        ]);
        return true;
    }
}
