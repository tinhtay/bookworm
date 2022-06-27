<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;
use App\Repositories\BookRepositories;
use App\Repositories\ReviewRepositories;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return BookResource::collection(Book::all());   
    }

    public function book_detail($id = null){
        $new_book = new BookRepositories();
        return response($new_book->getById($id));
    }


    public function book_review($book_id = null){
        $new_rw = new ReviewRepositories();
        return response($new_rw->getReviews($book_id));
    }
    public function book_reviews($book_id = null){
        $new_rw = new BookRepositories();
        return response($new_rw->getReviews($book_id));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

// On sale / popular / Recommend

    public function Top10BooksDiscount(){
        $new_book = new BookRepositories();
        return response($new_book->getTop10BooksDiscount());
    }

    public function Top8BooksPopular(){
        $new_book = new BookRepositories();
        return response($new_book->getTop8BooksPopular());
    }

    public function Top8BooksRecommend(){
        $new_book = new BookRepositories();
        return response($new_book->getTop8BooksRecommend());
    }

    // Sort by sale, popularity, price

    public function sortBySale(){
        $new_book = new BookRepositories();
        return response($new_book->getSortBySale());
    }

    public function sortByReview(){
        $new_book = new BookRepositories();
        return response($new_book->getSortByReview());
    }

    public function sortByPriceDesc(){
        $new_book = new BookRepositories();
        return response($new_book->getSortByPriceDesc());
    }

    public function sortByPriceAsc(){
        $new_book = new BookRepositories();
        return response($new_book->getSortByPriceAsc());
    }

    public function finalprice(){
        $new_book = new BookRepositories();
        return response($new_book->getFinalPrice());
    }

    public function getfilter(Request $request){
        $new_book = new BookRepositories();
        return response($new_book->getFiltering($request));
    }


}
