<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EntityController extends Controller
{
    protected $load = [], $dataTypes = [];

    public function paginate(Request $request)
    {
        $query = $this->model::query()->orderBy('id', 'DESC');

        if (!empty($this->load)) {
            $query->with($this->load);
        }

        if (method_exists($this->model, 'useFilter')) {
            $filters = $this->model::useFilter($request);
            $query->filter($filters);
        }

        $paginate = $query->paginate(
            min(100, $request->has('limit') ? $request->limit : 12)
        );

        $maxPages = $paginate->lastPage();
        $currentPage = $paginate->currentPage();

        if ($currentPage > $maxPages) {
            return response()->json('Not found', 404);
        }
        
        return [
            'maxPages' => $maxPages,
            'total' => $paginate->total(),
            'data' => $paginate->items(),
        ];
    }

    public function updateOrCreate(Request $request, $entity = null) 
    {
        $data = $this->prepareData($request);
        $entity ? $entity->update($data) : $entity = $this->model::create($data);

        if (method_exists($entity, 'saveImagesFromRequest')) {
            $entity->saveImagesFromRequest($request);
        }

        return $entity;
    }

    public function delete($entity) 
    {
        $entity->delete();
    }

    public function deleteCollection($collection) 
    {
        if (is_array($collection) && !empty($collection)) {
            $entities = $this->model::find($collection)->all();
            $result = [];

            foreach($entities as $index => $entity) {
                $result[] = $entity->id;
                $entity->delete();
            }

            return response()->json($result, 200);
        }
        
        return response()->json(null, 404);
    }

    public function prepareData(Request $request) 
    {
        $data = $request->except('children');

        if (empty($this->dataTypes)) {
            return $data;
        }

        foreach($this->dataTypes as $key => $type) {
            switch($type) {
                case 'array':
                    $data[$key] = !empty($data[$key]) ? explode(',', $data[$key]) : [];
                    break;

                case 'bool': 
                    $data[$key] = !empty($data[$key]) ? 1 : 0;
                    break;
            }
        }
        
        return $data;
    }

    public function load($entity) 
    {
        return $entity->loadMissing($this->load);
    }

    public function response($entity, $code = 200) 
    {
        return response()->json(['data' => $entity], $code);
    }

    public function responseWithLoad($entity, $code = 200) {
        return $this->response($this->load($entity), $code);
    }
}
