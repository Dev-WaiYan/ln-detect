<?php

namespace App\Http\Traits;

use App\Models\UserAuthToken;

trait UserAuth
{
    public function manageUserAuthToken($id)
    {
        $token = \md5(strval(\time() + $id));
        try {
            $userAuthToken = new UserAuthToken();
            $userAuthToken->token = $token;
            $userAuthToken->user_id = $id;

            $userAuthToken->save();
            return $token;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
}
