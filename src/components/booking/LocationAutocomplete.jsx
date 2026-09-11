"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchLocations } from "@/services/route-service";
import { cn } from "@/lib/utils";

export function LocationAutocomplete({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
}) {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  // Debounce search queries
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      searchLocations(value).then((res) => {
        setResults(res || []);
      });
    }, 150);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value]);

  // Reliable click-outside handler that respects modal boundaries
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-secondary-800"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          placeholder={placeholder}
          value={value || ""}
          autoComplete="off"
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "pl-10 pr-9 rounded-md",
            error && "border-destructive focus-visible:ring-destructive",
          )}
        />

        {value ? (
          <button
            type="button"
            aria-label={`Clear ${label}`}
            onClick={() => {
              onChange("");
              setOpen(true);
            }}
            className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>

      {/* Autocomplete Dropdown List */}
      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-[9999] max-h-52 w-full overflow-y-auto rounded-xl border border-border bg-card p-1 shadow-2xl no-scrollbar overscroll-contain">
          {results.length > 0 ? (
            <ul className="divide-y divide-border/20">
              {results.map((location) => (
                <li key={location.id}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      onChange(location.name);
                      setOpen(false);
                    }}
                    className="flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-colors"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-primary-600" />
                    <span>
                      <span className="font-medium text-secondary-900">
                        {location.name}
                      </span>
                      {location.state && (
                        <span className="ml-1.5 text-xs text-muted-foreground">
                          {location.state}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-3 text-center text-xs text-muted-foreground">
              No matching locations
            </p>
          )}
        </div>
      )}

      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs font-medium text-destructive"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
