<?php

namespace App\Filters;

class ProductFilter extends QueryFilter
{
    /* public function category($id)
    {
        return $this->builder->where('category_id', $id);
    }*/

    public function search($keyword)
    {
        return $this->searchByFields($keyword, ['title', 'article']);
    }

    public function available($param, $name)
    {
        return $this->filterByRange($param, $name);
    }

    public function price($param, $name)
    {
        return $this->filterByRange($param, $name);
    }
}