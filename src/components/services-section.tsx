"use client";

import Link from "next/link";
import {
  Search,
  Banknote,
  FileText,
  Building2,
  BadgeIndianRupee,
  GraduationCap,
  BookOpen,
  Users,
  Star,
  Trophy,
  Award,
  Lightbulb,
  Target,
  CheckCircle,
  Shield,
  Globe,
  Zap,
  Heart,
  Clock,
  Phone,
  ArrowRight,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Search, Banknote, FileText, Building2, BadgeIndianRupee, GraduationCap,
  BookOpen, Users, Star, Trophy, Award, Lightbulb, Target, CheckCircle,
  Shield, Globe, Zap, Heart, Clock, Phone,
};

const STATIC_SERVICES = [
  { title: "College Finder", description: "Your smart guide to finding the best-fit college tailored to your needs.", icon: "Search", cta: "Discover Now", slug: "college-finder" },
  { title: "Scholarship Program", description: "Grab up to 100% scholarships to fund your dream education.", icon: "Banknote", cta: "Apply Now", slug: "scholarship-program" },
  { title: "Application Process", description: "Apply to multiple colleges through a single, streamlined admission process.", icon: "FileText", cta: "Join Now", slug: "application-process" },
  { title: "Campus Achiever", description: "Unlock exclusive campus opportunities and excel in your academic journey.", icon: "Building2", cta: "Get Started", slug: "campus-achiever" },
  { title: "Education Loan", description: "Turn dreams into reality with easy and accessible education loans.", icon: "BadgeIndianRupee", cta: "Apply Now", slug: "education-loan" },
  { title: "Re-admission", description: "Simplified re-admission services to get you back on track effortlessly.", icon: "GraduationCap", cta: "Register Now", slug: "re-admission" },
];

interface ServicesSectionProps {
  services?: any[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const items = services && services.length > 0 ? services : STATIC_SERVICES;

  return (
    <section className="py-12 bg-white md:py-14">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-[#27465B]">
            Our <span className="text-[#BDA25F]">Services</span>
          </h2>
          <p className="mt-3 text-gray-500">
            End-to-end admission support — from finding your college to securing scholarships and loans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
          {items.map((service: any, index: number) => {
            const IconComponent = ICON_MAP[service.icon] || Star;
            const href = `/services/${service.slug}`;
            const cta = service.cta || service.ctaText || "Learn More";

            return (
              <Link
                href={href}
                key={service._id || index}
                className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-[#27465B]/30 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center p-4 h-full">
                  {/* Icon Circle */}
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-[#27465B]/10 flex items-center justify-center text-[#27465B] group-hover:bg-[#27465B] group-hover:text-white transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#27465B] transition-colors mb-1 truncate">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2 leading-relaxed">
                      {service.description || service.shortDescription}
                    </p>
                    <div className="flex items-center text-xs font-bold text-[#27465B] group-hover:underline decoration-[#BDA25F] underline-offset-4">
                      {cta}
                      <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#27465B] hover:underline decoration-[#BDA25F] underline-offset-4"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
