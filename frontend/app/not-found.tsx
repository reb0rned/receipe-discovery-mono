"use client";

import React from "react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-pink-50 px-4">
      <h1 className="text-6xl font-extrabold text-pink-700 mb-6">404</h1>
      <p className="text-2xl text-gray-700 mb-4">Page Not Found</p>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 transition"
      >
        Go back home
      </Link>
    </main>
  );
}
