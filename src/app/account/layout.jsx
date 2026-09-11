"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Calendar, MapPin, LogOut } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { StickyMobileCTA } from "@/components/common/StickyMobileCTA";

// Inside src/app/account/layout.jsx
const NAV_ITEMS = [
  { label: "Profile", href: "/account", icon: User },
  { label: "My Bookings", href: "/account/bookings", icon: Calendar },
  { label: "Track Ride", href: "/account/track-booking", icon: MapPin },
];

export default function AccountLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("mira_user");
    window.dispatchEvent(new Event("auth-state-change"));
    router.push("/");
  };

  return (
    <PageContainer className="py-10 sm:py-14">
      <div className="grid grid-cols-1 gap-0 md:gap-8 lg:grid-cols-12">
        {/* Left Sidebar */}
        <aside className="lg:col-span-4 xl:col-span-3">
          <Card className="hidden md:flex flex-col gap-2 p-4 shadow-soft">
            <div className="flex flex-row items-center w-full mb-2 border-b border-border px-3 py-2 justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Account Menu
              </span>
            </div>

            <nav className="scroll-hor-btns flex flex-row lg:flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Button
                    key={item.href}
                    asChild
                    variant={isActive ? "default" : "ghost lg:outline"}
                    className={cn(
                      "w-full justify-start rounded-xl text-sm font-medium",
                      !isActive &&
                        "text-slate-600 hover:bg-muted hover:text-slate-900",
                    )}
                  >
                    <Link href={item.href}>
                      <Icon className="mr-2.5 h-4 w-4" />
                      {item.label}
                    </Link>
                  </Button>
                );
              })}

              <div className="my-2 border-t border-border hidden lg:block" />

              <div className="hidden md:block">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="mr-2.5 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </nav>
          </Card>
        </aside>

        {/* Right Content Area */}
        <main className="lg:col-span-8 xl:col-span-9">
          {children}
          <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border bg-background/95 p-2 backdrop-blur-md md:hidden">
            <nav className="scroll-hor-btns w-full flex flex-row items-center lg:flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Button
                    key={item.href}
                    asChild
                    variant={isActive ? "default" : "ghost lg:outline"}
                    className={cn(
                      "w-full justify-center rounded-xl text-sm font-medium",
                      !isActive &&
                        "text-slate-600 hover:bg-muted hover:text-slate-900",
                    )}
                  >
                    <Link href={item.href}>
                      <Icon className="mr-2.5 h-4 w-4 hidden sm:block" />
                      {item.label}
                    </Link>
                  </Button>
                );
              })}
            </nav>
          </div>
        </main>
      </div>
    </PageContainer>
  );
}
