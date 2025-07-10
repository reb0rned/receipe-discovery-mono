"use client";

import Link from "next/link";
import React from "react";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuthStore();

  return (
    <nav className="bg-pink-600 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/">
        <span className="text-xl font-bold cursor-pointer">FlavorAI</span>
      </Link>

      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link href="/recipes/create">Create recipe</Link>
            <button onClick={logout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
