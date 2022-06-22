<?php

use App\Http\Controllers\BookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});




Route::get('book/{bookid}/review/{rwid}', [BookController::class,'book_review']);
Route::get('/Categories', [BookController::class,'book_type']);
Route::get('/Authors', [BookController::class,'book_author']);

Route::apiResource('/books', BookController::class);

Route::controller(BookController::class)->group(function(){
    Route::get('bookdetail/{id?}', 'book_detail'); 
    Route::get('review/{id?}', 'book_review');
    Route::get('bookreview/{id?}', 'book_reviews');
    Route::get('topdiscount', 'Top10BooksDiscount');
    Route::get('toppopular', 'Top8BooksPopular');
    Route::get('toprecommend', 'Top8BooksRecommend');
    Route::get('sortbysale', 'sortBySale');
    Route::get('sortbyreview', 'sortByReview');
    Route::get('sortbypricedesc', 'sortByPriceDesc');
    Route::get('sortbypriceasc', 'sortByPriceAsc');

    Route::get('getfinalprice', 'finalprice');
});



