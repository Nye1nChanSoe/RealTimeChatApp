<?php 

namespace App\Popo;

class Message
{
    private int $id;
    private string $content;
    private int $conversation_id;

    /**
     * @param int $id
     * @param string $content
     * @param int $conversation_id
     */
    public function __construct($id, $content, $conversation_id)
    {
        $this->id = $id;
        $this->content = $content;
        $this->conversation_id = $conversation_id;
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
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
     * @return int
     */
    public function getConversationId(): int
    {
        return $this->conversation_id;
    }

    /**
     * @param int $conversation_id
     */
    public function setConversationId($conversation_id)
    {
        $this->conversation_id = $conversation_id;
    }
}