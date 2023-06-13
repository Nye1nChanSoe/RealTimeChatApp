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
     * @param \Illuminate\Http\UploadedFile $fileData
     */
    public function uploadImage($fileData, $messageData)
    {
        if(!$fileData) {
            return false;
        }

        $path = 'private/images/';
        $name = $fileData->getClientOriginalName();
        $fileData->storeAs($path, $name);

        return Image::create([
            'message_id' => $messageData->id,
            'path' => $path . $name,
            'name' => $name,
        ]);
    }
}