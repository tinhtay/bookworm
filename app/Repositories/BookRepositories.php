<?php

namespace App\Repositories;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Review;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class BookRepositories extends BaseRepository
{
    public function __construct()
    {
        $this->query = Book::query();
    }

    public function getById($id) //Lay thong tin 1 book / nhieu book
    {
        if($id != null){
            return $this->query->find($id)
            ->join('category', 'category.id', '=', 'book.category_id')
            ->join('author', 'author.id', '=', 'book.author_id')
            ->where('book.id',$id)
            ->get();
        }
        else
        {
            return Book::all();
        }
    }

    public function getReviews($book_id) //lay review cua 1 book , count sl review
    {
        return $this->query
        ->join('review', 'review.book_id','=','book.id')
        ->where('book.id',$book_id)
        ->get();
    }

    public function countReviews($book_id){
        return $this->query->selectRaw('COUNT(review.id) as amount')
        ->join('review', 'review.book_id','=','book.id')
        ->where('book.id',$book_id)
        ->get();
    }


    public function create($data)
    {
        
    }
    public function update($data)
    {
        
    }
}