<?php

use App\Http\Controllers\reactController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/getdata", [reactController::class, "getdata"]);
Route::post("/insertdata", [reactController::class, "insertdata"]);
Route::get("/deletedata/{id}", [reactController::class, "deletedata"]);
Route::get("/editdata/{id}", [reactController::class, "editdata"]);
Route::post("/update", [reactController::class, "update"]);
