<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Http\Requests\StoreConversationRequest;
use App\Http\Requests\UpdateConversationRequest;
use App\Http\Resources\ConversationWithParticipantsResource;
use App\Http\Resources\ParticipantResource;
use App\Http\Resources\UserResource;

class ConversationController extends Controller
{
    public function index()
    {
        /** @var User $user */
        $user =auth()->user();
        return ConversationWithParticipantsResource::collection($user->conversations()->with('users')->get());
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

    /**
     * Participants of this conversation
     * String of comma separated names
     */
    public function participants(Conversation $conversation)
    {
        return new ParticipantResource($conversation);
    }
}
