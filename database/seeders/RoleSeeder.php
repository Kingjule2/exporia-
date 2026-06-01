<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Enums\RolesEnum;
use App\Enums\PermissionsEnum;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userRole = Role::create([
            'name' => RolesEnum::User->value,
        ]);

        $vendorRole = Role::create([
            'name' => RolesEnum::Vendor->value,
        ]);

        $adminRole = Role::create([
            'name' => RolesEnum::Admin->value,
        ]);

        $approveVendors = Permission::create(['name' => PermissionsEnum::ApproveVendor->value]);
        $sellProduct = Permission::create(['name' => PermissionsEnum::SellProduct->value]);
        $buyProduct = Permission::create(['name' => PermissionsEnum::BuyProduct->value]);

        $userRole->syncPermissions([$buyProduct,]);
        $vendorRole->syncPermissions([$sellProduct, $buyProduct]);
        $adminRole->syncPermissions([$approveVendors, $sellProduct, $buyProduct]);
    }
}
