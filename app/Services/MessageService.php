<?php

namespace App\Services;

use App\Models\Image;
use App\Models\Message;
use Illuminate\Support\Facades\Storage;

class MessageService
{
    public function createMessage($data)
    {
        return Message::create($data);
    }

    /**
     * @param \Illuminate\Http\UploadedFile $fileData the uploded file
     * @param \App\Models\Message $messageData newly created message model instance
     * @param string $path storage path relative to Laravel's filesystem driver
     *
     * @return \App\Models\Image | bool
     */
    public function uploadImage($fileData, $messageData, $path = 'private/images/')
    {
        if(!$fileData) {
            return false;
        }

        $name = pathinfo($fileData->getClientOriginalName(), PATHINFO_FILENAME) . '_' . uniqid() . '.' . $fileData->getClientOriginalExtension();
        $fileData->storeAs($path, $name);

        return Image::create([
            'message_id' => $messageData->id,
            'path' => $path . $name,
            'name' => $name,
        ]);
    }
}