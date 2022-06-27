<?php

namespace App\Repositories;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Review;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;


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
        return $this->query
            ->selectRaw('book.id as fid, 
            (case when discount.discount_start_date <= current_date 
            and (discount.discount_end_date >= current_date or  discount.discount_end_date is null) then (book_price - discount_price)
            else 0 end ) as sub_price,
            (case when discount.discount_start_date <= current_date 
            and (discount.discount_end_date >= current_date or  discount.discount_end_date is null) then discount.discount_price
            else book.book_price end ) as final_price
            ')
            ->leftJoin('discount', 'discount.book_id','=', 'book.id')
            // ->groupBy('book.id','final_price');
            ->groupBy('book.id','discount.discount_end_date','discount.discount_start_date', 'discount.discount_price', 'book.book_price');
    }

    public function getSubPrice(){
        return $this->query
        ->join('discount','discount.book_id','=', 'book.id')
        ->whereDate('discount_start_date','<=',today())
        ->whereDate('discount_end_date','>=',today())
        ->orWhereNull('discount_end_date')
        ->selectRaw('book.id, (book_price - discount_price) as sub_price')
        ->groupBy('book.id','sub_price');
    }
        //  -------------On sale / popular / recommend---------------------------------------------------
    // Lay top 10 giam gia sp
    public function getTop10BooksDiscount(){
        $query = Book::query()
            ->join('discount','discount.book_id','=', 'book.id')
            ->whereDate('discount_start_date','<=',today())
            ->whereDate('discount_end_date','>=',today())
            ->orWhereNull('discount_end_date')
            ->selectRaw('book.*, (book_price - discount_price) as sub_price')
            ->orderBy('sub_price','Desc')
            ->limit(10)->get();

        return $query;

    }

    public function getTop8BooksPopular(){
         $finalprice = $this->getFinalPrice();

        return $this->query
        ->join('review','review.book_id','=','book.id')
        ->joinSub($finalprice, 'finalprice', function ($join) {
            $join->on('finalprice.fid', '=', 'book.id');
        })
        ->selectRaw('book.id, book.book_title, book.book_cover_photo, count(review.id) as luotdanhgia, finalprice.final_price, book.book_price')
        ->groupBy('book.id','finalprice.final_price')
        ->orderByDesc('luotdanhgia')->orderBy('finalprice.final_price','asc')
        ->limit(8)
        ->get();

    }

    public function getTop8BooksRecommend(){
        $finalprice = $this->getFinalPrice();

        return $this->query
        ->join('review','review.book_id','=','book.id')
        ->joinSub($finalprice, 'finalprice', function ($join) {
            $join->on('finalprice.fid', '=', 'book.id');
        })
        ->selectRaw('book.id, book.book_title, book.book_cover_photo, round(avg(review.rating_start),2) AS average_rate, finalprice.final_price, book.book_price ')
        ->groupBy('book.id','finalprice.final_price')
        ->orderByDesc('average_rate')->orderBy('finalprice.final_price','asc')
        ->limit(8)
        ->get();
    }

        //  Sort By ------------------------------------------------
    public function getSortBySale(){
        $finalprice = $this->getFinalPrice();

        return $this->query
            ->joinSub($finalprice, 'finalprice', function ($join) {
                $join->on('finalprice.fid', '=', 'book.id');
            })
            ->selectRaw('book.id, book.book_title, book.book_cover_photo, finalprice.final_price, book.book_price, finalprice.sub_price ')
            ->groupBy('book.id','finalprice.final_price', 'finalprice.sub_price')
            ->orderBy('finalprice.final_price','asc')
            ->orderBy('finalprice.sub_price','DESC')
            ->paginate(5);

    }   

    public function getSortByReview(){
        $finalprice = $this->getFinalPrice();

        $query = Book::query()
             ->join('review', 'review.book_id','=','book.id')
            //  ->selectRaw('book.*, count(review.id) ad count_review', )
             ->joinSub($finalprice, 'finalprice', function ($join) {
                $join->on('finalprice.fid', '=', 'book.id');
            })
            ->selectRaw('book.id, book.book_title, book.book_cover_photo, finalprice.final_price, book.book_price, count(review.id) as count_review ')
             ->groupBy('book.id','finalprice.final_price')
             ->orderByDesc('count_review')
             ->orderBy('finalprice.final_price','asc')
             ->paginate(5);
        return $query;
    }

    public function getSortByPriceDesc(){
        $finalprice = $this->getFinalPrice();

        return $this->query
            ->joinSub($finalprice, 'finalprice', function ($join) {
                $join->on('finalprice.fid', '=', 'book.id');
            })
            ->selectRaw('book.id, book.book_title, book.book_cover_photo, finalprice.final_price, book.book_price')
            ->groupBy('book.id','finalprice.final_price', 'finalprice.sub_price')
            ->orderBy('finalprice.final_price','desc')
            ->paginate(5);

    }

    public function getSortByPriceAsc(){
        $finalprice = $this->getFinalPrice();

        return $this->query
            ->joinSub($finalprice, 'finalprice', function ($join) {
                $join->on('finalprice.fid', '=', 'book.id');
            })
            ->selectRaw('book.id, book.book_title, book.book_cover_photo, finalprice.final_price, book.book_price ')
            ->groupBy('book.id','finalprice.final_price', 'finalprice.sub_price')
            ->orderBy('finalprice.final_price','asc')
            ->paginate(5);

    }
    
    public function getFiltering(Request $request){
       $book = Book::with(['category','author']);

       if($request->id){
        $book->where('book.book_id',$request->id);
       } else {
        if($request->category_id){
            $book->where('book.category_id',$request->category_id); 
        }else {
            if($request->author_id){    //  author isset    in category_id 
                $book->where('book.author_id',$request->author_id); }
            }
        }

        return $book->get();
    }
}