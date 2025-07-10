"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-pink-600 border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full bg-pink-100 opacity-60"></div>
      </div>
    </div>
  );
}
