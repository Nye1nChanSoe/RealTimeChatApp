<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ConversationController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\UserController;
use App\Http\Resources\UserResource;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/** Authentication */
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return new UserResource($request->user());
});

/** Protected Resources */
Route::middleware('auth:sanctum')->group(function() {
    Route::apiResource('/conversations', ConversationController::class);
    Route::get('/conversations/{conversation}/participants', [ConversationController::class, 'participants']);
    Route::apiResource('/conversations/{conversation:id}/messages', MessageController::class);
    Route::apiResource('/users', UserController::class);
    Route::get('/search', [SearchController::class, 'search']);
});

/**
 * Route to authenticate and sent files stored in a private storage as a response
 * Will need to include Authorization token in the URL query parameter for authentication
 */
Route::get('/conversations/{conversation}/images/{image}', [ImageController::class, 'serveConversations']);
Route::get('/images/{user}/profile', [ImageController::class, 'serveProfiles']);