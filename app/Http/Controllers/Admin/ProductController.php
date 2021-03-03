<?php

namespace App\Http\Controllers\Admin;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Requests\ProductRequest;

class ProductController extends EntityController
{
    protected $model = 'App\Models\Product';

    protected $load = [
        'media',  
        'categories.media',
        'categories.children.media',
    ];

    protected $dataTypes = [
        'saleEnabled' => 'bool'
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->paginate($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        $product = $this->updateOrCreate($request);
        $product->categories()->sync($request->categories ? $request->categories : []);

        return $this->responseWithLoad($product->fresh(), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return $this->responseWithLoad($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, Product $product)
    {
        $product = $this->updateOrCreate($request, $product);
        $product->categories()->sync($request->categories ? $request->categories : []);

        return $this->responseWithLoad($product->fresh(), 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Product $product)
    {
        $this->delete($product);

        return response(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function deletes(Request $request)
    {
        $ids = $request->json()->all();

        return $this->deleteCollection($ids);
    }
}
