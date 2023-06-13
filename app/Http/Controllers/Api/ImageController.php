<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Image;
use App\Traits\AuthApiResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;

class ImageController extends Controller
{
    public function serve(Conversation $conversation, Image $image, Request $request)
    {
        if(!$this->authenticate($conversation, $request)) {
            return response()->json(['message' => 'Image not found'], 404);
        }

        $headers = [
            'Content-Type' => Storage::mimeType($image->path),
            'Content-Length' => Storage::size($image->path),
            'Content-Disposition' => 'inline; filename=' . $image->name,
        ];

        return Storage::response($image->path, $image->name, $headers);
    }

    private function authenticate($conversation, $request)
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

        /** Checks if user is part of the conversation */
        if(!$user->conversations()->where('conversations.id', $conversation->id)->exists())
        {
            return false;
        }

        return true;
    }
}
