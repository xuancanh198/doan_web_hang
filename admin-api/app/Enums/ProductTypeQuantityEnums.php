<?php

namespace App\Enums;

enum ProductTypeQuantityEnums
{
    const IMPORT = 'IMPORT';
    const EXPORT = 'EXPORT';

    const BUY = 'BUY';                   // Nhập hàng từ NCC
    const SELL = 'SELL';                 // Bán cho khách
    const RENT = 'RENT';                 // Cho thuê
    const RETURN_RENT = 'RETURN_RENT';   // Khách trả hàng thuê
    const RETURN_SALE = 'RETURN_SALE';   // Khách trả hàng đã mua
    const RETURN_IMPORT = 'RETURN_IMPORT'; // Trả hàng lại cho NCC
    const MOVE_IN = 'MOVE_IN';           // Nhập từ kho khác
    const LOST = 'LOST';                 // Mất mát
    const MANUAL = 'MANUAL';

    const INCREASE = 'INCREASE'; // Tăng số lượng
    const DECREASE = 'DECREASE'; // Giảm số lượng
}
