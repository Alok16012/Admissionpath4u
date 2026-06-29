import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About Us | Admission Path4u",
  description:
    "Learn more about Admission Path4u, our mission, and how we help students find their dream colleges.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-[#27465B] text-white">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <Badge
            variant="outline"
            className="mb-4 border-white/20 text-[#BDA25F] px-4 py-1"
          >
            About Us
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
            Empowering Your{" "}
            <span className="text-[#BDA25F]">Academic Journey</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-200 leading-relaxed">
            We are dedicated to simplifying the college admission process for
            students across India. From finding the right college to securing
            scholarships, we are with you every step of the way.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Mission & Vision
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                At Admission Path4u, our mission is to democratize access to
                quality education information. We believe every student deserves
                to make informed decisions about their future, regardless of
                their background.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We envision a future where the college admission process is
                transparent, accessible, and stress-free. Our platform leverages
                technology to bridge the gap between ambitious students and
                top-tier educational institutions.
              </p>
            </div>
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl bg-gray-100 flex items-center justify-center">
              <div className="text-gray-400 font-medium">
                {/* Placeholder for an image - using text for now until image is provided */}
                Image: Team or Office
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-[#27465B] sm:text-4xl mb-4">
              Why Choose Admission Path4u?
            </h2>
            <p className="text-gray-600 text-lg">
              We bring expertise, transparency, and personalized guidance to
              your admission journey.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              title="Expert Counseling"
              description="Get guidance from experienced counselors who understand the nuances of the admission process."
            />
            <FeatureCard
              title="Verified Information"
              description="Access up-to-date and accurate details about fees, placements, and eligibility criteria."
            />
            <FeatureCard
              title="Scholarship Support"
              description="Find tailored scholarship opportunities to help manage your education finances effectively."
            />
            <FeatureCard
              title="Seamless Process"
              description="From application forms to document verification, we streamline every step for you."
            />
            <FeatureCard
              title="Wide Network"
              description="Connect with top colleges and universities across India through our extensive partner network."
            />
            <FeatureCard
              title="Student First"
              description="Your career goals and preferences are our top priority. We work for your success."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <CheckCircle2 className="w-6 h-6 text-[#BDA25F] shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
