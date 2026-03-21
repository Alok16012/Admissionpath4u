import { MapPin, Phone, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div className="relative min-h-[calc(100vh-theme(spacing.34))] w-full">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#2C3E50]/80 z-10" />
        {/* Placeholder for background image - using a generic gradient or dark color if no image provided */}
        <div className="h-full w-full bg-slate-900" />
      </div>

      <div className="relative z-20 container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Left Column: Info & Map */}
          <div className="w-full lg:w-5/12 text-white space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                Contact Us
              </h1>
              <p className="text-gray-300 italic">
                Don't hesitate to reach out to us we're here to help make your
                experience as smooth as possible.
              </p>
            </div>

            <div className="space-y-8 relative pl-8 border-l border-gray-500/30 ml-3">
              {/* Address */}
              <div className="relative">
                <span className="absolute -left-[45px] top-0 bg-[#A01D39] p-2 rounded-full shadow-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </span>
                <h3 className="text-2xl font-bold mb-1">Address</h3>
                <p className="text-gray-200">
                  GF-090, Migsun Galleria, Sector 27
                </p>
                <p className="text-gray-200">Pincode -201306</p>
                <p className="text-gray-200">Greater Noida, Uttar Pradesh</p>
              </div>

              {/* Contact */}
              <div className="relative">
                <span className="absolute -left-[45px] top-0 bg-[#A01D39] p-2 rounded-full shadow-lg">
                  <Phone className="h-6 w-6 text-white" />
                </span>
                <h3 className="text-2xl font-bold mb-1">Contact</h3>
                <p className="text-gray-200">+91 96505 01173</p>
                <p className="text-gray-200">+91 79923 41027</p>
              </div>

              {/* E-mail */}
              <div className="relative">
                <span className="absolute -left-[45px] top-0 bg-[#A01D39] p-2 rounded-full shadow-lg">
                  <Mail className="h-6 w-6 text-white" />
                </span>
                <h3 className="text-2xl font-bold mb-1">E-mail</h3>
                <p className="text-gray-200">info@admissionpath4u.com</p>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden mt-8 text-black">
              <iframe
                src="https://www.google.com/maps?q=FGHH%2BC3P%2C%20Block%20B%2C%20Jaypee%20Greens%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201315&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="w-full lg:w-7/12 bg-[#A01D39] text-white p-8 md:p-10 rounded-xl shadow-2xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Your Details</h2>
              <p className="text-gray-200">
                Let us know how to get back to you.
              </p>
              <div className="h-px w-full bg-white/20 mt-4" />
            </div>

            <ContactForm source="Contact Page" />
          </div>
        </div>
      </div>
    </div>
  );
}
