<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function signup(Request $request)
    {
        $user = new User();
        try {
            $request->validate([
                'username' => 'required',
                'password' => 'required'
            ]);
            $user->username = $request->input('username');
            $user->password = password_hash($request->input('password'), PASSWORD_DEFAULT);
            $user->save();
            return response()->json([
                'created' => true,
                'user' => $user,
            ]);
        } catch (\Exception $error) {
            return response()->json([
                'created' => false,
                'error' => $error->getMessage()
            ]);
        }
    }


    public function login(Request $request)
    {
        $foundUser = null;
        $userAuthToken = null;
        try {
            $users = User::where('username', $request->input('username'))->get();
            foreach ($users as $user) {
                if (password_verify($request->input('password'), $user->password)) {
                    $foundUser = $user;
                    $userAuthToken = $this->manageUserAuthToken($foundUser->id);
                }
            }
            return response()->json([
                'status' => true,
                'user' => $foundUser,
                'userAuthToken' => $userAuthToken
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'error' => $e->getMessage()
            ]);
        }
    }
}
