<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\AccountRepositories;
use Illuminate\Support\Facades\Auth ;
use Illuminate\Support\Facades\hash ;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller
{
   
    public function __construct()
    {
        $this->query = User::query();
    }
    public function register(Request $request)
    {

        $request->validate([
            'first_name'    =>'required|string',
            'last_name'     =>'required|string',
            'email'         =>'required|string',
            'password'      =>'required|string',      
        ]);
        $user = new User([
            'first_name'    => $request -> first_name ,
            'last_name'     => $request -> last_name ,
            'email'         => $request -> email,
            'password'      => Hash::make($request ->password)
        ]);
        $user->save();
        return response()->json(['message'=>'Success registered'],200);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        if(!Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            return response()->json(['message' => 'Invalid login details'], 401);
        }

        $user  = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'          => Auth::user(),
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ]);
    }



    public function logout(User $user){

        $user->tokens()->delete();

        return [
            'message' => 'Logged out'
        ];
    }
    public function me()
    {
        return Auth::guard('sanctum')->user();
    }


     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
