<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

abstract class QueryFilter
{
    protected $request, $builder;

    protected $delimiter = ';';

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function apply(Builder $builder)
    {
        $this->builder = $builder;

        foreach ($this->filters() as $name => $value) {
            if (method_exists($this, $name)) {
                call_user_func_array([$this, $name], array_filter([$value, $name]));
            }
        }

        return $this->builder;
    }

    public function filters()
    {
        return $this->request->query();
    }

    protected function paramToArray($param)
    {
        return explode($this->delimiter, $param);
    }

    protected function filterByRange($param, $name) {
        $array = $this->paramToArray($param);

        if (isset($array[0])) {
            $this->builder->where($name, '>=', $array[0]);
        }

        if (isset($array[1])) {
            $this->builder->where($name, '<=', $array[1]);
        }

        return $this->builder;
    }

    public function searchByFields($keyword, $fields)
    {
        $this->builder->Where(function($query) use ($fields, $keyword)
        {
            foreach($fields as $field) {
                $query->orWhere( $field, 'like', '%'.$keyword.'%');
            }
        });

        return $this->builder;
    }
}