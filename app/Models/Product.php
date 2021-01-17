<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Support\Carbon;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Traits\ImageGallery;
use App\Traits\HasFilter;

class Product extends Model implements HasMedia
{
    use HasFactory, ImageGallery, HasFilter;

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
        'available',
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
        'categories',
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
        'images', 'saleExpires'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'saleEnabled' => 'boolean',
    ];

    /*protected $with = [
        'categories'
    ];*/

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
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
}
