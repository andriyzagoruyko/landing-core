<?php

namespace App\Traits;

use App\Filters\QueryFilter;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

trait HasFilter 
{
    public static function canFilter() {
        return true;
    }

    public static function useFilter($request) {
        $filterClass = 'App\Filters\\' . class_basename(self::class) . 'Filter';
        return new $filterClass($request);
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
}