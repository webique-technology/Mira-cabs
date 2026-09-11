"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, User, LogIn, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { AuthModal } from "@/components/auth/AuthModal";
import { NAV_LINKS, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function MobileNavigation({ user, setUser, isTransparent }) {
  const [open, setOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobilePopoverOpen, setMobilePopoverOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Reset drawer state and collapse dropdowns whenever route changes
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobilePopoverOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("mira_user");
    window.dispatchEvent(new Event("auth-state-change"));
    if (setUser) setUser(null);
    setMobilePopoverOpen(false);
    router.push("/");
  };

  return (
    <div className="flex items-center gap-1 md:hidden">
      {/* Profile/Login Button */}
      {!user ? (
        <Button
          variant="ghost"
          size="icon"
          aria-label="Login"
          onClick={() => setAuthModalOpen(true)}
          className={cn(
            "h-10 w-10 rounded-full",
            isTransparent && "text-white hover:bg-white/10 hover:text-white",
          )}
        >
          <LogIn className="h-5 w-5" />
        </Button>
      ) : (
        <Popover open={mobilePopoverOpen} onOpenChange={setMobilePopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Account Options"
              className={cn(
                "h-10 w-10 rounded-full",
                isTransparent &&
                  "text-white hover:bg-white/10 hover:text-white",
              )}
            >
              <User className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-52 p-2 shadow-soft">
            <div className="border-b border-border px-3 py-2">
              <p className="text-xs font-medium text-muted-foreground">
                Signed in as
              </p>
              <p className="truncate text-sm font-semibold text-foreground">
                +91 {user?.phone || "User"}
              </p>
            </div>
            <div className="mt-1 flex flex-col gap-1">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="w-full justify-start font-medium text-foreground hover:bg-muted"
                onClick={() => setMobilePopoverOpen(false)}
              >
                <Link href="/account">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />{" "}
                  Profile
                </Link>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full justify-start font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* Mobile Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className={cn(
              "h-10 w-10",
              isTransparent && "text-white hover:bg-white/10 hover:text-white",
            )}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="flex h-full w-[85vw] max-w-[350px] flex-col justify-between p-0"
        >
          <SheetTitle className="sr-only">Main navigation</SheetTitle>

          {/* Header */}
          <div className="flex h-16 items-center border-b border-border px-4">
            <Logo />
          </div>

          {/* Navigation Links */}
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  {link.children ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => setServicesOpen((v) => !v)}
                        aria-expanded={servicesOpen}
                        className={cn(
                          "flex min-h-11 w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-secondary-900 transition-colors hover:bg-muted",
                          servicesOpen && "bg-muted/60 text-primary",
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 text-muted-foreground transition-transform duration-200",
                            servicesOpen && "rotate-180 text-primary",
                          )}
                        />
                      </button>

                      {/* Smooth Animated Accordion Dropdown */}
                      <AnimatePresence initial={false}>
                        {servicesOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="my-1 ml-3 flex flex-col gap-1 border-l-2 border-border/80 pl-3">
                              {link.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </div>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className={cn(
                        "block min-h-11 rounded-xl px-3 py-2.5 text-sm  leading-normal font-semibold text-secondary-900 transition-colors hover:bg-muted",
                        pathname === link.href &&
                          "bg-primary/10 font-bold text-primary",
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer CTAs */}
          <div className="grid grid-cols-2 gap-2 border-t border-border bg-background p-4">
            <a
              href={`tel:${siteConfig.supportNumber}`}
              className="flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-border text-xs font-semibold text-secondary-900 transition-colors hover:bg-muted"
            >
              <Phone className="h-3.5 w-3.5" /> Call
            </a>
            <Button
              asChild
              size="sm"
              className="rounded-xl text-xs font-semibold"
              onClick={() => setOpen(false)}
            >
              <Link href="/book">Book Now</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Auth Modal */}
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onSuccess={(userData) => {
          if (setUser) setUser(userData);
        }}
      />
    </div>
  );
}
