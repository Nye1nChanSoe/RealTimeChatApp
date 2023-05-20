<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'last_message',
    ];


    /**
     * @see \App\Models\Message
     */
    public function setLastMessageAttribute($lastMessage)
    {
        $this->attributes['last_message'] = Crypt::encryptString($lastMessage);
    }
    public function getLastMessageAttribute()
    {
        return Crypt::decryptString($this->attributes['last_message']);
    }


    /** relations */
    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'participants');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
