<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

trait ImageGallery {

    use InteractsWithMedia;

    static $usingImage = true;

    /**
     * Get size for thumbnail.
     *
     * @return array
     */
    public function getThumbnailSizeAttribute()
    {   
        return [
            'width' => 900,
            'height' => 500
        ];
    }

    /**
     * Get images collection.
     *
     * @return array
     */
    public function getImagesAttribute() {
        $medias = $this->getMedia('images');
        
        $medias->each(function($media) use (&$result){
            $result[] = [
                'id' => $media->id,
                'width' => $this->thumbnailSize['width'],
                'height' => $this->thumbnailSize['height'],
                'src' => $media->getUrl('thumb'),
                'srcSet' => $media->getSrcset('thumb'),
                'original' => $media->getUrl()
            ];
        });

        return $result;
    }

    /**
     * Add thumbnail conversion for images collection
     *
     * @param  \Spatie\MediaLibrary\MediaCollections\Models\Media $media
     * @return void
     */
    public function registerMediaConversions(Media $media = null) : void
    {
        $this->addMediaConversion('thumb')
            ->fit(Manipulations::FIT_FILL, $this->thumbnailSize['width'], $this->thumbnailSize['height'])
            ->background('ffffff')
            ->quality(80)
            ->withResponsiveImages();
    }

    /**
     * Save and update images from request
     *
     * @param  \Illuminate\Http\Request $request
     * @return void
     */
    public function saveImagesFromRequest(Request $request)
    {
        $updateMedia = $request->has('updateMedia') ? $request->updateMedia : [];

        if ($request->hasFile('images')) {
            $this->addMultipleMediaFromRequest(['images'])
                ->each(function ($fileAdder) use (&$updateMedia){
                    $image = $fileAdder->toMediaCollection('images');
                    $index = array_search($image->file_name, $updateMedia);
                    $updateMedia[$index] = $image->id;
                });
        }

        $this->getMedia('images')->each(function($media) use (&$updateMedia){
            if (!in_array($media->id, $updateMedia)) {
                try {
                    $media->delete();
                }catch(NotReadableException $e){ }
            }

            if (!empty($updateMedia)) {
                $index = array_search($media->id, $updateMedia);
                $media->setNewOrder($updateMedia);
            }
        });
    }
}