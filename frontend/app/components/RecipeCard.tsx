"use client";

import React from "react";
import Link from "next/link";

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

interface RecipeCardProps {
  recipe: Recipe;
  currentUserId: number | null;
  onDelete: (id: number) => void;
}

export default function RecipeCard({
  recipe,
  currentUserId,
  onDelete,
}: RecipeCardProps) {
  const renderStars = (rating: number) => {
    if (!rating || rating <= 0)
      return <span className="text-sm text-gray-400">No rating yet</span>;

    return (
      <div className="flex gap-1 text-yellow-400">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>{i < rating ? "★" : "☆"}</span>
        ))}
      </div>
    );
  };

  const isAuthor = currentUserId === recipe.author.id;

  return (
    <li
      className="bg-white border border-pink-300 rounded-lg p-6 shadow-md
      hover:shadow-pink-400 transition-shadow duration-300"
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-semibold text-pink-700">{recipe.title}</h2>
        {renderStars(recipe.averageRating)}
      </div>
      <p className="text-gray-700 mb-4">{recipe.description}</p>
      <p className="text-pink-600 mb-5 flex items-center gap-2 font-semibold">
        <span role="img" aria-label="chef" className="text-xl">
          👨‍🍳
        </span>
        Author: {recipe.author.email}
      </p>
      <div className="flex justify-end gap-4 items-center mt-4">
        <Link
          href={`/recipes/${recipe.id}`}
          className="text-pink-600 font-semibold hover:underline"
        >
          Learn more →
        </Link>
        {isAuthor && (
          <>
            <Link
              href={`/recipes/edit/${recipe.id}`}
              className="px-3 py-1 rounded-md bg-pink-600 text-white font-semibold hover:bg-pink-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-1"
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(recipe.id)}
              type="button"
              className="px-3 py-1 rounded-md bg-pink-400 text-white font-semibold hover:bg-pink-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-1"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
