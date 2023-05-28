<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class ConversationWithParticipantsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $participants = $this->users()
            ->where('users.id', '<>', auth()->id())
            ->get();

        Log::info($participants);

        return [
            'conversation_id' => (string)$this->id,
            'conversation' => [
                'title' => $this->title,
                'last_message' => $this->last_message,
                'owner' => new UserResource(User::find($this->user_id)),
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at
            ],
            'participants' => $participants
        ];
    }
}
