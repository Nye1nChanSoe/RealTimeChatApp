<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'conversation_id',
        'user_id',
        'content',
    ];

    /**
     * Crypt::encryptString is used to encrypt the message string
     * It utilizes the OpenSSL library, including AES-256-CBC
     * Advanced Encryption Standard with a 256-bit key length and Cipher Block Chaining mode
     * The encryption key used is the one specified in the config/app.php
     * The resulting $encryptedMessage is a base64-encoded string that represents the encrypted data
     */
    public function setContentAttribute($message)
    {
        $this->attributes['content'] = Crypt::encryptString($message);
    }

    /**
     * Laravel handles the decryption process, using the same encryption key
     * The key is specified in the config/app.php, under the key option
     * AES-256-CBC algorithm to decrypt the data and return the original message
     */
    public function getContentAttribute()
    {
        return Crypt::decryptString($this->attributes['content']);
    }

    /** relations */
    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
