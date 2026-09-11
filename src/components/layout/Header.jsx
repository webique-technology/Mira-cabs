"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AuthModal } from "@/components/auth/AuthModal";
import { Logo } from "@/components/layout/Logo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { NAV_LINKS } from "@/config/site";
import { cn } from "@/lib/utils";

const TRANSPARENT_ROUTES = new Set(["/"]);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [openNavMenu, setOpenNavMenu] = useState(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isTransparent = TRANSPARENT_ROUTES.has(pathname) && !scrolled;
  const isHomepage = pathname === "/";

  // Automatically close any open popover whenever the route changes
  useEffect(() => {
    setOpenNavMenu(null);
    setPopoverOpen(false);
  }, [pathname]);

  // Sync user state from localStorage and listen to auth events
  useEffect(() => {
    const syncUser = () => {
      const savedUser = localStorage.getItem("mira_user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    syncUser();

    window.addEventListener("auth-state-change", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("auth-state-change", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("mira_user");
    window.dispatchEvent(new Event("auth-state-change"));
    setUser(null);
    setPopoverOpen(false);
    router.push("/");
  };

  return (
    <header
      className={cn(
        "top-0 z-50 w-full transition-all duration-300",
        isHomepage ? "fixed" : "sticky",
        isTransparent
          ? "border-white/10 bg-white/5 backdrop-blur-md"
          : "border-b border-border/80 bg-background/85 backdrop-blur-md shadow-soft",
      )}
    >
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto my-0 flex h-16 max-w-7xl items-center justify-between rounded-full transition-all duration-300 lg:h-[4.5rem] lg:px-5">
          <Logo light={isTransparent} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                if (link.children) {
                  return (
                    <li key={link.href}>
                      <Popover
                        open={openNavMenu === link.href}
                        onOpenChange={(open) =>
                          setOpenNavMenu(open ? link.href : null)
                        }
                      >
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className={cn(
                              "flex min-h-11 items-center gap-1 rounded-full px-4 text-sm font-semibold transition-colors",
                              isTransparent
                                ? "text-white/90 hover:text-white"
                                : "text-secondary-800 hover:text-primary-700",
                              active &&
                                (isTransparent
                                  ? "text-white"
                                  : "text-primary-700"),
                            )}
                          >
                            {link.label}
                            <ChevronDown className="h-3.5 w-3.5" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-2" align="start">
                          <ul className="flex flex-col">
                            {link.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpenNavMenu(null)}
                                  className="block min-h-11 rounded-lg px-3 py-2.5 text-sm font-medium text-secondary-800 hover:bg-muted"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </PopoverContent>
                      </Popover>
                    </li>
                  );
                }
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors",
                        isTransparent
                          ? "text-white/90 hover:text-white"
                          : "text-secondary-800 hover:text-primary-700",
                        active &&
                          (isTransparent ? "text-white" : "text-primary-700"),
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {!user ? (
              <AuthModal
                onSuccess={(userData) => {
                  setUser(userData);
                  window.dispatchEvent(new Event("auth-state-change"));
                }}
                trigger={
                  <Button
                    variant="outline"
                    className={cn(
                      "hidden md:inline-flex",
                      isTransparent &&
                        "text-white hover:bg-white/10 hover:text-white",
                    )}
                  >
                    <LogIn className="mr-1.5 h-4 w-4" /> Login
                  </Button>
                }
              />
            ) : (
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "hidden h-10 w-10 rounded-full md:inline-flex",
                      isTransparent &&
                        "border-white/20 text-white hover:bg-white/10 hover:text-white",
                    )}
                    title="Account Options"
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account Options</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-56 p-2 shadow-soft">
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
                      onClick={() => setPopoverOpen(false)}
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

            <Button
              asChild
              className="hidden bg-primary text-primary-foreground shadow-soft hover:bg-primary-400 md:inline-flex"
            >
              <Link href="/contact">Get a Quote</Link>
            </Button>

            <MobileNavigation
              user={user}
              setUser={setUser}
              isTransparent={isTransparent}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
