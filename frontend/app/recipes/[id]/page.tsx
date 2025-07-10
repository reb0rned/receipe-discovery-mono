import { notFound } from "next/navigation";

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  averageRating: number;
  author: {
    id: number;
    email: string;
  };
}

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3001/api/recipes/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const recipe: Recipe = await res.json();

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 border border-pink-300">
      <h1 className="text-4xl font-extrabold mb-6 text-pink-600">
        {recipe.title}
      </h1>
      <p className="text-gray-700 mb-6 text-lg italic border-l-4 border-pink-400 pl-4">
        {recipe.description}
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-pink-500 border-b-2 border-pink-300 pb-1">
          Ingredients
        </h2>
        <p className="whitespace-pre-line text-gray-800 leading-relaxed">
          {recipe.ingredients}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-pink-500 border-b-2 border-pink-300 pb-1">
          Instructions
        </h2>
        <p className="whitespace-pre-line text-gray-800 leading-relaxed">
          {recipe.instructions}
        </p>
      </section>

      <footer className="flex items-center justify-between mt-10 border-t border-pink-200 pt-4">
        <div>
          <p className="text-sm text-pink-600 font-medium">
            👨‍🍳 Author:{" "}
            <span className="underline">
              {recipe.author?.email || "Unknown"}
            </span>
          </p>
        </div>

        <div className="text-yellow-500 text-2xl select-none">
          {recipe.averageRating > 0 ? (
            Array.from({ length: 5 }, (_, i) => (
              <span key={i}>{i < recipe.averageRating ? "★" : "☆"}</span>
            ))
          ) : (
            <span className="text-sm text-pink-300 italic">No rating yet</span>
          )}
        </div>
      </footer>
    </main>
  );
}
