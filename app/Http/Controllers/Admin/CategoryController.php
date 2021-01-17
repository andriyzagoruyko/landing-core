<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Filters\CategoryFilter;
use App\Http\Controllers\Controller;

class CategoryController extends EntityController
{
    protected $model = 'App\Models\Category';

    protected $load = [
        'media', 
        'parent',
        'children.media'
    ];

    protected $dataTypes = [
        'children' => 'array', 
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (!$request->has('root')) {
            return $this->paginate($request);
        } 

        return $this->response(Category::get()->toTree());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $category = $this->updateOrCreate($request);

        return $this->responseWithLoad($category, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        return $this->responseWithLoad($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $category = $this->updateOrCreate($request, $category);

        return $this->response($category, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $this->delete($category);

        return response(null, 204);
    }
}
