import { cn } from "@/lib/utils";

export function PageContainer({ className, ...props }) {
  return (
    <div
      className={cn("container-px mx-auto w-full max-w-7xl", className)}
      {...props}
    />
  );
}
