<?php

namespace App\Enums;

enum OrderStatusEnum: string
{
    case Draft = 'draft';
    case Paid = 'paid';
    case Cancelled = 'cancelled';
    case Shipped = 'shipped';
    case Delivered = 'delivered';
    

    public static function labels()
    {
        return[
            self::Draft => 'Draft',
            self::Paid => 'Paid',
            self::Cancelled => 'Cancelled',
            self::Shipped => 'Shipped',
            self::Delivered => 'Delivered',
        ];
    }
}
