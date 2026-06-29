"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Loader2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createLead } from "@/app/actions/public";
import { useToast } from "@/hooks/use-toast";

const COURSES = [
  "B.Tech",
  "MBBS",
  "MBA",
  "Design",
  "Law",
  "Abroad MBBS",
  "Other",
];

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Show only once per browser session so it isn't annoying on every navigation
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("leadPopupShown")) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("leadPopupShown", "1");
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await createLead(formData);

    setLoading(false);

    if (result.success) {
      toast({
        title: "Thank you!",
        description: "Our team will contact you shortly.",
        className: "bg-green-600 text-white border-none",
      });
      setOpen(false);
    } else {
      toast({
        title: "Error",
        description: result.error || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/40"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-[#27465B] to-[#1b3242] px-6 pb-8 pt-7 text-center text-white">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white p-1.5">
            <Image
              src="/logo.png"
              alt="Admission Path4u"
              width={48}
              height={48}
              className="h-full w-auto"
            />
          </div>
          <h3 className="text-xl font-extrabold">
            Get <span className="text-[#BDA25F]">Free</span> Admission Guidance
          </h3>
          <p className="mt-1 text-sm text-white/75">
            Fill the form & our experts will call you back today.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 px-6 py-6">
          <Input
            name="firstName"
            placeholder="Full Name *"
            required
            className="h-11"
          />
          <Input
            name="mobile"
            type="tel"
            placeholder="Mobile Number *"
            required
            className="h-11"
          />
          <Input
            name="email"
            type="email"
            placeholder="Email Address *"
            required
            className="h-11"
          />
          <div className="relative">
            <GraduationCap className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#27465B]" />
            <select
              name="interestedCourse"
              defaultValue=""
              required
              className="h-11 w-full rounded-md border border-input bg-transparent pl-9 pr-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#27465B]/30"
            >
              <option value="" disabled>
                Select Course of Interest *
              </option>
              {COURSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <input type="hidden" name="source" value="Homepage Popup" />

          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-full bg-[#BDA25F] text-base font-bold text-[#27465B] hover:bg-[#a98e4f]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Request a Call Back"
            )}
          </Button>
          <p className="text-center text-[11px] text-gray-400">
            We respect your privacy. No spam, ever.
          </p>
        </form>
      </div>
    </div>
  );
}
