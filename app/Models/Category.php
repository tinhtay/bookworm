<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Book;

class Category extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'category';

    public function book(){
        return $this->hasMany(Book::class, 'category_id', 'id');
    }
}
