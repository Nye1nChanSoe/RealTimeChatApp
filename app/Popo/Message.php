<?php 

namespace App\Popo;

use Carbon\Carbon;

class Message
{
    private int|string $id;
    private string $content;
    private int|string $conversation_id;

    private Carbon $created_at;
    private Carbon $updated_at;

    /**
     * @param int|string $id
     * @param string $content
     * @param int|string $conversation_id
     * @param Carbon $created_at
     * @param Carbon $updated_at
     */
    public function __construct($id, $content, $conversation_id, $created_at, $updated_at)
    {
        $this->id = $id;
        $this->content = $content;
        $this->conversation_id = $conversation_id;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }

    /**
     * @return int|string
     */
    public function getId(): int|string
    {
        return $this->id;
    }

    /**
     * @param int|string $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getContent(): string
    {
        return $this->content;
    }

    /**
     * @param string $content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    /**
     * @return int|string
     */
    public function getConversationId(): int|string
    {
        return $this->conversation_id;
    }

    /**
     * @param int|string $conversation_id
     */
    public function setConversationId($conversation_id)
    {
        $this->conversation_id = $conversation_id;
    }

    /**
     * @return Carbon
     */
    public function getCreatedAt(): Carbon
    {
        return $this->created_at;
    }

    /**
     * @param Carbon $created_at
     */
    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;
    }

    /**
     * @return Carbon
     */
    public function getUpdatedAt(): Carbon
    {
        return $this->updated_at;
    }

    /**
     * @param Carbon $updated_at
     */
    public function setUpdatedAt($updated_at)
    {
        $this->updated_at = $updated_at;
    }
}