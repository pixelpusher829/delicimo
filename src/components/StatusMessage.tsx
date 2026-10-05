import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusMessageProps {
  icon: LucideIcon;
  title: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  tone?: "neutral" | "warning";
  className?: string;
}

/** Empty, error and quota states share this layout. */
const StatusMessage: React.FC<StatusMessageProps> = ({
  icon: Icon,
  title,
  children,
  action,
  tone = "neutral",
  className,
}) => (
  <div
    role={tone === "warning" ? "alert" : "status"}
    className={cn(
      "mx-auto flex max-w-lg flex-col items-center gap-3 px-6 py-16 text-center",
      className,
    )}
  >
    <span
      className={cn(
        "flex size-14 items-center justify-center rounded-full",
        tone === "warning"
          ? "bg-amber-100 text-amber-700"
          : "bg-neutral-100 text-neutral-500",
      )}
    >
      <Icon aria-hidden className="size-7" />
    </span>
    <h2 className="text-2xl">{title}</h2>
    {children && <div className="text-neutral-600">{children}</div>}
    {action && <div className="mt-2">{action}</div>}
  </div>
);

export default StatusMessage;
