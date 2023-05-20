<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use Illuminate\Support\Facades\Log;

/**
 * Serve for the messages and other related data for a "conversation" component
 * Represents the dialogue between two or group of people in a single conversation
 */
class MessageController extends Controller
{
    public function index(Conversation $conversation)
    {
        $messages = Message::with('user')
            ->where('conversation_id', $conversation->id)
            ->get();

        return MessageResource::collection($messages);
    }

    public function store(Conversation $conversation, StoreMessageRequest $request)
    {
        $data = $request->validated();
        $data['conversation_id'] = $conversation->id;
        $data['user_id'] = auth()->id();

        $message = Message::create($data);
        return new MessageResource($message);
    }

    public function show(Conversation $conversation, Message $message)
    {
        return new MessageResource($message);
    }

    public function update(UpdateMessageRequest $request, Conversation $conversation, Message $message)
    {
        $data = $request->validated();
        $message->update($data);

        return new MessageResource($message);
    }

    public function destroy(Conversation $conversation, Message $message)
    {
        $message->delete();
        return response("", 204);
    }
}
