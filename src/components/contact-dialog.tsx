"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactForm } from "./contact-form";

interface ContactDialogProps {
  collegeName: string;
  defaultCourse?: string;
}

export function ContactDialog({
  collegeName,
  defaultCourse,
}: ContactDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full text-lg">
          Apply Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Apply to {collegeName}</DialogTitle>
          <DialogDescription>
            Fill out the form below to get in touch with our admission
            counselors.
          </DialogDescription>
        </DialogHeader>
        <ContactForm defaultCourse={defaultCourse} source={`College Page - ${collegeName}`} />
      </DialogContent>
    </Dialog>
  );
}
