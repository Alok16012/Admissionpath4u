"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createLead } from "@/app/actions/public";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export function ContactForm({ defaultCourse, source }: { defaultCourse?: string; source?: string }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await createLead(formData);

    setLoading(false);

    if (result.success) {
      toast({
        title: "Success",
        description: "Your message has been sent successfully!",
        variant: "default",
        className: "bg-green-600 text-white border-none",
      });
      (event.target as HTMLFormElement).reset();
    } else {
      toast({
        title: "Error",
        description: result.error || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="firstName"
            className="text-sm font-semibold text-yellow-400"
          >
            First Name *
          </label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="Jane"
            required
            className="bg-white text-black border-none h-12"
          />
          <p className="text-xs text-white/60">Enter your first name here</p>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="lastName"
            className="text-sm font-semibold text-yellow-400"
          >
            Last Name *
          </label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            required
            className="bg-white text-black border-none h-12"
          />
          <p className="text-xs text-white/60">Enter your last name here</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-red-300">
            Email Address *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Add email"
            required
            className="bg-white text-black border-none h-12"
          />
          <p className="text-xs text-white/60">Example: user@website.com</p>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="mobile"
            className="text-sm font-semibold text-red-300"
          >
            Mobile *
          </label>
          <Input
            id="mobile"
            name="mobile"
            type="tel"
            placeholder="+91 1234567890"
            required
            className="bg-white text-black border-none h-12"
          />
        </div>
      </div>

      <div className="space-y-2 pt-4">
        <h3 className="text-2xl font-bold">How can we help?</h3>
        <p className="text-gray-200 text-sm">
          Feel free to ask a question or simply leave a comment
        </p>

        <div className="mt-4 space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-semibold text-yellow-400"
          >
            Comments / Questions *
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Add text"
            required
            className="bg-white text-black border-none min-h-[110px] resize-none"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-400 text-black font-bold hover:bg-yellow-500 mt-4 h-12 text-lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Submit"
        )}
      </Button>
      {defaultCourse && (
        <input type="hidden" name="interestedCourse" value={defaultCourse} />
      )}
      <input type="hidden" name="source" value={source || "Contact Page"} />
    </form>
  );
}
