<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => (string)$this->id,
            'type' => 'Books',
            'attributes' => [
                'book_category' => $this->category_id,
                'book_author' => $this->author_id,
                'book_title' => $this->book_title,
                'book_summary' => $this->book_summary,
                'book_price' => $this->book_price,
                'book_cover' => $this->book_cover_photo,
            ]
        ];
    }
}
