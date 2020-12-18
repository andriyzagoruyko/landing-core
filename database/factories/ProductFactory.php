<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->words(3, true),
            'article' => $this->faker->word,
            'description' => $this->faker->paragraph(1),
            'price' => $this->faker->randomNumber(4),
            'available' => $this->faker->randomNumber(2)
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure()
    {
        return $this->afterCreating(function (Product $product) {
            $image = $this->faker->image('public/storage', 900, 500, null, true);
            $categories = Category::all()->random(3);
            $product->categories()->attach($categories);
            $product->addMedia($image)->toMediaCollection('images');
        });
    }
}
