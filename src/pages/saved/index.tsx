import { Bookmark } from "lucide-react";
import { Link } from "react-router";
import { RecipeGrid } from "@/components/RecipeGrid";
import StatusMessage from "@/components/StatusMessage";
import { Button } from "@/components/ui/button";
import { useRecipeList } from "@/hooks/useRecipeList";

const Saved = () => {
  const saved = useRecipeList("favorites");

  return (
    <div className="min-h-[60vh] bg-neutral-50">
      <title>Saved recipes · Delicimo</title>
      <div className="m-auto flex max-w-360 flex-col gap-6 px-4 py-10 sm:px-6">
        <div>
          <h1 className="text-4xl">Saved recipes</h1>
          <p className="mt-1 text-neutral-600">
            Saved on this device, available even offline.
          </p>
        </div>
        {saved.length ? (
          <RecipeGrid recipes={saved} />
        ) : (
          <StatusMessage
            icon={Bookmark}
            title="Nothing saved yet"
            action={
              <Button asChild>
                <Link to="/">Find recipes</Link>
              </Button>
            }
          >
            Tap the bookmark on any recipe to keep it here for later.
          </StatusMessage>
        )}
      </div>
    </div>
  );
};

export default Saved;
