"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Mail, User, Pencil, ArrowRight, X } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/Pop-up-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Form State for editing
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const loadUserData = () => {
    const saved = localStorage.getItem("mira_user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
        setFormData({
          name: parsed.name && parsed.name !== "User" ? parsed.name : "",
          email: parsed.email || "",
          phone: parsed.phone || "",
        });
      } catch (e) {
        setUser(null);
      }
    }
  };

  useEffect(() => {
    loadUserData();
    window.addEventListener("auth-state-change", loadUserData);
    return () => window.removeEventListener("auth-state-change", loadUserData);
  }, []);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name: formData.name.trim() || "User",
      email: formData.email.trim(),
      phone: formData.phone.trim(),
    };

    localStorage.setItem("mira_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    window.dispatchEvent(new Event("auth-state-change"));
    setIsEditOpen(false);
  };

  // Determine display text
  const hasCustomName = Boolean(user?.name && user.name.trim() !== "User");
  const displayName = hasCustomName ? user.name : "User";
  const displayEmail =
    user?.email && user.email.trim() ? user.email : "Email not set";

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header Section with Edit Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeading
          eyebrow="Overview"
          title={
            hasCustomName ? `Welcome back, ${displayName}` : "Welcome back"
          }
          description="Manage your account settings, personal information, and travel details."
        />

        {/* Edit Profile Modal */}
        <AlertDialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="self-start rounded-xl gap-1.5 sm:self-auto"
            >
              <Pencil className="h-3.5 w-3.5" /> Edit Profile
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="max-w-md p-6">
            <AlertDialogCancel asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close"
                className="absolute right-4 top-4 h-8 w-8 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </AlertDialogCancel>

            <div className="flex flex-col gap-4">
              <div>
                <AlertDialogTitle className="text-lg font-bold text-slate-900">
                  Edit Personal Details
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-1 text-xs text-slate-500">
                  Update your display name, contact email, and mobile number.
                </AlertDialogDescription>
              </div>

              <form
                onSubmit={handleSaveProfile}
                className="mt-2 flex flex-col gap-3.5"
              >
                <div className="flex flex-col gap-1.5 text-left">
                  <Label
                    htmlFor="name"
                    className="text-xs font-semibold text-slate-600"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="h-10 rounded-xl border-slate-300 bg-white text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <Label
                    htmlFor="email"
                    className="text-xs font-semibold text-slate-600"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="h-10 rounded-xl border-slate-300 bg-white text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <Label
                    htmlFor="phone"
                    className="text-xs font-semibold text-slate-600"
                  >
                    Mobile Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value.replace(/\D/g, ""),
                      })
                    }
                    className="h-10 rounded-xl border-slate-300 bg-white text-sm"
                  />
                </div>

                <div className="mt-3 flex justify-end gap-2">
                  <AlertDialogCancel asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      className="rounded-xl"
                    >
                      Cancel
                    </Button>
                  </AlertDialogCancel>
                  <Button type="submit" size="sm" className="rounded-xl">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Personal Details Card */}
        <Card className="rounded-2xl border border-border p-6 shadow-soft">
          <CardHeader className="flex flex-row items-start justify-between p-0 pb-4">
            <div>
              <CardTitle className="text-base font-semibold">
                User Details
              </CardTitle>
              <CardDescription className="text-xs">
                Your registered credentials
              </CardDescription>
            </div>
            <Badge
              variant="secondary"
              className="rounded-full px-3 py-1 font-medium"
            >
              Verified User
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 p-0">
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{displayName}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>+91 {user?.phone || "Not set"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{displayEmail}</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Booking Action Card */}
        <Card className="rounded-2xl border border-border p-6 shadow-soft">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-semibold">
              Recent Bookings
            </CardTitle>
            <CardDescription className="text-xs">
              Check status or book a new ride
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between p-0">
            <span className="text-sm text-muted-foreground">
              View your rides
            </span>
            <Button asChild size="sm" variant="outline" className="rounded-xl">
              <Link href="/account/bookings">
                View <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
