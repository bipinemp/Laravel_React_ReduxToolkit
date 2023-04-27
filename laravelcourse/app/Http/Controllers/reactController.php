<?php

namespace App\Http\Controllers;

use App\Models\todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class reactController extends Controller
{
    public function getdata()
    {
        $data = todo::all();
        if ($data) {
            return response()->json([
                "status" => 200,
                "data" => $data
            ]);
        } else {
            return response()->json([
                "status" => 401,
                "msg" => "Error in fetching data"
            ]);
        }
    }
    public function insertdata(Request $req)
    {
        $check = $req->validate([
            "name" => "required",
            "desc" => "required",
            "image" => "required"
        ]);
        if ($check) {
            $todo = new todo();
            $todo->name = $req->name;
            $todo->desc = $req->desc;
            $image = $req->file('image');

            $ext = $image->getClientOriginalExtension();
            if ($ext != 'png' && $ext != 'jpg' && $ext != 'jpeg' && $ext != 'webp') {
                return response()->json([
                    "status" => 401,
                    "msg" => "Invalid extension"
                ]);
            }
            $name = time() . $image->getClientOriginalName();
            $image->move((public_path('image')), $name);
            $todo->image = $name;
            if ($todo->save()) {
                return response()->json([
                    "id" => $todo->id,
                    "name" => $todo->name,
                    "desc" => $todo->desc,
                    "image" => $todo->image,
                    "status" => 200,
                    "msg" => "Inserted Successfully"
                ]);
            } else {
                return response()->json([
                    "status" => 401,
                    "msg" => "Error in Inserting"
                ]);
            }
        } else {
            return response()->json([
                "status" => 401,
                "msg" => "Validation failed"
            ]);
        }
    }
    public function deletedata($id)
    {
        $data = todo::find($id);
        $image_path = public_path("/image/" . $data->image);
        unlink($image_path);
        if (!$data) {
            return response()->json([
                "status" => 401,
                "msg" => "Error in Deleting"
            ]);
        }
        if ($data->delete()) {
            return response()->json([
                "status" => 200,
                "msg" => "Deleted Successfully"
            ]);
        } else {
            return response()->json([
                "status" => 401,
                "msg" => "Error in Deleting"
            ]);
        }
    }
    public function editdata($id)
    {
        $data = todo::find($id);

        if ($data) {
            return response()->json([
                "status" => 200,
                "data" => $data
            ]);
        }
    }
    public function update(Request $req)
    {
        $data = todo::find($req->id);

        $req->validate([
            "name" => "required",
            "desc" => "required",
            "image" => "required"
        ]);
        $data->name = $req->name;
        $data->desc = $req->desc;
        $data->image = $req->image;
        if ($data->save()) {
            return response()->json([
                "status" => 200,
                "msg" => "Updated Successfully"
            ]);
        } else {
            return response()->json([
                "status" => 401,
                "msg" => "Error on updating data"
            ]);
        }
    }
}
