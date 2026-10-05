import { Check, ExternalLink } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import type { Instruction } from "@/types";

interface InstructionsProps {
  recipeId: number;
  instructions: Instruction[];
  sourceUrl?: string;
}

const Instructions: React.FC<InstructionsProps> = ({
  recipeId,
  instructions,
  sourceUrl,
}) => {
  // Keys are "section:step" so multi-part recipes don't collide.
  const [done, setDone] = useLocalStorage<string[]>(
    `delicimo:steps:${recipeId}`,
    [],
  );
  const sections = instructions.filter((s) => s.steps.length > 0);

  const toggle = (key: string) =>
    setDone((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );

  return (
    <section aria-labelledby="instructions-heading">
      <h2 id="instructions-heading" className="mb-6 text-3xl">
        Instructions
      </h2>

      {sections.length === 0 ? (
        <p className="text-lg text-neutral-600">
          Step-by-step instructions aren't available for this recipe.
          {sourceUrl && (
            <>
              {" "}
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-leaf underline underline-offset-2"
              >
                View the original recipe
                <ExternalLink aria-hidden className="size-4" />
              </a>
            </>
          )}
        </p>
      ) : (
        <div className="flex flex-col gap-10">
          {sections.map((section, s) => (
            <div key={s}>
              {section.name && (
                <h3 className="mb-4 text-xl text-neutral-800">
                  {section.name}
                </h3>
              )}
              <ol className="flex flex-col gap-3">
                {section.steps.map((step) => {
                  const key = `${s}:${step.number}`;
                  const isDone = done.includes(key);
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        aria-pressed={isDone}
                        onClick={() => toggle(key)}
                        className="flex w-full gap-4 rounded-xl p-3 text-left transition-colors hover:bg-neutral-50"
                      >
                        <span
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-full font-serif font-semibold transition-colors",
                            isDone
                              ? "bg-leaf text-white"
                              : "bg-brand text-neutral-900",
                          )}
                        >
                          {isDone ? (
                            <Check aria-label="Done" className="size-4" />
                          ) : (
                            step.number
                          )}
                        </span>
                        <span
                          className={cn(
                            "pt-0.5 text-lg leading-relaxed",
                            isDone && "text-neutral-400",
                          )}
                        >
                          {step.step}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Instructions;
