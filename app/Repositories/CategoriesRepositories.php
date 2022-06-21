<?php

namespace App\Repositories;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;

class BookRepositories extends BaseRepository
{
    public function __construct()
    {
        $this->query = Category::query();
    }

    public function getById($id)
    {     
        if($id){
            return Category::query()->find($id);
        }
        else
        {
            return Category::all();
        }
    }

    

    public function create($data)
    {
        
    }
    public function update($data)
    {
        
    }
}