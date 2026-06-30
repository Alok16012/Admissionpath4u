"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, GraduationCap } from "lucide-react";

interface College {
  _id: string;
  name: string;
  slug: string;
  state: string;
  city: string;
  courses: string[];
  fees: number;
  images: string[];
  highestPackage?: number;
  averagePackage?: number;
}

interface CollegeDirectorySectionProps {
  colleges: College[];
  states: string[];
  courses: string[];
}

const FEE_RANGES = [
  { label: "Any Fee", min: 0, max: Infinity },
  { label: "Under ₹1 Lakh", min: 0, max: 100000 },
  { label: "₹1 – 3 Lakh", min: 100000, max: 300000 },
  { label: "₹3 – 5 Lakh", min: 300000, max: 500000 },
  { label: "₹5 – 10 Lakh", min: 500000, max: 1000000 },
  { label: "Above ₹10 Lakh", min: 1000000, max: Infinity },
];

function formatFee(fees: number) {
  if (!fees || fees <= 0) return "On Request";
  if (fees >= 100000) {
    const lakh = fees / 100000;
    return `₹${Number.isInteger(lakh) ? lakh : lakh.toFixed(1)} Lakh`;
  }
  return `₹${fees.toLocaleString("en-IN")}`;
}

export function CollegeDirectorySection({
  colleges,
  states,
  courses,
}: CollegeDirectorySectionProps) {
  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [course, setCourse] = useState("");
  const [feeRange, setFeeRange] = useState("0");

  const filtered = useMemo(() => {
    const range = FEE_RANGES[Number(feeRange)] ?? FEE_RANGES[0];
    const q = search.trim().toLowerCase();
    return colleges.filter((c) => {
      if (state && c.state !== state) return false;
      if (course && !c.courses?.includes(course)) return false;
      if (c.fees < range.min || c.fees > range.max) return false;
      if (q && !c.name.toLowerCase().includes(q) && !c.city.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [colleges, state, course, feeRange, search]);

  const selectClass =
    "h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:border-[#27465B] focus:outline-none focus:ring-2 focus:ring-[#27465B]/20";

  if (!colleges || colleges.length === 0) return null;

  return (
    <section className="bg-white py-12 md:py-14">
      <div className="container mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="inline-block rounded-md bg-[#27465B] px-5 py-2 text-2xl font-bold text-white md:text-3xl">
            Top <span className="text-[#BDA25F]">Colleges / Universities</span>
          </h2>
        </div>

        {/* Filter bar */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search college..."
              className={`${selectClass} pl-9`}
            />
          </div>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={selectClass}
          >
            <option value="">All States</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className={selectClass}
          >
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={feeRange}
            onChange={(e) => setFeeRange(e.target.value)}
            className={selectClass}
          >
            {FEE_RANGES.map((r, i) => (
              <option key={r.label} value={i}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center text-gray-500">
            No colleges match your filters. Try adjusting them.
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-xl border border-gray-200 md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#27465B] text-sm text-white">
                    <th className="px-5 py-3 font-semibold">Colleges</th>
                    <th className="px-5 py-3 font-semibold">Course Fees</th>
                    <th className="px-5 py-3 text-center font-semibold">Avg CTC</th>
                    <th className="px-5 py-3 text-center font-semibold">High CTC</th>
                    <th className="px-5 py-3 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr
                      key={c._id}
                      className="border-t border-gray-100 align-middle transition-colors hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                            {c.images?.[0] ? (
                              <Image
                                src={c.images[0]}
                                alt={c.name}
                                width={48}
                                height={48}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <GraduationCap className="h-5 w-5 text-[#27465B]" />
                            )}
                          </div>
                          <div>
                            <Link
                              href={`/colleges/${c.slug}`}
                              className="font-semibold text-[#27465B] hover:underline"
                            >
                              {c.name}
                            </Link>
                            <p className="text-xs text-gray-500">
                              {c.city}, {c.state}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-gray-700">
                        {formatFee(c.fees)}
                      </td>
                      <td className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                        {c.averagePackage ? `₹${c.averagePackage} LPA` : "—"}
                      </td>
                      <td className="px-5 py-4 text-center text-sm font-semibold text-[#27465B]">
                        {c.highestPackage ? `₹${c.highestPackage} LPA` : "—"}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#BDA25F] px-4 py-2 text-xs font-bold text-[#27465B] transition-colors hover:bg-[#a98e4f]"
                        >
                          Apply Now
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {filtered.map((c) => (
                <div
                  key={c._id}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                      {c.images?.[0] ? (
                        <Image
                          src={c.images[0]}
                          alt={c.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <GraduationCap className="h-5 w-5 text-[#27465B]" />
                      )}
                    </div>
                    <div>
                      <Link
                        href={`/colleges/${c.slug}`}
                        className="font-semibold text-[#27465B]"
                      >
                        {c.name}
                      </Link>
                      <p className="text-xs text-gray-500">
                        {c.city}, {c.state}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="rounded-lg bg-gray-50 py-2">
                      <div className="text-gray-400">Fees</div>
                      <div className="font-semibold text-gray-700">
                        {formatFee(c.fees)}
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-50 py-2">
                      <div className="text-gray-400">Avg CTC</div>
                      <div className="font-semibold text-gray-700">
                        {c.averagePackage ? `₹${c.averagePackage}L` : "—"}
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-50 py-2">
                      <div className="text-gray-400">High CTC</div>
                      <div className="font-semibold text-[#27465B]">
                        {c.highestPackage ? `₹${c.highestPackage}L` : "—"}
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-[#BDA25F] py-2.5 text-sm font-bold text-[#27465B]"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}

        <p className="mt-5 text-center text-xs text-gray-400">
          Showing {filtered.length} of {colleges.length} colleges · Managed from
          the admin panel
        </p>
      </div>
    </section>
  );
}
