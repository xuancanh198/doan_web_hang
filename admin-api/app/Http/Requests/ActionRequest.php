<?php

namespace App\Http\Requests;

use App\Services\Request\BaseRequest;

class ActionRequest extends BaseRequest
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
                'description' => 'nullable|string|max:5000',
                'status' => 'nullable|integer|in:0,1',
            ];

            if ($this->isMethod('post')) {
                $rule['code'] = '|unique:action,code';
            } elseif ($this->isMethod('put')) {
                $rule['code'] = '|unique:action,code,' . $this->id;
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdate('action'));
            }
        } elseif ($this->isMethod('get')) {
            $rule = $this->getMethodGet();
        } elseif ($this->isMethod('delete')) {
            $rule = $this->checkIdMethodDelete('action', $this->id);
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
            'name' => trans('message.nameAction'),
            'code' => trans('message.codeAction'),
            'description' => trans('message.descriptionAction'),
            'status' => trans('message.statusAction'),
            'id' => trans('message.idAction'),
        ]));
    }
}
