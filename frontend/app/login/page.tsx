"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/axios";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const { login } = useAuthStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.id);

      router.push("/");
    } catch (e: any) {
      setError(e.response?.data?.message || "Something went wrong...");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
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
          Login
        </button>
      </form>
    </main>
  );
}
