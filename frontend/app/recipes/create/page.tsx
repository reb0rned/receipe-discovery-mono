"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/lib/axios";

export default function CreateRecipePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to create a recipe.");
        setLoading(false);
        return;
      }

      await api.post(
        "/recipes/create",
        { title, description, ingredients, instructions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/");
    } catch (err) {
      setError("Failed to create recipe. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-pink-50 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-pink-700">Create Recipe</h1>

        {error && <p className="mb-4 text-red-600">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block mb-1 font-semibold text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-pink-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-1 font-semibold text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="w-full border border-pink-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="ingredients"
              className="block mb-1 font-semibold text-gray-700"
            >
              Ingredients
            </label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
              rows={4}
              className="w-full border border-pink-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none text-gray-900 placeholder-gray-400"
              placeholder="List ingredients separated by new lines"
            />
          </div>

          <div>
            <label
              htmlFor="instructions"
              className="block mb-1 font-semibold text-gray-700"
            >
              Instructions
            </label>

            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
              rows={5}
              className="w-full border border-pink-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none text-gray-900 placeholder-gray-400"
              placeholder="Step by step cooking instructions"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white font-semibold py-3 rounded hover:bg-pink-700 transition"
          >
            {loading ? "Creating..." : "Create Recipe"}
          </button>
        </form>
      </div>
    </main>
  );
}
