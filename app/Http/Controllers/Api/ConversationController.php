<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Http\Requests\StoreConversationRequest;
use App\Http\Requests\UpdateConversationRequest;
use App\Http\Resources\ConversationWithParticipantsResource;
use App\Http\Resources\ParticipantResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Log;

class ConversationController extends Controller
{
    public function index()
    {
        /** @var User $user */
        $user =auth()->user();
        return ConversationWithParticipantsResource::collection($user->conversations()->with('users') ->get());
    }

    public function store(StoreConversationRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();

        if($conversation = $this->conversationAlreadyExists($request)) {
            return new ConversationWithParticipantsResource(($conversation));
        }

        $conversation = Conversation::create($data);
        $conversation->users()->attach([$data['user_id'], $data['participant_id']]);
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

    public function conversationAlreadyExists(StoreConversationRequest $request)
    {
        $userID = auth()->id();
        $otherID = $request->json('participant_id');

        // Check if conversation already exists
        $conversation = Conversation::whereHas('users', function($query) use ($otherID) {
            $query->where('user_id', $otherID);
        })->whereHas('users', function($query) use ($userID) {
            $query->where('user_id', $userID);
        })->first();

        return $conversation;
    }
}
