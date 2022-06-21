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

    public function book_type(){
        $new_book = new BookRepositories();
        return response($new_book->getType());
    }

    public function book_author(){
        $new_book = new BookRepositories();
        return response($new_book->getAuthor());
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
}
