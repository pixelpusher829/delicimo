import type { Recipe } from "@/types";
import ResultsBar from "./ResultsBar";
import ResultsContent from "./ResultsContent";

interface ResultsProps {
  recipes: Recipe[];
  loading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  selectedCuisine: string;
  setSelectedCuisine: (cuisine: string) => void;
}

const Results: React.FC<ResultsProps> = ({
  recipes,
  loading,
  currentPage,
  setCurrentPage,
  selectedCuisine,
  setSelectedCuisine,
}) => {
  const allCuisines = Array.from(
    new Set(recipes.flatMap((r) => r.cuisines || []))
  ).sort();

  const filteredRecipes = recipes.filter((recipe) => {
    if (selectedCuisine === "all") return true;
    return recipe.cuisines?.includes(selectedCuisine);
  });

  return (
    <div className="bg-neutral-100 px-6 pt-12 pb-16">
      <div className="m-auto max-w-360">
        <ResultsBar
          recipes={filteredRecipes}
          allCuisines={allCuisines}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          selectedCuisine={selectedCuisine}
          setSelectedCuisine={setSelectedCuisine}
        />
        <ResultsContent
          recipes={filteredRecipes}
          loading={loading}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Results;
