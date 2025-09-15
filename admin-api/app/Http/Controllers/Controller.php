<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public function returnResponseData($status = 'success', $result, $type = "normal")
    {
        return response()->json([
            'status' => $status,
            'type' => $type,
            'result' => $result,
        ]);
    }
    public function returnResponseResult($result, $status = 'success')
    {
        return response()->json([
            'status' => $status,
            'result' => $result,
        ]);
    }
    public function returnResponseStatus($message, $status = 'success')
    {
        return response()->json([
            'status' => $status,
            'message' => $message,
        ]);
    }
    public function returnResponseBase($resource, $requets, $result)
    {
        if ($requets->isSelectAll === true || $requets->isSelectAll == "true") {
            return $this->returnResponseData(
                'success',
                $result,
            );
        }

        if ($requets->excel !== true) {
            $data = $resource::collection($result->items());
            $result->setCollection($data->collect());
        }
        return $this->returnResponseData(
            'success',
            $result,
            $requets->excel !== true
                ? 'normal'
                : ($requets->isSelectAll !== true
                    ? 'excel'
                    : 'selectAll')
        );
    }

    public function returnDataBase($result, $status = 'success')
    {
        return $this->returnResponseData($status, $result);
    }

    public function returnResponseMessage($status = "success", $messageKey, $typeFullText = false)
    {
        return response()->json([
            'status' => $status,
            'message' =>  $typeFullText ? $messageKey :  trans('message.acctionMessage', [
                'attribute' => trans("message.$messageKey"),
                'status' => trans("message.$status"),
            ]),
        ]);
    }
    public function handleRequest(\Closure $callback)
    {
        try {
            $result = $callback();
            return $result;
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
