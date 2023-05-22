<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ParticipantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $participants = $this->users
            ->where('id', '<>', auth()->id())
            ->map((fn($user) => $user->firstname . ' ' . $user->lastname))
            ->toArray();

        return [
            'participants' => implode(', ', $participants),
        ];
    }
}
