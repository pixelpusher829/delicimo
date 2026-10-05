import { CircleAlert } from "lucide-react";
import { useRouteError } from "react-router";
import StatusMessage from "@/components/StatusMessage";
import { Button } from "@/components/ui/button";

/** Shown when a route throws while rendering, or its code chunk fails to load. */
const RouteError = () => {
  const error = useRouteError();
  if (import.meta.env.DEV) console.error(error);

  return (
    <StatusMessage
      icon={CircleAlert}
      tone="warning"
      title="Something went wrong"
      className="min-h-[60vh] justify-center"
      action={
        <Button onClick={() => window.location.reload()}>Reload page</Button>
      }
    >
      An unexpected error occurred. Reloading usually fixes it. If you just
      updated the app, this loads the latest version.
    </StatusMessage>
  );
};

export default RouteError;
