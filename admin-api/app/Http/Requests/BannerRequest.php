<?php

namespace App\Http\Requests;

use App\Services\Request\BaseRequest;

class BannerRequest extends BaseRequest
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
                'title' => 'required|string|min:4|max:255',
                'link' => 'nullable|string|min:5|max:60',
                'description' => 'nullable|string',
                'position' => 'required|string',
                'order' => 'required|integer|min:1',
                'start_time' => 'required',
                'end_time' => 'required',
                'image' => 'image|mimes:jpeg,png,jpg,gif|max:10240',
            ];

            if ($this->isMethod('post')) {
                $rule['image'] = '|nullable';
            } elseif ($this->isMethod('put')) {
                $rule['code'] = '|nullable';
                $rule = array_merge($rule, $this->getMethodIdDeleteAndUpdate('banners'));
            }
        } elseif ($this->isMethod('get')) {
            $rule = $this->getMethodGet();
        } elseif ($this->isMethod('delete')) {
            $rule = $this->checkIdMethodDelete('banners', $this->id);
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

        return array_merge($attributes, [
            'title'       => trans('message.titleBanner'),
            'link'        => trans('message.linkBanner'),
            'description' => trans('message.descriptionBanner'),
            'position'    => trans('message.positionBanner'),
            'order'       => trans('message.orderBanner'),
            'start_time'  => trans('message.startTimeBanner'),
            'end_time'    => trans('message.endTimeBanner'),
            'image'       => trans('message.imageBanner'),
            'status'      => trans('message.statusBanner'),
            'code'        => trans('message.codeBanner'),
            'id'          => trans('message.idBanner'),
        ]);
    }
}
