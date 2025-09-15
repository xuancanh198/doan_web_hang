<?php

namespace App\Http\Requests;

use App\Services\Request\BaseRequest;

class CategoryRequest extends BaseRequest
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
                'code' => 'required|string|min:5|max:60|unique:category,code',
                'description' => 'nullable|string',
                'status' => 'nullable|integer|in:0,1',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
                'parent_id' => 'nullable|integer|min:0|exists:category,id',
            ];

            if ($this->isMethod('post')) {
                $rule['image'] = 'required|' . $rule['image'];
            } elseif ($this->isMethod('put')) {
                $rule['code'] = 'required|string|min:5|max:60|unique:category,code,' . $this->id;
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdate('category'));
            }
        } elseif ($this->isMethod('get')) {
            $rule = $this->getMethodGet();
        } elseif ($this->isMethod('delete')) {
            $rule = $this->checkIdMethodDelete('category', $this->id);
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
            'name' => trans('message.nameCategory'),
            'code' => trans('message.codeCategory'),
            'image' => trans('message.imageCategory'),
            'description' => trans('message.descriptionCategory'),
            'status' => trans('message.statusCategory'),
            'parent_id' => trans('message.parent_idCategory'),
            'id' => trans('message.idCategory'),
        ]));
    }
    protected function prepareForValidation()
    {
        parent::prepareForValidation(); // vẫn giữ logic cha

        if ($this->has('parent_id') && ($this->parent_id === "null" || $this->parent_id === "")) {
            $this->merge([
                'parent_id' => null,
            ]);
        }
    }
}
