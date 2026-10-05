import { Link } from "react-router";
import SearchForm from "@/components/SearchForm";

const QUICK_PICKS = ["Chicken", "Pasta", "Vegan", "Soup", "Salad", "Dessert"];

const Hero: React.FC<{ compact?: boolean }> = ({ compact }) => {
  return (
    <section className="relative overflow-hidden bg-[url('../assets/hero.webp')] bg-cover bg-center">
      <div className="absolute inset-0 bg-linear-to-r from-white/85 via-white/60 to-white/0" />
      <div
        className={
          compact
            ? "relative m-auto max-w-360 px-4 py-10 sm:px-6"
            : "relative m-auto flex min-h-104 max-w-360 flex-col justify-center px-4 py-14 sm:px-6"
        }
      >
        <div className="flex max-w-xl flex-col gap-4">
          {!compact && (
            <>
              <h1 className="text-4xl leading-tight md:text-5xl">
                Wholesome recipes for the whole family
              </h1>
              <p className="text-lg text-neutral-700 md:text-xl">
                Smarter search for everyday cooking.
              </p>
            </>
          )}
          <SearchForm className={compact ? undefined : "mt-2"} />
          {/* On the landing page the category tiles below cover this. */}
          {compact && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-neutral-700">Try:</span>
              {QUICK_PICKS.map((pick) => (
                <Link
                  key={pick}
                  to={`/?q=${encodeURIComponent(pick.toLowerCase())}`}
                  className="rounded-full bg-white/80 px-3 py-1 font-medium ring-1 ring-neutral-200 backdrop-blur transition-colors hover:bg-white hover:ring-brand"
                >
                  {pick}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
