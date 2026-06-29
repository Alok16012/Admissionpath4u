"use client";

import Link from "next/link";
import {
  FlaskConical, // Science
  Briefcase, // Management
  Settings, // Engineering
  Palette, // Art
  BarChart3, // Commerce
  Scale, // Law
  Building2, // Architecture
  Stethoscope, // MBBS
  Sprout, // Agriculture
  Smile, // Dental
  Globe2, // Travel
  Monitor, // Computer
  Film, // Animation
  Plane, // Aviation
  Dog, // Veterinary
  Hotel, // Hotel Mgmt
  GraduationCap, // Default
} from "lucide-react";

const iconMap: { [key: string]: any } = {
  Science: FlaskConical,
  Management: Briefcase,
  Engineering: Settings,
  Arts: Palette,
  Art: Palette,
  Commerce: BarChart3,
  Law: Scale,
  Architecture: Building2,
  Medical: Stethoscope,
  MBBS: Stethoscope,
  Agriculture: Sprout,
  Dental: Smile,
  Travel: Globe2,
  Computer: Monitor,
  "Computer Applications": Monitor,
  Animation: Film,
  Aviation: Plane,
  Veterinary: Dog,
  "Hotel Management": Hotel,
};

interface CourseFilterSectionProps {
  courses: string[];
}

export function CourseFilterSection({ courses }: CourseFilterSectionProps) {
  if (!courses || courses.length === 0) return null;

  return (
    <section className="py-16 container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#1d4ed8]">
        <span className="text-blue-600">Find Best</span> College/Universities
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map((course) => {
          const Icon = iconMap[course] || GraduationCap;

          return (
            <Link
              href={`/colleges?course=${encodeURIComponent(course)}`}
              key={course}
              className="flex items-center gap-4 p-4 rounded-full border border-gray-200 hover:border-[#1d4ed8] hover:shadow-md transition-all bg-white group"
            >
              <div className="bg-[#2563eb] text-white p-2 rounded-full group-hover:bg-[#1d4ed8] transition-colors">
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-semibold text-gray-700 group-hover:text-black">
                {course}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
