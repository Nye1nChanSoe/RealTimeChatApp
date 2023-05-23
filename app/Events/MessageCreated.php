<?php

namespace App\Events;

use App\Popo\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The message object that stores the
     * message content and conversation_id
     */
    public Message $message;

    /**
     * @param int $id
     * @param string $messageContent
     * @param int $conversationId
     */
    public function __construct($id, $messageContent, $conversationId)
    {
        $this->message = new Message($id, $messageContent, $conversationId);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    }
}
