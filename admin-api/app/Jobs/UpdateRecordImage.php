<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Services\Functions\Action\Image\UploadImageToFirebase;

class UpdateRecordImage implements ShouldQueue
{
    use Queueable;

    protected $image;
    protected $modelClass;
    protected $id;
    protected $imageColumn;
    public function __construct($image, string $modelClass, $id, $imageColumn = 'image')
    {
        $this->image = $image;
        $this->modelClass = $modelClass;
        $this->id = $id;
        $this->imageColumn = $imageColumn;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $imageNew = app(UploadImageToFirebase::class)->upload($this->image);

        $model = app($this->modelClass);
        $model->where('id', $this->id)->update([
            $this->imageColumn => $imageNew
        ]);
    }
}
