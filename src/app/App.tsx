import { useState } from "react";
import { Route, Routes, useSearchParams } from "react-router";
import { useSearchRecipes } from "@/api/useSearchRecipes";
import Root from "@/layout/Root";
import { Home, Recipe } from "@/pages";

function App() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const [isMock, setIsMock] = useState(false);
  const { recipes, loading } = useSearchRecipes(searchTerm, setIsMock);

  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home recipes={recipes} loading={loading} />} />
        <Route
          path="/recipe/:id"
          element={<Recipe allRecipes={recipes} isMock={isMock} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
