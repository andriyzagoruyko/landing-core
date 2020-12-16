<?php

namespace App\Models;

use App\Filters\QueryFilter;
use Illuminate\Support\Carbon;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\HasMedia;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\Support\ImageFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Product extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    public static $snakeAttributes = false;

    protected $fillable = [
        'title', 'description', 'article', 'price', 'sale', 'saleEnabled', 'saleExpires', 'available'
    ];

    protected $visible = [
        'id', 'title', 'description', 'article', 'price', 'sale', 'saleEnabled', 'saleExpires', 'available', 'images'
    ];

    protected $appends = [
        'images', 'saleExpires'
    ];

    protected $casts = [
        'saleEnabled' => 'boolean',
    ];

    public function getSaleExpiresAttribute()
    {   
        $saleExpires = $this->attributes['saleExpires'];

        if (empty($saleExpires)) {
            return '';
        }

        return Carbon::parse($saleExpires)->isoFormat('Y-MM-DDTHH:m');
    }

    public function getImagesAttribute() {
        $medias = $this->getMedia('images');

        $medias->each(function($media) use (&$result){
            $image = ImageFactory::load($media->getPath('thumb'));

            $result[] = [
                'id' => $media->id,
                'width' => $image->getWidth(),
                'height' => $image->getHeight(),
                'src' => $media->getUrl('thumb'),
                'srcSet' => $media->getSrcset('thumb'),
                'original' => $media->getUrl()
                //'placeholder' => $media->responsive_images['thumb']['base64svg'],
            ];
        });

        return $result;
    }

    public function scopeFilter(Builder $builder, QueryFilter $filters)
    {
        return $filters->apply($builder);
    }

    public function registerMediaConversions(Media $media = null) : void
    {
        $this->addMediaConversion('thumb')
            ->fit(Manipulations::FIT_FILL, 900, 500)
            ->background('ffffff')
            ->quality(80)
            ->withResponsiveImages();
    }
}
