<?php

namespace App\Http\Requests;

use App\Services\Request\BaseRequest;

class LogActiveRequest extends BaseRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        $rule = [];
        if ($this->isMethod('get')) {
            $rule = $this->getMethodGet();
        } elseif ($this->isMethod('delete')) {
            $rule = $this->checkIdMethodDelete('activity_log', $this->id);
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
            'id' => trans('message.idLogActive'),
        ]));
    }
}
