import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "../layout/PageContainer";
import { vehicles, vehicleCategories } from "@/data/vehicles";

// Category subtitle/description map
const CATEGORY_META = {
  Hatchback: "Local, airport, quick city & budget rides",
  Sedan: "Comfortable outstation, city & airport travel",
  "Premium Sedan": "Executive business & luxury highway rides",
  SUV: "Spacious rides for hills, ghats & family tours",
  MUV: "Group tours, long road trips & pilgrimage circuits",
  "Tempo Traveller": "Multiple seaters for tours, events & group travel",
};

export const CarCategoryRow = () => {
  // Extract only the first vehicle per category
  const categoryCards = vehicleCategories.map((categoryName) => {
    const representativeCar = vehicles.find((v) => v.category === categoryName);
    return {
      category: categoryName,
      description:
        CATEGORY_META[categoryName] || representativeCar?.bestFor || "",
      image: representativeCar?.image || "/images/fleet/hatchback.webp",
      alt: representativeCar?.name || categoryName,
    };
  });

  return (
    <PageContainer>
      <div className="my-8">
        {/* Responsive grid matching horizontal pill cards */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categoryCards.map((item) => (
            <Link
              key={item.category}
              href={`/fleet?category=${encodeURIComponent(item.category)}`}
              className="group flex items-center gap-3 rounded-md border border-border/80 bg-slate-50/80 p-3.5 shadow-sm transition-all duration-200 hover:border-border hover:bg-white hover:shadow-md"
            >
              {/* Vehicle Thumbnail */}
              <div className="relative h-12 w-16 shrink-0 sm:h-14 sm:w-20">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="80px"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="truncate text-[12px] font-bold text-slate-900 group-hover:text-primary">
                  {item.category}
                </h3>
                <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-slate-500">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};
