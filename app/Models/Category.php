<?php

namespace App\Models;

use App\Traits\HasFilter;
use App\Traits\ImageGallery;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Kalnoy\Nestedset\NodeTrait;

class Category extends Model implements HasMedia
{
    use HasFactory, ImageGallery, HasFilter, NodeTrait;
    
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
        'parent_id'
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
        'images',
        'parent_id',
        'children',
        'type'
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'images',
        'type'
    ];
    

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function products()
    {
        return $this->belongsToMany(Product::class)->with('media');
    }

    public function getTypeAttribute() 
    {
        return 'category';
    }
}
