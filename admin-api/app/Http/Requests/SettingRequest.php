<?php

namespace App\Http\Requests;

use App\Services\Request\BaseRequest;

class SettingRequest extends BaseRequest
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
                'name' => 'required|string|min:1|max:255',
                'value' => 'required|string|min:1|max:255',
                'key' => 'required|string|min:5|max:255',
                'group' => 'nullable|string|max:255',
                'type' => 'required|string|max:255',
                'description' => 'nullable|string|max:5000'
            ];
            if ($this->isMethod('post')) {
                $rule['key'] = '|unique:settings,key';
            } elseif ($this->isMethod('put')) {
                $rule['key'] = '|unique:settings,key,' . $this->id;
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdate('settings'));
            }
        } elseif ($this->isMethod('get')) {
            $rule = $this->getMethodGet();
        } elseif ($this->isMethod('delete')) {
            $rule = $this->checkIdMethodDelete('settings', $this->id);
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
            'value' => trans('message.valueSetting'),
            'key' => trans('message.keySetting'),
            'group' => trans('message.groupSetting'),
            'type' => trans('message.typeSetting'),
            'description' => trans('message.descriptionSetting'),
            'name' => trans('message.nameSetting'),
            'id' => trans('message.idSetting'),
        ]));
    }
}
