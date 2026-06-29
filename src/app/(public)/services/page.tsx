import Link from "next/link";
import { getServices } from "@/app/actions/public";
import {
  Search, Banknote, FileText, Building2, BadgeIndianRupee, GraduationCap,
  BookOpen, Users, Star, Trophy, Award, Lightbulb, Target, CheckCircle,
  Shield, Globe, Zap, Heart, Clock, Phone, ArrowRight, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ICON_MAP: Record<string, React.ElementType> = {
  Search, Banknote, FileText, Building2, BadgeIndianRupee, GraduationCap,
  BookOpen, Users, Star, Trophy, Award, Lightbulb, Target, CheckCircle,
  Shield, Globe, Zap, Heart, Clock, Phone,
};

// Fallback static services if DB is empty
const STATIC_SERVICES = [
  { _id: "1", title: "College Finder", shortDescription: "Your smart guide to finding the best-fit college tailored to your needs.", icon: "Search", features: ["Personalized Recommendations", "500+ Colleges", "Filter by Course & Budget"], slug: "college-finder", ctaText: "Discover Now" },
  { _id: "2", title: "Scholarship Program", shortDescription: "Grab up to 100% scholarships to fund your dream education.", icon: "Banknote", features: ["Merit-Based Scholarships", "Need-Based Aid", "Easy Application"], slug: "scholarship-program", ctaText: "Apply Now" },
  { _id: "3", title: "Application Process", shortDescription: "Apply to multiple colleges through a single, streamlined admission process.", icon: "FileText", features: ["Single Application", "Document Assistance", "Status Tracking"], slug: "application-process", ctaText: "Join Now" },
  { _id: "4", title: "Campus Achiever", shortDescription: "Unlock exclusive campus opportunities and excel in your academic journey.", icon: "Building2", features: ["Campus Tours", "Student Communities", "Career Guidance"], slug: "campus-achiever", ctaText: "Get Started" },
  { _id: "5", title: "Education Loan", shortDescription: "Turn dreams into reality with easy and accessible education loans.", icon: "BadgeIndianRupee", features: ["Low Interest Rates", "Flexible Repayment", "Quick Approval"], slug: "education-loan", ctaText: "Apply Now" },
  { _id: "6", title: "Re-admission", shortDescription: "Simplified re-admission services to get you back on track effortlessly.", icon: "GraduationCap", features: ["Quick Re-enrollment", "Credit Transfer", "Academic Counseling"], slug: "re-admission", ctaText: "Register Now" },
];

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const dbServices = await getServices();
  const services = dbServices.length > 0 ? dbServices : STATIC_SERVICES;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1d4ed8] via-[#1e40af] to-[#1e3a8a] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-[#FFD700] blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
            <span>Comprehensive Admission Support</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Our <span className="text-[#FFD700]">Services</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            From college discovery to final enrollment — we guide you through every step of your admission journey.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {[
              { label: "Services Offered", value: `${services.length}+` },
              { label: "Students Helped", value: "10,000+" },
              { label: "Partner Colleges", value: "500+" },
              { label: "Success Rate", value: "98%" },
            ].map((stat) => (
              <div key={stat.label} className="py-6 px-4 text-center">
                <div className="text-2xl font-bold text-[#1d4ed8]">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Everything You Need for <span className="text-[#1d4ed8]">Admission Success</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Explore our full range of services designed to make your college admission journey smooth and successful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any) => {
              const IconComponent = ICON_MAP[service.icon] || Star;
              return (
                <Link
                  key={service._id}
                  href={`/services/${service.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-[#1d4ed8]/30 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-br from-[#1d4ed8]/5 to-[#1d4ed8]/10 p-6 group-hover:from-[#1d4ed8]/10 group-hover:to-[#1d4ed8]/20 transition-colors duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:shadow-md transition-shadow">
                      <IconComponent className="w-7 h-7 text-[#1d4ed8]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1d4ed8] transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Features Preview */}
                  {service.features && service.features.length > 0 && (
                    <div className="px-6 py-4 flex-1">
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="px-6 py-4 border-t border-gray-50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#1d4ed8] group-hover:underline decoration-[#FFD700] underline-offset-4">
                        {service.ctaText || "Learn More"}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#1d4ed8] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#1d4ed8] to-[#1e40af] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Get personalized guidance from our experts and take the first step towards your dream college.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold border-none shadow-lg"
          >
            <Link href="/contact">Talk to an Expert</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
