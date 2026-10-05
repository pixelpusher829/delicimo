import { CircleAlert, Hourglass, WifiOff } from "lucide-react";
import { Link } from "react-router";
import { ApiError } from "@/api/client";
import { Button } from "@/components/ui/button";
import StatusMessage from "./StatusMessage";

interface ApiErrorMessageProps {
  error: Error;
  onRetry?: () => void;
}

/** Explains API failures. In particular, the daily quota running out isn't a bug. */
const ApiErrorMessage: React.FC<ApiErrorMessageProps> = ({
  error,
  onRetry,
}) => {
  const apiError = error instanceof ApiError ? error : undefined;

  if (apiError?.isQuotaExceeded) {
    return (
      <StatusMessage
        icon={Hourglass}
        tone="warning"
        title="We've hit today's recipe limit"
        action={
          <Button asChild>
            <Link to="/saved">Browse saved recipes</Link>
          </Button>
        }
      >
        Our recipe provider caps how many new searches we can run each day.
        Recipes you've already viewed or saved still work, and new searches will
        be back tomorrow.
      </StatusMessage>
    );
  }

  const offline = apiError?.status === 0;
  return (
    <StatusMessage
      icon={offline ? WifiOff : CircleAlert}
      tone="warning"
      title={offline ? "You're offline" : "Something went wrong"}
      action={
        onRetry && (
          <Button variant="outline" onClick={onRetry}>
            Try again
          </Button>
        )
      }
    >
      {offline
        ? "Check your connection and try again."
        : "We couldn't load recipes right now. Please try again in a moment."}
    </StatusMessage>
  );
};

export default ApiErrorMessage;
