"use client";

import React from "react";
import { useState } from "react";
import api from "../lib/axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/user", { email, password });
      router.push("/login");
    } catch (e: any) {
      setError(e.response?.data?.message || "Something went wrong...");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Sign up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Sign up
        </button>
      </form>
    </main>
  );
}
