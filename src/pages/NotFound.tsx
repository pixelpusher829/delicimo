import { MapPinOff } from "lucide-react";
import { Link } from "react-router";
import StatusMessage from "@/components/StatusMessage";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <>
    <title>Page not found · Delicimo</title>
    <StatusMessage
      icon={MapPinOff}
      title="Page not found"
      className="min-h-[60vh] justify-center"
      action={
        <Button asChild>
          <Link to="/">Back to recipes</Link>
        </Button>
      }
    >
      The page you're looking for doesn't exist or has moved.
    </StatusMessage>
  </>
);

export default NotFound;
