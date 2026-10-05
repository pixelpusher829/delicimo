import { useSearchParams } from "react-router";
import Discover from "./Discover";
import Hero from "./Hero";
import SearchResults from "./SearchResults";

const Home = () => {
  const [params] = useSearchParams();
  const q = params.get("q")?.trim() ?? "";

  return (
    <>
      <title>
        {q ? `${q} recipes · Delicimo` : "Delicimo · Wholesome recipes"}
      </title>
      <Hero compact={Boolean(q)} />
      {q ? <SearchResults key={q} query={q} /> : <Discover />}
    </>
  );
};

export default Home;
