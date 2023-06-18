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
}
