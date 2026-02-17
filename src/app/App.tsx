import { useState, useEffect } from "react";
import { Route, Routes, useSearchParams } from "react-router";
import { useSearchRecipes } from "@/api/useSearchRecipes";
import Root from "@/layout/Root";
import { Home, Recipe } from "@/pages";

function App() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [activeSearchTerm, setActiveSearchTerm] = useState(query || "");
  const [prevQuery, setPrevQuery] = useState(query);

  if (query !== prevQuery) {
    setPrevQuery(query);
    if (query !== null) {
      setActiveSearchTerm(query);
    }
  }

  const [isMock, setIsMock] = useState(() => {
    const saved = sessionStorage.getItem("isMock");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    sessionStorage.setItem("isMock", JSON.stringify(isMock));
  }, [isMock]);

  const { recipes, loading } = useSearchRecipes(activeSearchTerm, setIsMock);

  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home recipes={recipes} loading={loading} activeSearchTerm={activeSearchTerm} />} />
        <Route
          path="/recipe/:id"
          element={<Recipe allRecipes={recipes} isMock={isMock} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
