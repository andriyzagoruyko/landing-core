<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MainController;


Route::get('/admin', [MainController::class, 'index']);
