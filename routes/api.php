<?php

use App\Http\Controllers\RecordHistoryController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\EnsureUserRequestIsValid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// No middleware routes
// user
Route::post('/user/signup', [UserController::class, 'signup']);
Route::post('/user/login', [UserController::class, 'login']);

Route::middleware([EnsureUserRequestIsValid::class])->group(
    function () {
        Route::get('/user/recordHistories', [RecordHistoryController::class, 'index']);
        Route::post('/user/recordHistory', [RecordHistoryController::class, 'store']);
    }
);
