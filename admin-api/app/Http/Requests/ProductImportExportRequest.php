<?php

namespace App\Http\Requests;


use App\Services\Request\BaseRequest;

class ProductImportExportRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        $rule = [];
        if ($this->isMethod('post') || $this->isMethod('put')) {
            $rule = [
                'product_id' => 'required|integer|exists:product,id',
                'code' => 'nullable|string|min:5|max:60',
                'action' => 'required|string|in:BUY,SELL,RENT,RETURN',
                'type' => 'required|string|in:import,export',
                'mode' => 'nullable|string|max:255',
                'quantity' => 'required|integer|min:1',

                'import_price' => 'nullable|numeric|min:0',
                'expected_sell_price' => 'nullable|numeric|min:0',
                'expected_rent_price' => 'nullable|numeric|min:0',
                'actual_price_at_that_time' => 'nullable|numeric|min:0',

                'note' => 'nullable|string|max:2000',
            ];

            if ($this->isMethod('put')) {
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
            'product_id' => trans('message.idProduct'),
            'codeProductIE' => trans('message.codeProductIE'),
            'action' => trans('message.actionProductIE'),
            'type' => trans('message.typeProductIE'),
            'mode' => trans('message.modeProductIE'),
            'quantity' => trans('message.quantityProductIE'),
            'import_price' => trans('message.import_priceProductIE'),
            'expected_sell_price' => trans('message.expected_sell_priceProductIE'),
            'expected_rent_price' => trans('message.expected_rent_priceProductIE'),
            'actual_price_at_that_time' => trans('message.actual_price_at_that_timeProductIE'),
            'note' => trans('message.noteProductIE')
        ]));
    }
}
