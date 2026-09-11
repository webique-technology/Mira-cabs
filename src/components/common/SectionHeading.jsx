import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  highlightTitle,
  description,
  align = "left",
  className,
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="mb-3 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-700">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-balance text-[1.875rem] font-extrabold text-secondary-900 sm:text-[2.4rem] lg:text-[2.7rem] leading-[1.1]">
        {title}{" "}
        <span className="text-primary">{highlightTitle}</span>
      </h2>
      {description ? (
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
