import type { Recipe } from "@/types";
import ResultsBar from "./ResultsBar";
import ResultsContent from "./ResultsContent";

interface ResultsProps {
  recipes: Recipe[];
  loading: boolean;
  searchTerm: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  selectedCuisine: string;
  setSelectedCuisine: (cuisine: string) => void;
}

const Results: React.FC<ResultsProps> = ({
  recipes,
  loading,
  searchTerm,
  currentPage,
  setCurrentPage,
  selectedCuisine,
  setSelectedCuisine,
}) => {
  const filteredRecipes = recipes.filter((recipe) => {
    if (selectedCuisine === "all") return true;
    return recipe.cuisines?.includes(selectedCuisine);
  });

  return (
    <div className="bg-neutral-100 px-6 pt-12 pb-16">
      <div className="m-auto max-w-360">
        <ResultsBar
          recipes={filteredRecipes}
          searchTerm={searchTerm}
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
