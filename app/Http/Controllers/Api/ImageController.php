<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Image;
use App\Models\User;
use App\Traits\AuthApiResponseTrait;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;

/**
 * This controller methods mainly authenticate and serve images to the client
 * The routes typically implemented as publicly accessible routes
 * For authentication logic, the url includes authorization token value as query string
 */
class ImageController extends Controller
{
    public function serveConversations(Conversation $conversation, Image $image, Request $request)
    {
        if(!$this->authenticate($request, $conversation)) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        $headers = [
            'Content-Type' => Storage::mimeType($image->path),
            'Content-Length' => Storage::size($image->path),
            'Content-Disposition' => 'inline; filename=' . $image->name,
        ];

        return Storage::response($image->path, $image->name, $headers);
    }

    public function serveProfiles(User $user, Request $request)
    {
        if(!$this->authenticate($request, $user)) {
            return response()->json('Image not found', 404);
        }

        /** return default avatars if image doesn't exists */
        if(!Storage::exists($user->image ?? '/null')) {
            if($user->gender == 'male') {
                return Storage::response('public/images/male_avatar.png');
            }
            if($user->gender == 'female') {
                return Storage::response('public/images/female_avatar.png');
            }
            return Storage::response('public/images/default_avatar.png');
        }

        return Storage::response($user->image);
    }

    private function authenticate($request, $model)
    {
        /** Check included auth token in the URL query param */
        if(!$request->token) {
            return false;
        }

        /** @var \Laravel\Sanctum\PersonalAccessToken $token */
        $token = PersonalAccessToken::findToken($request->token);

        if(!$token) {
            return false;
        }

        $user = $token->tokenable;

        if($model instanceof \App\Models\Conversation) {
            /** Checks if user is part of the conversation */
            if(!$user->conversations()->where('conversations.id', $model->id)->exists())
            {
                return false;
            }
        }

        return true;
    }
}
