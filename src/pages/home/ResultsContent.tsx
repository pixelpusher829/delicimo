import type { Recipe } from "@/types";
import ResultCard from "./ResultCard";

interface ResultsContentProps {
  recipes: Recipe[];
  loading: boolean;
  currentPage: number;
}

const ITEMS_PER_PAGE = 5;

const ResultsContent: React.FC<ResultsContentProps> = ({
  recipes,
  loading,
  currentPage,
}) => {
  if (loading) {
    return <div className="mt-6 text-center">Loading...</div>;
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRecipes = recipes.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="mt-6 grid grid-cols-5 gap-6">
      {paginatedRecipes.map((recipe) => (
        <ResultCard key={recipe.id} recipe={recipe} />
      ))}
      {paginatedRecipes.length === 0 && (
        <div className="col-span-5 text-center py-20 text-neutral-500">
          No recipes found for this filter.
        </div>
      )}
    </div>
  );
};

export default ResultsContent;
