<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    public function index()
    {
        $users = User::where('id', '<>', auth()->id())->get();
        return UserResource::collection($users);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $userData = $request->validated();

        if($path = $this->storeImageIfExists($request->image)) {
            $userData['image'] = $path;
        }

        $user->update($userData);
        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response('', 204);
    }

    public function serve(User $user, Request $request)
    {
        if(!$this->authenticate($request, $user)) {
            return response()->json('Image not found', 404);
        }

        if(!Storage::exists($user->image)) {
            return response()->json('Image not found', 404);
        }

        return Storage::response($user->image);
    }

    /**
     * @param \Illuminate\Http\UploadedFile $file
     * @param string $path
     * 
     * @return string | bool
     */
    private function storeImageIfExists($file, $path = 'private/profile/images')
    {
        if(!$file) {
            return false;
        }

        $name = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME) . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
        $file->storeAs($path, $name);

        return $path . '/' . $name;
    }


    private function authenticate($request, $authenticatedUser)
    {
        if(!$request->token) {
            return false;
        }

        /** find the personal access token in the database   */
        /** @var \Laravel\Sanctum\PersonalAccessToken $token */
        $token = PersonalAccessToken::findToken($request->token);

        if(!$token) {
            return false;
        }

        $user = $token->tokenable;

        if($authenticatedUser->id != $user->id) {
            return false;
        }

        return true;
    }
}
