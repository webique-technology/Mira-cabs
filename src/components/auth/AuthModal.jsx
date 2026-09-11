"use client";

import { useState} from "react";
import { X, ArrowLeft } from "lucide-react";
import { OTPInput } from "input-otp";
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

export function AuthModal({ trigger, open, onOpenChange, onSuccess }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOpenChange = (nextOpen) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    if (onOpenChange) {
      onOpenChange(nextOpen);
    }
    if (!nextOpen) {
      setTimeout(() => {
        setStep("phone");
        setPhone("");
        setOtp("");
        setError("");
        setIsSuccess(false);
      }, 200);
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.trim().length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    setError("");
    setStep("otp");
  };

  // Inside src/components/auth/AuthModal.jsx -> handleVerifyOtp:
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === "123456") {
      setIsSuccess(true);
      setError("");

      const userData = { phone, name: "User", role: "customer" };
      localStorage.setItem("mira_user", JSON.stringify(userData));
      window.dispatchEvent(new Event("auth-state-change"));

      if (onSuccess) {
        onSuccess(userData);
      }

      setTimeout(() => {
        handleOpenChange(false);
      }, 600);
    } else {
      setError("Invalid OTP. Use demo OTP: 123456");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}

      <AlertDialogContent>
        {/* Top Right Close Button */}
        <AlertDialogCancel asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close"
            className="absolute right-4 top-4 z-30 h-8 w-8 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </AlertDialogCancel>

        {/* 2-Column Split Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
          {/* Left Side: Image */}
          <div className="relative h-56 w-full overflow-hidden rounded-[1.5rem] md:h-80">
            <img
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop"
              alt="Login banner"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <span className="absolute bottom-4 left-4 text-2xl font-black lowercase tracking-tight text-white">
              mira cabs
            </span>
          </div>

          {/* Right Side: Step Content */}
          <div className="flex flex-col items-center px-2 py-2 text-center md:px-4">
            {step === "phone" ? (
              <>
                <AlertDialogTitle>Welcome to Mira Cabs</AlertDialogTitle>
                <AlertDialogDescription className="mt-2">
                  Enter your mobile number to get an instant OTP code and sign
                  in.
                </AlertDialogDescription>

                <form
                  onSubmit={handleSendOtp}
                  className="mt-6 flex w-full flex-col gap-3"
                >
                  <Input
                    type="tel"
                    pattern="[0-9]*"
                    maxLength={10}
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="Enter 10-digit number"
                    className="h-12 rounded-2xl border-slate-300 bg-white text-center text-sm font-medium text-slate-800 placeholder:text-slate-400 focus-visible:ring-slate-800"
                    autoFocus
                  />

                  {error && <p className="text-xs text-red-500">{error}</p>}

                  <Button
                    type="submit"
                    className="h-12 w-full rounded-2xl bg-[#5f5e58] text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#4a4944]"
                  >
                    Get OTP
                  </Button>
                </form>
              </>
            ) : (
              <>
                <div className="flex w-full items-center justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setStep("phone");
                      setError("");
                    }}
                    className="h-auto p-0 text-xs text-slate-500 hover:bg-transparent hover:text-slate-900"
                  >
                    <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Back
                  </Button>
                  <span className="text-xs font-semibold text-slate-400">
                    Step 2 of 2
                  </span>
                </div>

                <AlertDialogTitle className="mt-2">Verify OTP</AlertDialogTitle>
                <AlertDialogDescription className="mt-1">
                  Enter the 6-digit code sent to +91 {phone}
                </AlertDialogDescription>

                <form
                  onSubmit={handleVerifyOtp}
                  className="mt-4 flex w-full flex-col items-center gap-4"
                >
                  <div className="w-full flex flex-col gap-1.5 text-left">
                    <Label className="text-[11px] font-semibold text-slate-500">
                      Mobile Number
                    </Label>
                    <Input
                      type="text"
                      disabled
                      value={`+91 ${phone}`}
                      className="h-10 rounded-xl border-slate-200 bg-slate-100 text-center text-xs font-medium text-slate-500"
                    />
                  </div>

                  {/* 6-Digit OTP Box */}
                  <div className="w-full flex flex-col items-center gap-1.5">
                    <Label className="text-[11px] font-semibold text-slate-500">
                      Enter 6-Digit OTP (Demo: 123456)
                    </Label>
                    <OTPInput
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                      containerClassName="flex justify-center gap-2 pt-1"
                      render={({ slots }) => (
                        <div className="flex gap-2">
                          {slots.map((slot, idx) => (
                            <div
                              key={idx}
                              className={`flex h-11 w-10 items-center justify-center rounded-xl border bg-white text-base font-bold text-slate-900 shadow-sm transition-all ${
                                slot.isActive
                                  ? "border-slate-800 ring-2 ring-slate-800/10"
                                  : "border-slate-300"
                              }`}
                            >
                              {slot.char}
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </div>

                  {error && <p className="text-xs text-red-500">{error}</p>}
                  {isSuccess && (
                    <p className="text-xs font-semibold text-emerald-600">
                      Login Successful!
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSuccess}
                    className="h-12 w-full rounded-2xl bg-[#5f5e58] text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#4a4944]"
                  >
                    Verify & Login
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
