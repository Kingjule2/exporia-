<?php

namespace App\Enums;

enum PermissionsEnum: string
{
    case ApproveVendor = 'ApproveVendor';
    case SellProduct = 'SellProduct';

    case BuyProduct = 'BuyProduct';
}
