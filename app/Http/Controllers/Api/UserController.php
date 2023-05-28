<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;

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
        $user->update($userData);

        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response('', 204);
    }
}
