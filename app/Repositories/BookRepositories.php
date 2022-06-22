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

    public function getFinalPrice(){
        return $this->query->selectRaw('book.*, 
            (case when discount.discount_start_date <= current_date 
            and (discount.discount_end_date <= current_date or  discount.discount_end_date is null) then discount.discount_price
            else book.book_price end ) as final_price ')
            ->leftJoin('discount', 'discount.book_id','=', 'book.id')
            ->get();
    }
        //  -------------On sale / popular / recommend---------------------------------------------------
    // Lay top 10 giam gia sp
    public function getTop10BooksDiscount(){
        $query = Book::query()
            ->join('discount','discount.book_id','=', 'book.id')
            ->whereDate('discount_start_date','<=',today())
            ->whereDate('discount_end_date','>=',today())
            ->orWhereNull('discount_end_date')
            ->select('*',DB::raw('(book_price - discount_price) as sale_price'))
            ->orderBy('sale_price','Desc')
            ->limit(10)->get();

        return $query;

    }

    public function getTop8BooksPopular(){
        $query = Book::query()
        ->join('review','review.book_id','=','book.id')
        ->leftJoin('discount','discount.book_id','=','book.id')
        ->selectRaw('book.*, count(review.id) as luotdanhgia,  
                        // book.book_price - COALESCE(discount.discount_price ,0) as lowest_final_price ')
        ->groupBy('book.id,discount.discount_price,book.book_price')
        ->orderByDesc('luotdanhgia')->orderBy('lowest_final_price','asc')
        ->limit(8)
        ->get();
        return $query;
    }

    public function getTop8BooksRecommend(){
        $final_price = $this->getFinalPrice();
        $query = Book::query()
        ->join('review','review.book_id','=','book.id')
        ->selectRaw('book.*, round(avg(review.rating_start),2) AS average_rate ')
        ->groupBy('book.id')
        ->orderByDesc('average_rate')->orderBy('book.book_price','asc')
        ->limit(8)
        ->get();
        return $query;
    }
        //  Sort By ------------------------------------------------
    public function getSortBySale(){
        $query = Book::query()
            ->join('discount', 'discount.book_id' , '=', 'book.id')
            ->orderBy('book_price','ASC')
            ->orderBy('discount.discount_price','DESC')
            ->get();
        return $query;
    }   

    public function getSortByReview(){
        $query = Book::query()
             ->join('review', 'review.book_id','=','book.id')
             ->selectRaw('book.*, count(review.id) ad count_review', )
             ->groupBy('book.id')
             ->orderByDesc('count_review')
             ->orderBy('book.book_price','asc')
             ->get();
        return $query;
    }

    public function getSortByPriceDesc(){
        return $this->query->orderBy('book_price','DESC')->get();

    }

    public function getSortByPriceAsc(){
        return $this->query->orderBy('book_price','asc')->get();

    }
}