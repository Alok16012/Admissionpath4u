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

// Preferred display order (mirrors the reference layout). Any course not
// listed here keeps its original position after these, so the DB stays the
// source of truth for *which* streams exist — we only control the ordering.
const STREAM_ORDER = [
  "Management",
  "Engineering",
  "Art",
  "Arts",
  "Law",
  "Medical",
  "MBBS",
  "Dental",
  "Travel",
  "Computer",
  "Computer Applications",
  "Animation",
  "Aviation",
  "Veterinary",
  "Hotel Management",
];

function orderCourses(courses: string[]): string[] {
  const rank = (course: string) => {
    const i = STREAM_ORDER.indexOf(course);
    return i === -1 ? STREAM_ORDER.length : i;
  };
  return [...courses].sort((a, b) => {
    const diff = rank(a) - rank(b);
    return diff !== 0 ? diff : a.localeCompare(b);
  });
}

interface CourseFilterSectionProps {
  courses: string[];
}

export function CourseFilterSection({ courses }: CourseFilterSectionProps) {
  if (!courses || courses.length === 0) return null;

  const orderedCourses = orderCourses(courses);

  return (
    <section className="bg-gray-50 py-12 md:py-14">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-[#27465B]">
            Find Best <span className="text-[#BDA25F]">College / Universities</span>
          </h2>
          <p className="mt-3 text-gray-500">
            Browse colleges by your preferred stream and discover the right fit for your career.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {orderedCourses.map((course) => {
            const Icon = iconMap[course] || GraduationCap;

            return (
              <Link
                href={`/colleges?course=${encodeURIComponent(course)}`}
                key={course}
                className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#27465B] hover:shadow-lg"
              >
                <div className="rounded-xl bg-[#27465B]/10 p-2.5 text-[#27465B] transition-colors group-hover:bg-[#27465B] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-semibold text-gray-700 transition-colors group-hover:text-[#27465B]">
                  {course}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
