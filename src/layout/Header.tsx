import { Bookmark } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router";
import SearchForm from "@/components/SearchForm";
import { useRecipeList } from "@/hooks/useRecipeList";
import { cn } from "@/lib/utils";

const Header = () => {
  const { pathname } = useLocation();
  const savedCount = useRecipeList("favorites").length;
  // The home page has its own large search box in the hero.
  const showSearch = pathname !== "/";

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/90 backdrop-blur-lg print:hidden">
      <div className="m-auto flex max-w-360 items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <img src="/delicimo.svg" alt="" className="w-8 sm:w-9" />
          <span className="text-xl font-semibold sm:text-2xl">Delicimo</span>
        </Link>

        <div className="flex flex-1 justify-center">
          {showSearch && (
            <SearchForm size="sm" className="hidden max-w-md md:flex" />
          )}
        </div>

        <NavLink
          to="/saved"
          className={({ isActive }) =>
            cn(
              "flex shrink-0 items-center gap-2 rounded-full px-3 py-2 font-medium transition-colors hover:bg-neutral-100",
              isActive && "bg-neutral-100",
            )
          }
        >
          <Bookmark className="size-5" aria-hidden />
          <span>Saved</span>
          {savedCount > 0 && (
            <span className="rounded-full bg-brand px-2 text-sm font-semibold text-neutral-900">
              {savedCount}
            </span>
          )}
        </NavLink>
      </div>
      {showSearch && (
        <div className="px-4 pb-3 md:hidden">
          <SearchForm size="sm" />
        </div>
      )}
    </header>
  );
};

export default Header;
