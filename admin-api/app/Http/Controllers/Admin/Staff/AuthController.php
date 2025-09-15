<?php

namespace App\Http\Controllers\Admin\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StaffAuthRequest;
use App\Models\Staff;

class AuthController extends Controller
{
    protected $request;
    public function __construct(StaffAuthRequest $request)
    {
        $this->request = $request;
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            $tokenResult = $user->createToken('Token admin', ['admin']);
            $accessToken = $tokenResult->accessToken;
            $token = $tokenResult->token;
            $token->expires_at = now()->addDays(7);
            $token->save();
            return response()->json([
                'status' => 'success',
                'message' => trans('loginSuccess'),
                'token' => $accessToken,
                'type' => 'admin'
            ], 200);
        }

        return response()->json(
            [
                'status' => 'fall',
                'message' => trans('loginFail')
            ]
        );
    }
    public function getMyInfoAccount()
    {
        $staff = Auth::user()->load([
            'role' => function ($query) {
                $query->select('id', 'name');
            }
        ]);

        $permissions = $staff->permissions();
        $staff->permission_detail = $permissions;

        return $this->returnDataBase($staff);
    }
    public function updateInfo()
    {
        $staff = Staff::where('email', $this->request->email)->orWhere('phoneNumber', $this->request->phoneNumber)->firstOrFail();
        $staff->email = $this->request->email;
        $staff->fullname = $this->request->fullname;
        $staff->phoneNumber  = $this->request->phoneNumber;
        $staff->address = $this->request->address;
        // if ($this->request->hasFile('image')) {
        //     $staff->img = app(Firebase::class)->uploadImage($this->request->file('image'));
        // }
        $update = $staff->save();
        return $this->returnResponseMessage($update ? "success" : "fail", 'updateAction');
    }
}
