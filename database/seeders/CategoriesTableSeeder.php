<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $parents = Category::factory()
            ->count(3)
            ->create();

        $parents = Category::factory()
            ->count(5)
            ->create()
            ->each(function($category) use ($parents) {
                $parents->random()->appendNode($category);
            });

        $parents = Category::factory()
            ->count(8)
            ->create()
            ->each(function($category) use ($parents) {
                $parents->random()->appendNode($category);
            });

        Category::factory()
            ->count(5)
            ->create()
            ->each(function($category) use ($parents) {
                $parents->random()->appendNode($category);
            });
    }
}
