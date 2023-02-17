<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class FeedbackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "subject" => fake()->paragraph(1),
            "body" => fake()->paragraph(20),
            "file" => fake()->randomLetter(),
            "user_id" => User::all()->random()->id,
            "email" => User::all()->random()->email,
            "name" => User::all()->random()->name,
            "user_created_at" => fake()->dateTimeBetween("-1 day", now()),
        ];
    }
}
