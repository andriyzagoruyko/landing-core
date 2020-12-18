<?php

namespace App\Models;

use App\Models\Category;
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

    /**
     * Disable snake case attributes.
     *
     * @var bool
     */
    public static $snakeAttributes = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 
        'description', 
        'article', 
        'price', 
        'sale', 
        'saleEnabled', 
        'saleExpires', 
        'available'
    ];

    /**
     * The attributes that should be visible in arrays.
     *
     * @var array
     */
    protected $visible = [
        'id', 
        'title', 
        'description', 
        'article', 
        //'categories',
        'categoriesIds',
        'price', 
        'sale',
        'saleEnabled', 
        'saleExpires', 
        'available', 
        'images'
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'categoriesIds', 'images', 'saleExpires'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'saleEnabled' => 'boolean',
    ];

    /**
     * Get categories ids.
     *
     * @return string
     */
    public function getCategoriesIdsAttribute()
    {   
        return $this->categories->pluck('id')->toArray();
    }

    /**
     * Get a sale expiration date.
     *
     * @return string
     */
    public function getSaleExpiresAttribute()
    {   
        $saleExpires = $this->attributes['saleExpires'];

        if (empty($saleExpires)) {
            return '';
        }

        return Carbon::parse($saleExpires)->isoFormat('Y-MM-DDTHH:m');
    }

    /**
     * Get a product images collection.
     *
     * @return array
     */
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
            ];
        });

        return $result;
    }

    /**
     * Apply the scope to filter by params.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \App\Filters\QueryFilter $filters
     * @return Builder
     */
    public function scopeFilter(Builder $builder, QueryFilter $filters)
    {
        return $filters->apply($builder);
    }

    /**
     * Add thumbnail conversion for product images collection
     *
     * @param  \Spatie\MediaLibrary\MediaCollections\Models\Media $media
     * @return void
     */
    public function registerMediaConversions(Media $media = null) : void
    {
        $this->addMediaConversion('thumb')
            ->fit(Manipulations::FIT_FILL, 900, 500)
            ->background('ffffff')
            ->quality(80)
            ->withResponsiveImages();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
}
