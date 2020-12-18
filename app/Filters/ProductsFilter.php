<?php

namespace App\Filters;

class ProductsFilter extends QueryFilter
{
    /* public function category($id)
    {
        return $this->builder->where('category_id', $id);
    }*/

    public function search($keyword)
    {
        $fields = ['title', 'article'];

        $this->builder->Where(function($query) use ($fields, $keyword)
        {
            foreach($fields as $field) {
                $query->orWhere( $field, 'like', '%'.$keyword.'%');
            }
        });

        return $this->builder;
    }

    public function available($range)
    {
        return $this->filterRange('available', explode(';', $range));
    }

    public function price($range)
    {
        return $this->filterRange('price', explode(';', $range));
    }
}