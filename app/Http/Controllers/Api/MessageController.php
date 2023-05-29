<?php

namespace App\Http\Controllers\Api;

use App\Events\MessageCreated;
use App\Events\MessageDeleted;
use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\UpdateMessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Message;

/**
 * Serve for the messages and other related data for a "conversation" component
 * Represents the dialogue between two or group of people in a single conversation
 */
class MessageController extends Controller
{
    public function index(Conversation $conversation)
    {
        /** @var User user */
        $user = auth()->user();

        if(!$user->conversations()->where('conversations.id', $conversation->id)->exists())
        {
            return response()->json(['message' => 'Conversation not found'], 404);
        }

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

        // dispatch message event to trigger the corresponding event listener
        event(new MessageCreated($message->id, $message->content, $conversation->id, $message->created_at, $message->updated_at));

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
        $updated_at = $message->updated_at;
        $message->delete();

        $lastMessage = Message::where('conversation_id', $conversation->id)->latest()->first();
        event(new MessageDeleted($lastMessage->id, $lastMessage->content, $conversation->id, $message->created_at, $updated_at));

        return response("", 204);
    }
}
