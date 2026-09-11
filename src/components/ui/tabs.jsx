"use client";
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex flex-wrap items-center gap-2 justify-center gap-1 rounded-full bg-muted p-1",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "group inline-flex min-h-11 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-slate-700 bg-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary data-[state=active]:text-[#132238]",
        className,
      )}
      {...props}
    >
      {/* Radio Indicator Circle */}
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate-300 transition-colors group-data-[state=active]:bg-primary">
        <span className="h-2 w-2 rounded-full bg-white transition-transform scale-0 group-data-[state=active]:scale-100" />
      </span>

      {children}
    </TabsPrimitive.Trigger>
  ),
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("focus-visible:outline-none animate-fade-in", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
