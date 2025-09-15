<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Services\Middlewares\CheckLangMiddleware;
use App\Services\Middlewares\CheckRouterMiddleware;
use App\Services\Middlewares\CheckTokenMiddleware;

class GlobalMiddleware
{
    protected $checkLang;

    protected $checkRouter;
    protected $checkToken;
    protected   $excludePaths = ['login', 'register', 'reset-password'];

    public function __construct(CheckLangMiddleware $checkLang, CheckRouterMiddleware $checkRouter, CheckTokenMiddleware $checkToken)
    {
        $this->checkLang = $checkLang;
        $this->checkRouter = $checkRouter;
        $this->checkToken = $checkToken;
    }
    public function handle($request, Closure $next)
    {
        $this->checkLang->execute($request);
        $this->checkRouter->execute($request);
        $path = $request->path();
        foreach ($this->excludePaths as $excludePath) {
            if (str_ends_with($path, $excludePath)) {
                return $next($request);
            }
        }
        $prefix = $request->segment(2);
        if ($prefix === 'admin') {
            $result =  $this->checkToken->execute($request);
            if ($result === false) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Unauthorized access. Invalid token.'
                ], 401);
            }
        };

        return $next($request);
    }
}
