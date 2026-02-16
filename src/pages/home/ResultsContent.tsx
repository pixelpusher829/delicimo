import type { Recipe } from "@/types";
import ResultCard from "./ResultCard";

interface ResultsContentProps {
  recipes: Recipe[];
  loading: boolean;
  currentPage: number;
}

const ResultsContent: React.FC<ResultsContentProps> = ({
  recipes,
  loading,
  currentPage,
}) => {
  if (loading) {
    return <div className="mt-6 text-center">Loading...</div>;
  }

  const startIndex = (currentPage - 1) * 5;
  const paginatedRecipes = recipes.slice(startIndex, startIndex + 5);

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
      {paginatedRecipes.map((recipe) => (
        <ResultCard key={recipe.id} recipe={recipe} />
      ))}
      {paginatedRecipes.length === 0 && (
        <div className="col-span-5 py-20 text-center text-neutral-500">
          No recipes found for this filter.
        </div>
      )}
    </div>
  );
};

export default ResultsContent;
