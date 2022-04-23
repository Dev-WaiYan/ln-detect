<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecordHistory extends Model
{
    use HasFactory;

    protected $casts = [
        'detected_languages' => 'array'
    ];
}
