import { Search, X } from "lucide-react";
import { useId, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { NO_FILTERS, parseFilters, serializeFilters } from "@/lib/filters";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  size?: "lg" | "sm";
  className?: string;
}

/**
 * Search only runs on submit (never per keystroke) because every new query
 * costs API quota. Submitting navigates to /?q=..., which is the single source
 * of truth for the active search.
 */
const SearchForm: React.FC<SearchFormProps> = ({ size = "lg", className }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const activeQuery = params.get("q") ?? "";
  const [value, setValue] = useState(activeQuery);
  const [prevQuery, setPrevQuery] = useState(activeQuery);
  const inputId = useId();

  // Keep the input in sync when the URL changes (back/forward, quick picks).
  if (activeQuery !== prevQuery) {
    setPrevQuery(activeQuery);
    setValue(activeQuery);
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    // Keep diet and time preferences across searches, but reset cuisine, since
    // the available cuisines depend on the results.
    const current = parseFilters(params);
    const next = serializeFilters({
      ...current,
      q,
      cuisine: NO_FILTERS.cuisine,
    });
    navigate(`/?${next}`);
  };

  const large = size === "lg";

  return (
    <form
      role="search"
      onSubmit={submit}
      className={cn(
        "flex w-full items-center rounded-full bg-white ring-1 ring-neutral-200 transition-shadow focus-within:ring-2 focus-within:ring-brand",
        large ? "p-1.5 shadow-lg" : "p-1",
        className,
      )}
    >
      <label htmlFor={inputId} className="sr-only">
        Search recipes
      </label>
      <Search
        aria-hidden
        className={cn(
          "shrink-0 text-neutral-400",
          large ? "ml-3 size-5" : "ml-2.5 size-4",
        )}
      />
      <input
        id={inputId}
        type="search"
        enterKeyHint="search"
        autoComplete="off"
        maxLength={100}
        placeholder={
          large ? "Try “chicken curry” or “vegan pasta”" : "Search recipes"
        }
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          "min-w-0 flex-1 bg-transparent outline-none placeholder:text-neutral-400 [&::-webkit-search-cancel-button]:hidden",
          large ? "px-3 py-2 text-lg" : "px-2 py-1 text-sm",
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          className="mr-1 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
          aria-label="Clear search"
        >
          <X className="size-4" />
        </button>
      )}
      <button
        type="submit"
        className={cn(
          "shrink-0 rounded-full bg-brand font-semibold text-neutral-900 transition-colors hover:bg-brand-hover focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:outline-none",
          large ? "px-5 py-2.5" : "px-3 py-1 text-sm",
        )}
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
