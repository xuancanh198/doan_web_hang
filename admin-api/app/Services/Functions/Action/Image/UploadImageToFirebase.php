<?php

namespace App\Services\Functions\Action\Image;

use Kreait\Firebase\Factory;
use Kreait\Firebase\Storage;

class UploadImageToFirebase
{
    protected $storage;

    public function __construct()
    {
        $this->storage = (new Factory)
            ->withServiceAccount(base_path(env('FIREBASE_CREDENTIALS')))
            ->withDatabaseUri(env('FIREBASE_DATABASE_URL'))
            ->createStorage();
    }


    public function upload($images)
    {
        $isSingle = !is_array($images);
        $images = $isSingle ? [$images] : $images;

        $imageLinks = [];

        foreach ($images as $image) {
            $fileName = time() . '_' . $image->getClientOriginalName();
            $filePath = 'images/' . $fileName;

            try {
                $this->storage->getBucket()->upload(
                    fopen($image->getRealPath(), 'r'),
                    [
                        'name' => $filePath,
                        'predefinedAcl' => 'publicRead',
                    ]
                );
                $imageUrl = sprintf('https://storage.googleapis.com/%s/%s', $this->storage->getBucket()->name(), $filePath);
                $imageLinks[] = $imageUrl;
            } catch (\Exception $e) {
                return false;
            }
        }

        return $isSingle ? $imageLinks[0] : $imageLinks;
    }
}
