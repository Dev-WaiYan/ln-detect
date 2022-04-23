<?php

namespace App\Http\Middleware;

use App\Models\UserAuthToken;
use Closure;
use Illuminate\Http\Request;

class EnsureUserRequestIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (!empty($request->header('Auth-Token'))) {
            $userAuthToken = UserAuthToken::where('token', $request->header('Auth-Token'))->first();
            if (!empty($userAuthToken)) {
                session(['user' => $userAuthToken->user]);
                return $next($request);
            }
        }
        \abort(403);
    }
}
