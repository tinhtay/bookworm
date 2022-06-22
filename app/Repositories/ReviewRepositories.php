<?php 

namespace  App\Repositories;
 
use App\Models\Review;
use Illuminate\Support\Facades\Auth;
use App\Models\Book;

class ReviewRepositories {
    public function __construct()
    {
        $this->query = Review::query();
    }

    public function getReviews($bookId){
        return $this->query
        ->join('book', 'book.id', '=', 'review.book_id')
        ->where('review.book_id', $bookId)
        ->get()->count();
    }

    // public function getAvgStars($bookId){
    //     return $this->query->selectRAw(DB::select(avg()))
    // }
}
