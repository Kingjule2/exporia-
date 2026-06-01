<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DepartementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departements = [
            [
                'name' => 'Agriculture',
                'slug' => 'Agriculture',
                'active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Minerals & Energy',
                'slug' => Str::slug('Minerals & Energy'),
                'active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Marine & Fisheries',
                'slug' => Str::slug('Marine & Fisheries'),
                'active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Natural Earth Products',
                'slug' => Str::slug('Natural Earth Products'),
                'active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Livestock & Animal Products',
                'slug' => Str::slug('Livestock & Animal Products (LAP)'),
                'active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],


        ];
        DB::table('departemens')->insert($departements);
    }

}
