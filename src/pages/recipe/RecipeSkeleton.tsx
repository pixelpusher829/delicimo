const Bar: React.FC<{ className: string }> = ({ className }) => (
  <div className={`animate-pulse rounded bg-neutral-200 ${className}`} />
);

const RecipeSkeleton = () => (
  <div
    className="m-auto max-w-360 px-4 py-8 sm:px-6 sm:py-10"
    aria-busy="true"
    aria-label="Loading recipe"
  >
    <Bar className="mb-4 h-4 w-32" />
    <Bar className="mb-6 h-12 w-3/4 max-w-2xl" />
    <Bar className="aspect-video w-full rounded-3xl sm:aspect-21/9" />
    <div className="my-8 flex gap-10">
      <Bar className="h-14 w-28" />
      <Bar className="h-14 w-28" />
      <Bar className="h-14 w-28" />
    </div>
    <div className="grid gap-12 lg:grid-cols-3">
      <div className="flex flex-col gap-4 lg:col-span-2">
        <Bar className="h-8 w-48" />
        {Array.from({ length: 6 }, (_, i) => (
          <Bar key={i} className="h-6 w-full max-w-lg" />
        ))}
      </div>
      <Bar className="h-80 w-full rounded-xl" />
    </div>
  </div>
);

export default RecipeSkeleton;
