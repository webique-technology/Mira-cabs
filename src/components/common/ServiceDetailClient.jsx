"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ServiceShowcase } from "@/components/common/ServiceShowcase";
import { FAQPreview } from "@/components/home/FAQPreview";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/Pop-up-box";
import { useBookingStore } from "@/store/booking-store";
import { BookingWidget } from "@/components/booking/BookingWidget";

const SLUG_TO_TRIP_TYPE = {
  "one-way-cab": "one-way",
  "round-trip-cab": "round-trip",
  "local-cab": "local",
  "airport-transfer": "airport",
  "outstation-cab": "one-way",
  "shared-cab": "shared",
};

export function ServiceDetailClient({ service, initialFaqs = [] }) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const setSearch = useBookingStore((s) => s.setSearch);

  const tripType = SLUG_TO_TRIP_TYPE[service.slug] || "one-way";

  const handleBookingSubmit = (searchData) => {
    setSearch({
      ...searchData,
      tripType: searchData.tripType || tripType,
    });
    setOpenModal(false);
    router.push("/search");
  };

  // Prioritize service-specific FAQs, falling back to passed FAQs
  const activeFaqs = service.faqs?.length > 0 ? service.faqs : initialFaqs;

  return (
    <div className="space-y-8 pb-16">
      {/* Showcase Section */}
      {service.showcase && (
        <div className="border-b border-border/60 bg-muted/10 pb-8">
          <ServiceShowcase
            title={service.showcase.title}
            description={service.showcase.description}
            list={service.showcase.list}
            images={service.showcase.images}
            reverse={false}
            formBtn={() => setOpenModal(true)}
          />
        </div>
      )}

      {/* Highlight Badges */}
      {service.points && service.points.length > 0 && (
        <PageContainer>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {service.points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3.5 text-sm font-medium text-secondary-800 shadow-soft"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                {point}
              </li>
            ))}
          </ul>
        </PageContainer>
      )}

      {/* Dynamic Service FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <FAQPreview faqs={service.faqs} secClass="bg-none" viewAllBtn={false} image={service.image}/>
      )}

      {/* Booking Dialog Modal */}
      <AlertDialog open={openModal} onOpenChange={setOpenModal}>
        <AlertDialogContent className="w-[95vw] max-w-6xl overflow-visible p-5 sm:p-7">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <AlertDialogHeader className="text-left space-y-1">
              <AlertDialogTitle className="text-lg sm:text-xl font-bold text-secondary-900">
                Book {service.title}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xs text-muted-foreground">
                Enter your journey parameters to browse available vehicles and
                fares.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          <div className="mt-2 overflow-visible">
            <BookingWidget
              variant="modal"
              lockedTripType={tripType}
              initialData={{ tripType }}
              submitLabel={`Search ${service.title}`}
              onComplete={handleBookingSubmit}
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
