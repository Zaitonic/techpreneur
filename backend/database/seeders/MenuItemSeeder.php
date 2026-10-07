<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['slug'=>'silog',  'name'=>'CDMSilog',      'description'=>'Garlic rice, egg, and your choice of protein',        'price'=>30, 'original_price'=>45, 'image'=>'SILOG.jpg',  'rating'=>4.7, 'category'=>'Filipino'],
            ['slug'=>'pancit', 'name'=>'Pancit Canton', 'description'=>'Stir-fried noodles with vegetables and meat/seafood',  'price'=>25, 'original_price'=>35, 'image'=>'CANTON.jpg', 'rating'=>4.3, 'category'=>'Filipino'],
            ['slug'=>'kbop',   'name'=>'K-Bop Bwol',   'description'=>'Korean-style rice bowl with protein and vegetables',    'price'=>35, 'original_price'=>50, 'image'=>'KOREAN.jpg', 'rating'=>4.6, 'category'=>'Korean'],
            ['slug'=>'siomai', 'name'=>'Siomai Rice',   'description'=>'Steamed dumplings served with garlic rice',            'price'=>20, 'original_price'=>null,'image'=>'SIOMAI.jpg','rating'=>4.4, 'category'=>'Chinese'],
        ];

        foreach ($items as $item) {
            DB::table('menu_items')->updateOrInsert(
                ['slug' => $item['slug']],
                array_merge($item, ['created_at' => now(), 'updated_at' => now()])
            );
        }
    }
}
