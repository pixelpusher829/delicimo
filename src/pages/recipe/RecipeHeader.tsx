import { ArrowLeft, Check, Printer, Share2 } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Placeholder from "@/assets/placeholder.webp";
import FavoriteButton from "@/components/FavoriteButton";
import { recipeImage } from "@/lib/recipe";
import type { Recipe } from "@/types";

const actionClass =
  "flex items-center gap-2 rounded-full border-2 border-neutral-200 px-4 py-2 font-semibold transition-colors hover:border-neutral-300 hover:bg-neutral-50";

const RecipeHeader: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  // "default" means this is the first page in the tab (e.g. an opened link).
  const canGoBack = location.key !== "default";

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: recipe.title, url });
      } catch {
        // User cancelled the share sheet.
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header>
      {canGoBack ? (
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900 print:hidden"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Back
        </button>
      ) : (
        <Link
          to="/"
          className="mb-4 flex w-fit items-center gap-1.5 text-neutral-600 hover:text-neutral-900 print:hidden"
        >
          <ArrowLeft aria-hidden className="size-4" />
          All recipes
        </Link>
      )}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl leading-tight md:text-5xl">{recipe.title}</h1>
          {(recipe.sourceName || recipe.creditsText) && (
            <p className="text-neutral-600">
              Recipe by{" "}
              {recipe.sourceUrl ? (
                <a
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold underline underline-offset-2 hover:text-neutral-900"
                >
                  {recipe.sourceName || recipe.creditsText}
                </a>
              ) : (
                <span className="font-semibold">
                  {recipe.sourceName || recipe.creditsText}
                </span>
              )}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-wrap gap-2 print:hidden">
          <FavoriteButton recipe={recipe} variant="button" />
          <button type="button" onClick={share} className={actionClass}>
            {copied ? (
              <Check aria-hidden className="size-5" />
            ) : (
              <Share2 aria-hidden className="size-5" />
            )}
            <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className={actionClass}
          >
            <Printer aria-hidden className="size-5" />
            Print
          </button>
        </div>
      </div>

      <img
        className="aspect-video w-full rounded-3xl bg-neutral-100 object-cover sm:aspect-21/9 print:max-h-72"
        src={recipeImage(recipe.image, "636x393") ?? Placeholder}
        alt={recipe.title}
        fetchPriority="high"
        onError={(e) => {
          e.currentTarget.src = Placeholder;
        }}
      />
    </header>
  );
};

export default RecipeHeader;
