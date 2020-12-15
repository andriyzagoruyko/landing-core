<?php

namespace App\Http\Controllers\Admin;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Filters\ProductsFilter;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;
use App\Http\Requests\ProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(ProductsFilter $filter)
    {
        $limit = $filter->request->has('limit') ? $filter->request->limit : 12;
        $query = Product::filter($filter);
        $paginate = $query->orderBy('id', 'DESC')->paginate($limit);

        if ($limit > 100 || $paginate->currentPage() > $paginate->lastPage()) {
            return response()->json('Not found', 404);
        }
        
        return $paginate;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        $product = Product::create($request->all());

        if ($request->hasFile('images')) {
            $product->addMultipleMediaFromRequest(['images'])
                ->each(function ($fileAdder) {
                    $fileAdder->toMediaCollection('images');
                });
        }

        return response()->json($product->fresh(), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return $product;
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
        $updateMedia = $request->has('updateMedia') ? $request->updateMedia : [];
        $product->update($request->all());

        if ($request->hasFile('images')) {
            $product->addMultipleMediaFromRequest(['images'])
                ->each(function ($fileAdder) use (&$updateMedia){
                    $image = $fileAdder->toMediaCollection('images');
                    $index = array_search($image->file_name, $updateMedia);
                    $updateMedia[$index] = $image->id;
                });
        }

        $product->getMedia('images')->each(function($media) use (&$updateMedia){
            if (!in_array($media->id, $updateMedia)) {
                try {
                    $media->delete();
                }catch(NotReadableException $e){ }
            }

            if (!empty($updateMedia)) {
                $index = array_search($media->id, $updateMedia);
                $media->setNewOrder($updateMedia);
            }
        });

        return response()->json($product->fresh(), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Product $product)
    {
        $product->delete();

        if ($request->has('page')) {
            $limit = $request->has('limit') ? $request->limit : 10;
            $paginate = Product::orderBy('id', 'DESC')->paginate($limit);
            
            return response()->json($paginate, 200);
        }

        return response()->json(null, 204);
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

        if (is_array($ids) && !empty($ids)) {
            $products = Product::find($ids)->all();
            if (count($products)) {
                foreach($products as $index => $product) {
                    $product->delete();
                    $products[$index] = $product->id;
                }

                return response()->json($products, 200);
            }
        }
        
        return response()->json(null, 404);
    }
}
