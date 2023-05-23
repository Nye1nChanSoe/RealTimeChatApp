<?php

namespace App\Listeners;

use App\Events\MessageCreated;
use App\Events\MessageDeleted;
use App\Models\Conversation;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UpdateConversationLastMessage
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(MessageCreated|MessageDeleted $event): void
    {
        $message = $event->message;

        $conversation = Conversation::find($message->getConversationId());
        $conversation->last_message = $message->getContent();
        $conversation->updated_at = $message->getUpdatedAt();
        $conversation->save();
    }
}
