<?php

namespace App\Traits;

Trait AuthApiResponseTrait
{
    /**
     * @param array $data
     * @param string $message
     * @param int $statusCode
     * @return Illuminate\Http\JsonResponse
     */
    public function success($data = [], $message = 'Created', $statusCode = 201)
    {
        return response()->json([
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }

    /**
     * @param array $data
     * @param string $message
     * @param int $statusCode
     * @return Illuminate\Http\JsonResponse
     */
    public function error($data = [], $message = 'Unauthorized', $statusCode = 401)
    {
        return response()->json([
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }
}