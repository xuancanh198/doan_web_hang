<?php

namespace App\Http\Requests;

use App\Services\Request\BaseRequest;

class StaffRequest extends BaseRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        $rule = [];
        if ($this->isMethod('post') || $this->isMethod('put')) {
            $rule = [
                'username' => 'required|string|min:2|max:255',
                'code' => 'required|string|min:2|max:60',
                'fullname' => 'required|string|min:2|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|regex:/^0[0-9]{9}$/|max:20',
                'avatar' => 'image|mimes:jpeg,jpg,png,webp|max:2048',
                'description' => 'nullable|string',
                'status' => 'nullable|integer|in:0,1',
                'role_id' => 'required|integer|exists:role,id',
            ];

            if ($this->isMethod('post')) {
                $rule['code'] .=  '|unique:staff,code';
                $rule['username'] .=  '|unique:staff,username';
                $rule['email'] .=  '|unique:staff,email';
                $rule['phone'] .=  '|unique:staff,phone';
                $rule['avatar'] .= '|required';
            } elseif ($this->isMethod('put')) {
                $rule['code'] .= '|unique:staff,code,' . $this->id;
                $rule['username'] .= '|unique:staff,username,' . $this->id;
                $rule['email'] .= '|unique:staff,email,' . $this->id;
                $rule['phone'] .= '|unique:staff,phone,' . $this->id;
                $rule['avatar'] .= '|nullable';
                $rule['permisstion_detail'] = 'required';
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdate('staff'));
            }
        } elseif ($this->isMethod('get')) {
            $rule = $this->getMethodGet();
        } elseif ($this->isMethod('delete')) {
            $rule = $this->checkIdMethodDelete('staff', $this->id);
        }
        return $rule;
    }


    public function messages()
    {
        return $this->generateMessages($this->rules());
    }
    public function attributes()
    {
        $attributes = $this->attributesBase();
        return (array_merge($attributes, [
            'username' => trans('message.usernameStaff'),
            'code' => trans('message.codeStaff'),
            'fullname' => trans('message.fullnameStaff'),
            'email' => trans('message.emailStaff'),
            'phone' => trans('message.phoneStaff'),
            'avatar' => trans('message.avatarStaff'),
            'description' => trans('message.descriptionStaff'),
            'status' => trans('message.statusStaff'),
            'role_id' => trans('message.idRole'),
            'permisstion_detail' => trans('message.permisstion_detailStaff'),
            'id' => trans('message.idStaff'),
        ]));
    }
}
