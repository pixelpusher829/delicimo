import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import type { Recipe as RecipeType } from "@/types";
import Hero from "./Hero";
import Results from "./Results";

interface HomeProps {
  recipes: RecipeType[];
  loading: boolean;
  activeSearchTerm: string;
}

const Home: React.FC<HomeProps> = ({ recipes, loading, activeSearchTerm }) => {
  const [, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(activeSearchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCuisine, setSelectedCuisine] = useState<string>("all");

  useEffect(() => {
    setSearchTerm(activeSearchTerm);
  }, [activeSearchTerm]);

  const handleCuisineChange = (cuisine: string) => {
    setSelectedCuisine(cuisine);
    setCurrentPage(1);
  };

  return (
    <>
      <Hero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchParams={setSearchParams}
      />
      <Results
        recipes={recipes}
        loading={loading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedCuisine={selectedCuisine}
        setSelectedCuisine={handleCuisineChange}
      />
    </>
  );
};

export default Home;
