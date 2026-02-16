import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import type { Recipe as RecipeType } from "@/types";
import Hero from "./Hero";
import Results from "./Results";

interface HomeProps {
  recipes: RecipeType[];
  loading: boolean;
}

const Home: React.FC<HomeProps> = ({ recipes, loading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(query);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCuisine, setSelectedCuisine] = useState<string>("all");

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

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
