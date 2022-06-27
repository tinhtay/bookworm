<?php 

namespace  App\Repositories;
 
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;

class ReviewRepositories {
    public function __construct()
    {
        $this->query = User::query();
    }

    public function login(Request $request){
        $user = User::where('email', $request->email)->first();
        $password = md5($request->password);
        if($user->password != $password){ // user not exist or incorrect password -- !$user || !Hash::check($request->password, $user->password, [])
            return response()->json(
                [
                    'message' => 'User not exist!',
                ],
                404
            );
        }
        $token = $user->createToken('authToken')->plainTextToken;
        return response()->json(
            [
                'access_token' => $token,
                'type_token' => 'Bearer',
                'message' =>'Login successfully'
            ],
            200
        );

    }

    public function logout(){

        // auth()->user()->tokens()->delete();
        Auth::logout();

        return response()->json(
            [
                'message' => "Logged out!",
            ],
            200
        );
    }
}
