"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef(
  (
    {
      className,
      align = "start",
      sideOffset = 8,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onPointerDownOutside,
      onInteractOutside,
      ...props
    },
    ref,
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        // Prevents the parent AlertDialog focus trap from hijacking focus and closing the popover
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          onOpenAutoFocus?.(e);
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          onCloseAutoFocus?.(e);
        }}
        // Stops parent dialog overlay from registering outside-clicks while selecting items
        onPointerDownOutside={(e) => {
          const originalTarget = e.detail?.originalEvent?.target;
          if (
            originalTarget &&
            (originalTarget.closest?.("[data-radix-popper-content-wrapper]") ||
              originalTarget.closest?.("[role='dialog']") ||
              originalTarget.closest?.("[role='alertdialog']"))
          ) {
            e.preventDefault();
          }
          onPointerDownOutside?.(e);
        }}
        onInteractOutside={(e) => {
          onInteractOutside?.(e);
        }}
        className={cn(
          "z-[99999] w-72 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-card outline-none",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  ),
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
