<?php

namespace App\Http\Requests;

use App\Services\Request\BaseRequest;

class ProductRequest extends BaseRequest
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
                'category_id' => 'required|integer|exists:category,id',
                'publisher_id' => 'required|integer|exists:publisher,id',
                'author_id' => 'required|integer|exists:author,id',
                'price' => 'required|integer|min:0',
                'pages' => 'required|integer|min:0',
                'lang' => 'required|string|min:1',
                'figures' => 'required',
                'published_ad' => 'required',
                'ended_ad' => 'required',
                'started_ad' => 'required',
                'images' => 'array|min:1',
                'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'coverPhoto' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ];

            if ($this->isMethod('post')) {
                $rule['code'] = '|unique:product,code';
                $rule['images'] = '|required';
                $rule['coverPhoto'] = '|required';
            } elseif ($this->isMethod('put')) {
                $rule['code'] = '|unique:product,code,' . $this->id;
                $rule['images'] = '|nullable';
                $rule['coverPhoto'] = '|nullable';
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdate('product'));
            }
        } elseif ($this->isMethod('get')) {
            $rule = $this->getMethodGet();
        } elseif ($this->isMethod('delete')) {
            $rule = $this->checkIdMethodDelete('product', $this->id);
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
            'name' => trans('message.nameProduct'),
            'code' => trans('message.codeProduct'),
            'description' => trans('message.descriptionProduct'),
            'status' => trans('message.idProduct'),
            'id' => trans('message.idProduct'),
            'category_id' => trans('message.idCategory'),
            'publisher_id' => trans('message.idPublisher'),
            'author_id' => trans('message.idAuthor'),
            'price' => trans('message.priceProduct'),
            'pages' => trans('message.pagesProduct'),
            'lang' => trans('message.langProduct'),
            'figure' => trans('message.figuresProduct'),
            'published_ad' => trans('message.published_adProduct'),
            'ended_ad' => trans('message.ended_adProduct'),
            'started_ad' => trans('message.started_adProduct'),
            'images' => trans('message.imagesProduct'),
            'coverPhoto' => trans('message.coverPhotoProduct'),
        ]));
    }
}
