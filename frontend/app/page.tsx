"use client";

import React, { useEffect, useState } from "react";
import api from "../app/lib/axios";
import Loading from "./components/Loading";
import RecipeCard from "./components/RecipeCard";
import { useAuthStore } from "./store/authStore";

interface Recipe {
  id: number;
  title: string;
  description: string;
  averageRating: number;
  author: {
    id: number;
    email: string;
  };
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    api
      .get("/recipes")
      .then((res) => setRecipes(res.data))
      .catch(() => setError("Error while loading..."))
      .finally(() => setLoading(false));
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes((prev) => prev.filter((r) => r.id !== id));
    } catch {
      alert("Failed to delete recipe");
    }
  };

  return (
    <main className="min-h-screen bg-pink-50 py-12">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-pink-700 text-center">
          All recipes
        </h1>

        <input
          type="text"
          placeholder="Search recipes by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-8 px-4 py-3 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-900 placeholder-gray-400"
        />

        {loading && <Loading />}
        {error && <p className="text-red-600">{error}</p>}

        <ul className="space-y-6">
          {filteredRecipes.length === 0 && !loading && (
            <p className="text-center text-gray-500">No recipes found.</p>
          )}
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              currentUserId={userId}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
