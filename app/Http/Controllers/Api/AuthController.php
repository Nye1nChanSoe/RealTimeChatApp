<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Traits\AuthApiResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    use AuthApiResponseTrait;

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if(!Auth::once($credentials)) {
            return $this->error();
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken(str_replace(' ', '_', strtolower($user->firstname)).'_token')->plainTextToken;

        return $this->success(compact('user', 'token'));
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        /** @var User $user */
        $user = User::create($data);
        $token = $user->createToken(str_replace(' ', '_', strtolower($user->firstname)).'_token')->plainTextToken;

        return $this->success(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();

        /** @var $token */
        $token = $user->currentAccessToken();
        $token->delete();
        return response('', 204);
    }
}
