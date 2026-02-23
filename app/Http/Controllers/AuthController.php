<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function register(Request $request)
    {
    // Validate input

     $validated = $request->validate([
        'name'=> 'required|string|max:255',
        'email'=> 'required|string|email|max:255|unique:users',
        'password'=>'required|string|min:6|confirmed',

     ]);


$user = User::create([
 'name' => $validated['name'],
 'email' => $validated['email'],
 'password' => Hash::make($validated['password'])
]);

  $token= $user->createToken('auth_token')->plainTextToken;
   
//return
return response()->json([
    'access_token' => $token,
    'user' => $user,
], status: 200);

        }

  public function login(Request $request): JsonResponse
  {
    $validated = $request->validate([
      'email' => 'required|string|email',
      'password' => 'required|string',
    ]);

    $user = User::where('email', $validated['email'])->first();

    if (! $user || ! Hash::check($validated['password'], $user->password)) {
      return response()->json(['message' => 'valid credentials'], 200);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
      'access_token' => $token,
      'user' => $user,
    ], status: 200);
  }

  public function logout(Request $request): JsonResponse
  {
    $token = $request->user()->currentAccessToken();

    if ($token) {
      $token->delete();
      return response()->json(['message' => 'Logged out'], 200);
    }

    return response()->json(['message' => ' active token found'], 200);
  }
    }





