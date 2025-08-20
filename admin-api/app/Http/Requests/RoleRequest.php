<?php

namespace App\Http\Requests;

use App\Services\Request\BaseRequest;

class RoleRequest extends BaseRequest
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
                'name' => 'required|string|min:2|max:255',
                'code' => 'required|string|min:2|max:60',
                'description' => 'nullable|string',
                'status' => 'nullable|integer|in:0,1',
                'permisstion_detail' => 'required',
            ];

            if ($this->isMethod('post')) {
                $rule['code'] .=  '|unique:role,code';
            } elseif ($this->isMethod('put')) {
                $rule['code'] .= '|unique:role,code,' . $this->id;
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdate('role'));
            }
        } elseif ($this->isMethod('get')) {
            $rule = $this->getMethodGet();
        } elseif ($this->isMethod('delete')) {
            $rule = $this->checkIdMethodDelete('role', $this->id);
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
            'name' => trans('message.nameRole'),
            'code' => trans('message.codeRole'),
            'description' => trans('message.descriptionRole'),
            'status' => trans('message.statusRole'),
            'permisstion_detail' => trans('message.permisstion_detailRole'),
            'id' => trans('message.idRole'),
        ]));
    }
}
