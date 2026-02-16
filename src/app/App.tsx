import { Route, Routes } from "react-router";
import { useSearchRecipes } from "@/api/useSearchRecipes";
import Root from "@/layout/Root";
import { Home, Recipe } from "@/pages";

function App() {
  const { recipes, loading } = useSearchRecipes("");

  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home recipes={recipes} loading={loading} />} />
        <Route path="/recipe/:id" element={<Recipe allRecipes={recipes} />} />
      </Route>
    </Routes>
  );
}

export default App;
