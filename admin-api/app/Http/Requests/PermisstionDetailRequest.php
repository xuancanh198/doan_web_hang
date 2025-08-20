<?php

namespace App\Http\Requests;

use App\Services\Request\BaseRequest;

class PermisstionDetailRequest extends BaseRequest
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
                'name' => 'required|string|min:4|max:255',
                'code' => 'required|string|min:5|max:60',
                'url' => 'required|string|min:5|max:60',
                'description' => 'nullable|string|max:5000',
                'status' => 'required|integer|in:0,1',
                'permisstion_id' => 'required|integer|exists:permisstion,id',
                'action_id' => 'required|integer|exists:action,id',
            ];

            if ($this->isMethod('post')) {
                $rule['code'] = '|unique:permisstion_detail,code';
                $rule['url'] = '|unique:permisstion_detail,url';
            } elseif ($this->isMethod('put')) {
                $rule['code'] = '|unique:permisstion_detail,code,' . $this->id;
                $rule['url'] = '|unique:permisstion_detail,url,' . $this->id;
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdate('permisstion_detail'));
            }
        } elseif ($this->isMethod('get')) {
            $rule = $this->getMethodGet();
        } elseif ($this->isMethod('delete')) {
            $rule = $this->checkIdMethodDelete('permisstion_detail', $this->id);
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
            'name' => trans('message.codePermisstionDetail'),
            'url' => trans('message.urlPermisstionDetail'),
            'code' => trans('message.namePermisstionDetail'),
            'description' => trans('message.descriptionPermisstionDetail'),
            'status' => trans('message.statusPermisstionDetail'),
            'id' => trans('message.idPermisstionDetail'),
            'permisstion_id' => trans('message.idPermisstion'),
            'action_id' => trans('message.idAction'),
        ]));
    }
}
