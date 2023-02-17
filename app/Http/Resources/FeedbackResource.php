<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeedbackResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "subject" => $this->subject,
            "body" => $this->body,
            "file" => $this->file,
            "created_at" => $this->created_at->format("Y-m-d H:i:s"),
            "user_id" => $this->user_id,
            "name" => $this->name,
            "email" => $this->email,
            "user_created_at" => $this->user_created_at,
        ];
    }
}
