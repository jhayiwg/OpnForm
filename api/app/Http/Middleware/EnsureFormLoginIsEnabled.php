<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureFormLoginIsEnabled
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
        if (config('opnform.disable_form_login')) {
            abort(403, 'Form login is disabled.');
        }

        return $next($request);
    }
}
