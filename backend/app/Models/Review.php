<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'food_id',
        'name',
        'comment',
        'rating',
        'is_approved',
    ];

    protected $casts = [
        'rating' => 'float',
        'is_approved' => 'boolean',
    ];
}
