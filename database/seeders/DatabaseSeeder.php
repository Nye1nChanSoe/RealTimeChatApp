<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /** act as conversation only allow 2 person for now */
    protected array $conversations = [
        [
            'user_id'=> 1,
            'participant_id' => 2,
            'title' => 'Family Vacation Plans',
            'messages' => [
                [
                    'user_id' => 1,
                    'content' => 'Hey everyone! I was thinking of going to the beach for our family vacation this summer. What do you all think?'
                ],
                [
                    'user_id' => 2,
                    'content' => 'I\'m not a big fan of the beach, but I\'m open to other suggestions.'
                ],
                [
                    'user_id' => 1,
                    'content' => 'No worries! We can consider other options as well. Any suggestions, anyone?'
                ],
                [
                    'user_id' => 1,
                    'content' => 'How about going for a mountain retreat? I heard there are some beautiful cabins available for rent.'
                ],
                [
                    'user_id' => 2,
                    'content' => 'That\'s a great idea too! We can enjoy the scenic views and go hiking. What does everyone else think?'
                ],
                [
                    'user_id' => 1,
                    'content' => 'I\'m up for a mountain retreat as well. It would be a nice change from the beach.'
                ],
                [
                    'user_id' => 2,
                    'content' => 'Count me in for the mountain retreat. Let\'s start looking for cabin rentals.'
                ],
                [
                    'user_id' => 1,
                    'content' => 'Sounds like a plan! I\'ll research cabin rentals and share some options with you.'
                ],
            ],
        ],
        [
            'user_id' => 1,
            'participant_id' => 3,
            'title' => 'Project Discussion',
            'messages' => [
                [
                    'user_id' => 3,
                    'conversation_id' => 1,
                    'content' => 'I have some ideas for the upcoming project. Can we meet tomorrow to discuss?'
                ],
                [
                    'user_id' => 1,
                    'conversation_id' => 1,
                    'content' => 'Sure, let\'s meet in the conference room at 10 AM. Is that convenient for you?'
                ],
                [
                    'user_id' => 3,
                    'conversation_id' => 1,
                    'content' => 'I have a conflicting meeting at that time. Can we reschedule for the afternoon?'
                ],
                [
                    'user_id' => 1,
                    'conversation_id' => 1,
                    'content' => 'Afternoon works for me. How about 2 PM?'
                ],
                [
                    'user_id' => 3,
                    'conversation_id' => 1,
                    'content' => '2 PM works for me too. Let\'s meet in the conference room then.'
                ],
                [
                    'user_id' => 1,
                    'conversation_id' => 1,
                    'content' => 'Great! I\'ll update the calendar invite accordingly.'
                ],
            ],
        ],
    ];

    public function run(): void
    {
        \App\Models\User::factory(10)->create();

        foreach($this->conversations as $conversation)
        {
            $lastMessage = end($conversation['messages'])['content'];
            $convo = Conversation::create(['user_id' => $conversation['user_id'], 'title' => $conversation['title'], 'last_message' => $lastMessage]);
            $convo->users()->attach([$conversation['user_id'], $conversation['participant_id']]);

            foreach($conversation['messages'] as $message)
            {
                Message::create(['conversation_id' => $convo->id, 'user_id' => $message['user_id'], 'content' => $message['content']]);
            }
        }
    }
}
