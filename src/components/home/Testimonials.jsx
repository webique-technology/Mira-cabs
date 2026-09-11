"use client";
import { BadgeCheck } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";
import { Rating } from "@/components/common/Rating";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import DynamicSwiper from "../common/SwiperSlider";

export function Testimonials({ reviews }) {
  return (
    <section className="py-16 sm:py-24">
      <PageContainer>
        <SectionHeading
          eyebrow="Rider Stories"
          title="Experiences Shared by"
          highlightTitle={"Our Guests"}
          description="Meet our customers who trust us for safe and reliable journeys, partners who grow with us, and drivers who choose us for rewarding work."
          align="center"
          className="mx-auto"
        />
        <div className="mt-12">
          <DynamicSwiper
            items={reviews}
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            enableAutoplay={true}
            enablePagination={false}
            autoplayDelay={5000}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            renderItem={(review, i) => (
              <Reveal delay={i * 0.06} className="h-full">
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <Rating value={review.rating} />
                  <blockquote className="mt-3 flex-1 text-sm text-secondary-700">
                    &ldquo;{review.reviewText}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                    <Avatar>
                      <AvatarFallback>{review.avatarInitials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="flex items-center gap-1 text-sm font-bold text-secondary-900">
                        {review.customerName}
                        {review.verifiedTrip ? (
                          <BadgeCheck
                            className="h-3.5 w-3.5 text-accent-blue"
                            aria-label="Verified trip"
                          />
                        ) : null}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {review.route} · {formatDate(review.travelDate)}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            )}
          />
        </div>
      </PageContainer>
    </section>
  );
}
