<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Services\Middlewares\CheckLangMiddleware;

class GlobalMiddleware
{
    protected $checkLang;

    public function __construct(CheckLangMiddleware $checkLang)
    {
        $this->checkLang = $checkLang;
    }
    public function handle(Request $request, Closure $next): Response
    {
        $this->checkLang->execute($request);
        return $next($request);
    }
}
