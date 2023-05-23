<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationMessageUserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'conversation_id' => (string)$this->id,
            'conversation' => [
                'title' => $this->title,
                'last_message' => $this->last_message,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
                'messages' => MessageResource::collection($this->messages),
                'meta_data' => [
                    'total_messages' => $this->messages->count(),
                    'total_participants' => $this->users->count(),
                ]
            ]
        ];
    }
}
