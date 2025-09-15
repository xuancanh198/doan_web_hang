<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

// form login với captcha
Route::get('/login', function () {
    return view('login');
})->name('login.form');

Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'g-recaptcha-response' => 'required|captcha',
    ]);

    return "🎉 Login thành công! Email: " . $request->email;
})->name('login.submit');
