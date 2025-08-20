<?php

namespace App\Http\Requests;

use App\Services\Request\BaseRequest;

class SeriesRequest extends BaseRequest
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
                'code' => 'required|string|min:5|max:60|unique:series,code',
                'description' => 'nullable|string',
                'status' => 'nullable|integer|in:0,1',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
            ];

            if ($this->isMethod('post')) {
                $rule['image'] = 'required|' . $rule['image'];
            } elseif ($this->isMethod('put')) {
                $rule['code'] = 'required|string|min:5|max:60|unique:series,code,' . $this->id;
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdate('series'));
            }
        } elseif ($this->isMethod('get')) {
            $rule = $this->getMethodGet();
        } elseif ($this->isMethod('delete')) {
            $rule = $this->checkIdMethodDelete('series', $this->id);
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
            'name' => trans('message.nameSeries'),
            'code' => trans('message.codeSeries'),
            'image' => trans('message.imageSeries'),
            'description' => trans('message.descriptionSeries'),
            'status' => trans('message.statusSeries'),
            'id' => trans('message.idSeries'),
        ]));
    }
}
