import type { Nutrition } from "@/types";

const ORDER = [
  "Calories",
  "Fat",
  "Saturated Fat",
  "Carbohydrates",
  "Net Carbohydrates",
  "Sugar",
  "Fiber",
  "Protein",
  "Cholesterol",
  "Sodium",
];

const NutritionalInfo: React.FC<{ nutrition?: Nutrition }> = ({
  nutrition,
}) => {
  const nutrients = ORDER.flatMap(
    (name) => nutrition?.nutrients.find((n) => n.name === name) ?? [],
  );
  if (nutrients.length === 0) return null;

  return (
    <section
      aria-labelledby="nutrition-heading"
      className="rounded-2xl bg-neutral-50 p-6 ring-1 ring-neutral-100"
    >
      <h2 id="nutrition-heading" className="text-3xl">
        Nutrition
      </h2>
      <p className="mt-1 mb-5 text-sm text-neutral-500">
        Per serving · % of daily value
      </p>
      <dl className="flex flex-col gap-4">
        {nutrients.map((n) => {
          const pct = n.percentOfDailyNeeds;
          return (
            <div key={n.name}>
              <div className="flex justify-between gap-4">
                <dt className="text-lg">{n.name}</dt>
                <dd className="text-lg font-semibold tabular-nums">
                  {Math.round(n.amount).toLocaleString()} {n.unit}
                  {pct != null && (
                    <span className="ml-2 inline-block w-12 text-right text-sm font-normal text-neutral-500">
                      {Math.round(pct)}%
                    </span>
                  )}
                </dd>
              </div>
              {pct != null && (
                <div
                  className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-200"
                  aria-hidden
                >
                  <div
                    className={
                      pct > 100 ? "h-full bg-amber-500" : "h-full bg-leaf"
                    }
                    style={{ width: `${Math.min(100, pct)}%` }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </dl>
    </section>
  );
};

export default NutritionalInfo;
