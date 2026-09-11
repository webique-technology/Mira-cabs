"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarCheck,
  Car,
  MousePointerClick,
  Pause,
  Play,
  Smile,
} from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/common/SectionHeading";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    step: 1,
    icon: MousePointerClick,
    title: "Enter Journey Details",
    description: "Tell us your pickup, destination and travel time.",
  },
  {
    step: 2,
    icon: Car,
    title: "Select Your Cab",
    description: "Compare vehicles, fares and features to pick the right fit.",
  },
  {
    step: 3,
    icon: CalendarCheck,
    title: "Confirm Your Booking",
    description: "Add passenger details, choose a payment method, and confirm.",
  },
  {
    step: 4,
    icon: Smile,
    title: "Enjoy Your Ride",
    description: "Your verified driver arrives on time — sit back and relax.",
  },
];

const PIN_POSITIONS = {
  1: "12.5%",
  2: "37.5%",
  3: "62.5%",
  4: "87.5%",
};

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);

  // Auto-play stepper cycle
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev >= 4 ? 1 : prev + 1));
    }, 13400);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeStep]);

  const handleStepSelect = (stepNumber) => {
    setActiveStep(stepNumber);
  };

  const toggleAutoPlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] py-16 sm:py-24">
      <PageContainer>
        {/* Centered Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            eyebrow="Simple Process"
            title="Booking Your Ride in "
            highlightTitle="4 Easy Steps"
            align="center"
          />
        </div>

        {/* Interactive Journey Track */}
        <div className="relative mx-auto mt-14 max-w-6xl px-4 sm:px-6">
          {/* Desktop Timeline SVG Track */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-[1.25rem] z-0 hidden w-full px-12 md:block"
          >
            <svg
              className="h-8 w-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 1000 32"
            >
              {/* Static Background Track */}
              <line
                x1="60"
                y1="16"
                x2="940"
                y2="16"
                stroke="#E6DCCE"
                strokeWidth="2.5"
                strokeDasharray="7, 7"
                strokeLinecap="round"
              />
              {/* Dynamic Animated Dashes */}
              <line
                x1="60"
                y1="16"
                x2="940"
                y2="16"
                stroke="#E89214"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="animated-dash-line opacity-90"
              />
            </svg>

            {/* Traveling Vehicle Progress Pin */}
            <div
              className="vehicle-indicator absolute -top-1 z-10 flex -translate-x-1/2 flex-col items-center"
              style={{ left: PIN_POSITIONS[activeStep] }}
            >
              <div className="flex items-center justify-center rounded-full border-2 border-[#FAF7F2] bg-[#E89214] p-1.5 text-white shadow-lg">
                <Car className="h-4 w-4" />
              </div>
              <span className="mt-0.5 h-2 w-0.5 bg-[#E89214]/60" />
            </div>
          </div>

          {/* 4 Steps Horizontal Grid */}
          <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8 lg:gap-12">
            {STEPS.map((step) => {
              const isActive = activeStep === step.step;
              const Icon = step.icon;

              return (
                <div
                  key={step.step}
                  onClick={() => handleStepSelect(step.step)}
                  onMouseEnter={() => handleStepSelect(step.step)}
                  className="group flex cursor-pointer select-none flex-col items-center text-center"
                >
                  {/* Step Node with Outer Glow & Hover Scale */}
                  <div className="relative mb-6">
                    {isActive && (
                      <div className="pulse-glow-ring pointer-events-none absolute inset-0 rounded-full bg-[#E89214]/30" />
                    )}

                    <button
                      type="button"
                      aria-label={`Step ${step.step}: ${step.title}`}
                      className={cn(
                        "relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#111827] text-white transition-all duration-300",
                        "hover:-translate-y-1.5 hover:scale-105",
                        isActive
                          ? "shadow-[0_0_0_4px_#FAF7F2,0_0_0_7px_#E89214,0_12px_28px_-6px_rgba(232,146,20,0.45)]"
                          : "shadow-[0_8px_20px_-4px_rgba(17,24,39,0.12)] opacity-85 hover:opacity-100",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-7 w-7 text-white transition-transform duration-300",
                          step.step === 1 && "group-hover:rotate-6",
                          step.step === 2 && "group-hover:-translate-y-0.5",
                          step.step === 3 && "group-hover:scale-110",
                          step.step === 4 && "group-hover:rotate-12",
                        )}
                      />
                    </button>
                  </div>

                  {/* Step Badge */}
                  <span
                    className={cn(
                      "mb-2 rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-widest transition-colors duration-200",
                      isActive
                        ? "bg-[#FDECCB] text-[#E89214]"
                        : "bg-[#F3ECE2] text-[#B46D08]",
                    )}
                  >
                    STEP {step.step}
                  </span>

                  {/* Title */}
                  <h3
                    className={cn(
                      "mb-2.5 text-lg font-bold transition-colors duration-200 md:text-xl",
                      isActive
                        ? "text-[#E89214]"
                        : "text-[#111827] group-hover:text-[#E89214]",
                    )}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="max-w-[240px] text-sm leading-relaxed text-[#555E6C] md:text-[15px]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Journey Indicator & Control Bar */}
        <div className="mt-14 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-4 rounded-full border border-[#E5DACD] bg-[#F2ECE3] px-5 py-2 shadow-xs">
            {/* Live Step Status */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E89214] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#E89214]" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-[#65594C]">
                Step {activeStep}: {STEPS[activeStep - 1].title}
              </span>
            </div>

            <div className="h-3 w-[1px] bg-[#D7CCBC]" />

            {/* Play/Pause Toggle Button */}
            <button
              type="button"
              onClick={toggleAutoPlay}
              title="Toggle Auto Advance"
              className="flex items-center gap-1.5 text-xs font-bold text-[#B46D08] transition-colors hover:text-[#885204] focus:outline-none"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3.5 w-3.5" />
                  <span>Auto-play</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" />
                  <span>Paused</span>
                </>
              )}
            </button>
          </div>

          {/* Scrubber Dots Navigation */}
          <div
            aria-label="Step navigation buttons"
            className="mt-4 flex items-center gap-2.5"
          >
            {STEPS.map((step) => (
              <button
                key={step.step}
                type="button"
                aria-label={`Go to Step ${step.step}`}
                onClick={() => handleStepSelect(step.step)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all duration-300",
                  activeStep === step.step
                    ? "scale-125 bg-[#E89214]"
                    : "bg-[#D4C7B5] hover:bg-[#B46D08]",
                )}
              />
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
