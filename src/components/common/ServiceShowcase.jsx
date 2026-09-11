import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * ServiceShowcase Component
 *
 * @param {string} title - Section heading
 * @param {string|string[]} description - Optional single paragraph or array of paragraphs
 * @param {Array<{title?: string, text: string}>|string[]} list - Bullet items
 * @param {string[]} images - Array of up to 4 image URLs for the 2x2 grid
 * @param {boolean} reverse - If true, flips layout (Content left, Images right)
 * @param {string} className - Optional container styling
 * @param {() => void} formBtn - Modal trigger handler for "Book This Service"
 * @param {boolean} showButtons - Whether to display the bottom action buttons
 */
export function ServiceShowcase({
  title,
  description,
  list = [],
  images = [],
  reverse = false,
  className,
  formBtn,
  showButtons = true,
}) {
  // Convert description to array if passed as string
  const descriptions = Array.isArray(description)
    ? description
    : description
      ? [description]
      : [];

  return (
    <section className={cn("py-12 md:py-16 lg:py-20", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14 xl:gap-20",
            reverse &&
              "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1",
          )}
        >
          {/* 4-Image Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {images.slice(0, 4).map((imgSrc, index) => (
              <div
                key={index}
                className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted shadow-sm"
              >
                <Image
                  src={imgSrc}
                  alt={`Showcase image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center">
            {title && (
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {title}
              </h2>
            )}

            {/* Conditional Paragraph(s) */}
            {descriptions.length > 0 && (
              <div className="mt-4 space-y-3">
                {descriptions.map((desc, idx) => (
                  <p
                    key={idx}
                    className="text-sm leading-relaxed text-slate-600 sm:text-base"
                  >
                    {desc}
                  </p>
                ))}
              </div>
            )}

            {/* Conditional Bullet List */}
            {Array.isArray(list) && list.length > 0 && (
              <ul className="mt-6 space-y-3.5 sm:space-y-4">
                {list.map((item, idx) => {
                  const isObject = typeof item === "object" && item !== null;
                  const itemTitle = isObject ? item.title : null;
                  const itemText = isObject ? item.text : item;

                  return (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-slate-600"
                    >
                      {/* Orange Dot Marker */}
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                      <span>
                        {itemTitle && (
                          <strong className="font-semibold text-slate-900">
                            {itemTitle}
                            {itemText ? " – " : ""}
                          </strong>
                        )}
                        {itemText}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}

            {showButtons && (
              <div className="mt-8 flex flex-wrap gap-3">
                {formBtn ? (
                  <Button
                    type="button"
                    size="lg"
                    onClick={formBtn}
                    className="rounded-xl px-6 font-semibold"
                  >
                    Book This Service
                  </Button>
                ) : (
                  <Button
                    asChild
                    size="lg"
                    className="rounded-xl px-6 font-semibold"
                  >
                    <Link href="/book">Book This Service</Link>
                  </Button>
                )}

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-xl px-6"
                >
                  <Link href="/services">All Services</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
