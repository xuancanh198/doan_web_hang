<?php

namespace App\Enums;

enum ProductTypeQuantityEnums
{
    const IMPORT = 'import ';
    const EXPORT = 'export';  
    
     const BUY = 'buy';                   // Nhập hàng từ NCC
     const SELL = 'sell';                 // Bán cho khách
     const RENT = 'rent';                 // Cho thuê
     const RETURN_RENT = 'return_rent';   // Khách trả hàng thuê
     const RETURN_SALE = 'return_sale';   // Khách trả hàng đã mua
     const RETURN_IMPORT = 'return_import'; // Trả hàng lại cho NCC
     const MOVE_IN = 'move_in';           // Nhập từ kho khác
     const LOST = 'lost';                 // Mất mát
     const MANUAL = 'manual';
}
