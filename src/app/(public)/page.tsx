import Link from "next/link";
import {
  getUniqueCourses,
  getRecentExams,
  getRecentBlogs,
  getServices,
  getDirectoryColleges,
  getUniqueStates,
} from "@/app/actions/public";
import { getSiteSettings } from "@/app/actions/settings";
import { ExamCard } from "@/components/exam-card";
import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { BannerCarousel } from "@/components/banner-carousel";
import { CourseFilterSection } from "@/components/course-filter-section";
import { ServicesSection } from "@/components/services-section";
import { CollegeDirectorySection } from "@/components/college-directory-section";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [
    directoryColleges,
    states,
    recentExams,
    recentBlogs,
    courses,
    services,
    settings,
  ] = await Promise.all([
    getDirectoryColleges(),
    getUniqueStates(),
    getRecentExams(),
    getRecentBlogs(),
    getUniqueCourses(),
    getServices(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden md:min-h-[620px]">
        {/* Carousel Background */}
        <BannerCarousel images={settings?.heroImages} />

        {/* Light scrim — keeps text readable while letting the image show */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/25 via-black/15 to-black/35" />

        {/* Content Overlay */}
        <div className="container relative z-10 px-4 py-20 md:px-6 text-center text-white">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#BDA25F]/40 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#BDA25F] backdrop-blur-sm">
            India&apos;s Trusted Admission Partner
          </span>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl">
            {settings?.heroTitle || (
              <>
                Find the <span className="text-[#BDA25F]">Best College</span> for Your Future
              </>
            )}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] sm:text-lg">
            {settings?.heroSubtitle ||
              "Explore top colleges, entrance exams and scholarships — and apply with free expert guidance from Admission Path4u."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full bg-[#BDA25F] px-8 font-bold text-[#27465B] shadow-lg hover:bg-[#a98e4f] sm:w-auto"
            >
              <Link href="/colleges">Explore Colleges</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full rounded-full border-white/60 bg-transparent px-8 font-bold text-white hover:bg-white hover:text-[#27465B] sm:w-auto"
            >
              <Link href="/contact">Free Counselling</Link>
            </Button>
          </div>

          {/* Quick access course pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
            {["B.Tech", "MBBS", "MBA", "B.Sc", "M.Sc"].map((c) => (
              <Link
                key={c}
                href={`/colleges?course=${encodeURIComponent(c)}`}
                className="rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#27465B]"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / trust strip */}
      <section className="border-b border-gray-100 bg-white">
        <div className="container mx-auto grid grid-cols-2 px-4 md:grid-cols-4 md:px-6">
          {[
            { value: "500+", label: "Partner Colleges" },
            { value: "10,000+", label: "Students Guided" },
            { value: "100%", label: "Scholarship Help" },
            { value: "98%", label: "Success Rate" },
          ].map((s) => (
            <div
              key={s.label}
              className="border-b border-gray-100 py-7 text-center md:border-b-0 md:border-r md:last:border-r-0"
            >
              <div className="text-2xl font-extrabold text-[#27465B] md:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500 md:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CourseFilterSection courses={courses} />

      <ServicesSection services={services} />

      {/* Top Colleges / Universities — filterable directory (admin managed) */}
      <CollegeDirectorySection
        colleges={directoryColleges}
        states={states}
        courses={courses}
      />

      {/* Top Exams Section */}
      <section className="py-12 bg-white md:py-14">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#27465B]">
                Upcoming <span className="text-[#BDA25F]">Exams</span>
              </h2>
              <p className="text-gray-500 mt-2">
                Stay updated with latest entrance exams
              </p>
            </div>
            <Button variant="link" asChild className="text-[#27465B]">
              <Link href="/exams">View All</Link>
            </Button>
          </div>
          {recentExams.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentExams.map((exam: any) => (
                <ExamCard key={exam._id} exam={exam} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No exams found.
            </div>
          )}
        </div>
      </section>

      {/* Recent Blogs Section */}
      <section className="py-12 bg-gray-50 md:py-14">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#27465B]">
                Latest <span className="text-[#BDA25F]">News & Blogs</span>
              </h2>
              <p className="text-gray-500 mt-2">
                Insights, tips and education news
              </p>
            </div>
            <Button variant="link" asChild className="text-[#27465B]">
              <Link href="/blogs">View All</Link>
            </Button>
          </div>
          {recentBlogs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentBlogs.map((blog: any) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No blogs found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
