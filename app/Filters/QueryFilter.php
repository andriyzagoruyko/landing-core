<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

abstract class QueryFilter
{
    public $request;

    protected $builder;

    protected $delimiter = ',';

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function apply(Builder $builder)
    {
        $this->builder = $builder;

        foreach ($this->filters() as $name => $value) {
            if (method_exists($this, $name)) {
                call_user_func_array([$this, $name], array_filter([$value]));
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

    protected function filterRange($name, $arrayRange) {
        if (isset($arrayRange[0])) {
            $this->builder->where($name, '>=', $arrayRange[0]);
        }

        if (isset($arrayRange[1])) {
            $this->builder->where($name, '<=', $arrayRange[1]);
        }

        return $this->builder;
    }
}