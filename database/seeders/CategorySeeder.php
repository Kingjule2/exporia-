<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            // --- AGRICULTURE (Department ID: 1) ---
            // Parent
            ['name' => 'Agriculture', 'departemen_id' => 1, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            // Sub-Categories (Parent: Spices & Herbs)
            ['name' => 'Black Pepper', 'departemen_id' => 1, 'parent_id' => 1, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'White Pepper', 'departemen_id' => 1, 'parent_id' => 1, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Cinnamon Sticks', 'departemen_id' => 1, 'parent_id' => 1, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Cloves', 'departemen_id' => 1, 'parent_id' => 1, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Nutmeg', 'departemen_id' => 1, 'parent_id' => 1, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Ginger Powder', 'departemen_id' => 1, 'parent_id' => 1, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Turmeric', 'departemen_id' => 1, 'parent_id' => 1, 'active' => true, 'created_at' => now(), 'updated_at' => now()],

            // --- MINERALS & ENERGY (Department ID: 2) ---
            // Parent
            ['name' => 'Minerals & Energy', 'departemen_id' => 2, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            // Sub-Categories (Parent: Coal Products)
            ['name' => 'Thermal Coal', 'departemen_id' => 2, 'parent_id' => 9, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Anthracite', 'departemen_id' => 2, 'parent_id' => 9, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Coking Coal', 'departemen_id' => 2, 'parent_id' => 9, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Lignite', 'departemen_id' => 2, 'parent_id' => 9, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Coal Briquettes', 'departemen_id' => 2, 'parent_id' => 9, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Activated Carbon', 'departemen_id' => 2, 'parent_id' => 9, 'active' => true, 'created_at' => now(), 'updated_at' => now()],

            // --- MARINE & FISHERIES (Department ID: 3) ---
            // Parent
            ['name' => 'Marine & Fisheries', 'departemen_id' => 3, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            // Sub-Categories (Parent: Frozen Seafood)
            ['name' => 'Vannamei Shrimp', 'departemen_id' => 3, 'parent_id' => 16, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Yellowfin Tuna', 'departemen_id' => 3, 'parent_id' => 16, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Skipjack Tuna', 'departemen_id' => 3, 'parent_id' => 16, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Octopus', 'departemen_id' => 3, 'parent_id' => 16, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Calamari Rings', 'departemen_id' => 3, 'parent_id' => 16, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Lobster Tails', 'departemen_id' => 3, 'parent_id' => 16, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Crab Meat', 'departemen_id' => 3, 'parent_id' => 16, 'active' => true, 'created_at' => now(), 'updated_at' => now()],

            // --- NATURAL EARTH PRODUCTS (Department ID: 4) ---
            // Parent
            ['name' => 'Natural Earth Products', 'departemen_id' => 4, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            // Sub-Categories (Parent: Wood & Rattan)
            ['name' => 'Teak Wood Logs', 'departemen_id' => 4, 'parent_id' => 24, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Plywood Panels', 'departemen_id' => 4, 'parent_id' => 24, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Raw Rattan Cane', 'departemen_id' => 4, 'parent_id' => 24, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Bamboo Poles', 'departemen_id' => 4, 'parent_id' => 24, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Finger Joint Board', 'departemen_id' => 4, 'parent_id' => 24, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Wood Pellets', 'departemen_id' => 4, 'parent_id' => 24, 'active' => true, 'created_at' => now(), 'updated_at' => now()],

            // --- LIVESTOCK & ANIMAL PRODUCTS (Department ID: 5) ---
            // Parent
            ['name' => 'Livestock & Animal Products', 'departemen_id' => 5, 'parent_id' => null, 'active' => true, 'created_at' => now(), 'updated_at' => now()],

            // Sub-Categories (Parent: Livestock - ID: 31)
            ['name' => 'Edible Bird Nest', 'departemen_id' => 5, 'parent_id' => 31, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Cow Hide Leather', 'departemen_id' => 5, 'parent_id' => 31, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Sheep Wool', 'departemen_id' => 5, 'parent_id' => 31, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Palm Kernel Shell', 'departemen_id' => 5, 'parent_id' => 31, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Fish Meal Feed', 'departemen_id' => 5, 'parent_id' => 31, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Honey & Bee Products', 'departemen_id' => 5, 'parent_id' => 31, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Duck Down Feathers', 'departemen_id' => 5, 'parent_id' => 31, 'active' => true, 'created_at' => now(), 'updated_at' => now()],
        ];
        DB::table('categories')->insert($categories);

    }
}
