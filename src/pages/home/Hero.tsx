import { Search } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";

const Hero: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  return (
    <div className="relative overflow-hidden bg-[url('../assets/hero.webp')]">
      <div className="absolute inset-0 z-0 bg-black/5"></div>
      <div className="items-left align-center relative z-2 m-auto mt-20 flex min-h-100 max-w-360 flex-col justify-center p-6">
        <div className="flex max-w-xl flex-col gap-4">
          <h1 className="text-5xl">
            Wholesome Recipes For <wbr /> The Whole Family
          </h1>
          <span className="text-2xl">Smarter search for everyday cooking.</span>
          <form
            className="mt-4 flex w-fit rounded-full bg-white p-1"
            onSubmit={(e) => {
              e.preventDefault();
              setSearchParams({ q: searchTerm });
            }}
          >
            <input
              className="mr-2 min-w-64 rounded-full px-4 py-2 focus:outline-none"
              type="text"
              placeholder="Search for a recipe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-2 text-white transition-colors hover:bg-yellow-400"
            >
              Search
              <Search className="w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
