<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Http\Requests\StoreConversationRequest;
use App\Http\Requests\UpdateConversationRequest;
use App\Http\Resources\ConversationWithParticipantsResource;

class ConversationController extends Controller
{
    public function index()
    {
        $conversations = Conversation::with('users')
            ->where('user_id', auth()->id())
            ->get();

        return ConversationWithParticipantsResource::collection($conversations);
    }

    public function store(StoreConversationRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        $conversation = Conversation::create($data);
        return new ConversationWithParticipantsResource($conversation);
    }

    public function show(Conversation $conversation)
    {
        return new ConversationWithParticipantsResource($conversation);
    }

    public function update(UpdateConversationRequest $request, Conversation $conversation)
    {
        $data = $request->validated();
        $conversation->update($data);

        return new ConversationWithParticipantsResource($conversation);
    }

    public function destroy(Conversation $conversation)
    {
        $conversation->delete();
        return response("", 204);
    }
}
