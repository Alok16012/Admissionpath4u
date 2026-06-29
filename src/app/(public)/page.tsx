import Link from "next/link";
import {
  getUniqueCourses,
  getTopColleges,
  getRecentExams,
  getRecentBlogs,
  getServices,
} from "@/app/actions/public";
import { getSiteSettings } from "@/app/actions/settings";
import { CollegeCard } from "@/components/college-card";
import { ExamCard } from "@/components/exam-card";
import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { BannerCarousel } from "@/components/banner-carousel";
import { CourseFilterSection } from "@/components/course-filter-section";
import { ServicesSection } from "@/components/services-section";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [topColleges, recentExams, recentBlogs, courses, services, settings] = await Promise.all([
    getTopColleges(),
    getRecentExams(),
    getRecentBlogs(),
    getUniqueCourses(),
    getServices(),
    getSiteSettings(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Carousel Background */}
        <BannerCarousel images={settings?.heroImages} />

        {/* Content Overlay */}
        <div className="container relative z-10 px-4 md:px-6 text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl drop-shadow-md">
            {settings?.heroTitle || "Find Your Dream College"}
          </h1>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-gray-100 drop-shadow-sm font-medium">
            {settings?.heroSubtitle || "Explore thousands of colleges, courses, and scholarships to kickstart your career."}
          </p>
          <div className="mt-8 flex justify-center max-w-sm mx-auto space-x-2">
            <Button
              asChild
              size="lg"
              className="w-full shadow-lg bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold border-none"
            >
              <Link href="/colleges">Get Started</Link>
            </Button>
          </div>

          {/* Quick access course pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 md:gap-3">
            {["B.Tech", "MBBS", "MBA", "B.Sc", "M.Sc"].map((c) => (
              <Link
                key={c}
                href={`/colleges?course=${encodeURIComponent(c)}`}
                className="rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#1d4ed8]"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CourseFilterSection courses={courses} />

      <ServicesSection services={services} />

      {/* State Filter Section Removed as per user request flow, but available in codebase if needed. 
          Actually user didn't ask to remove it, but user prompt "Next section should look like..." implied linear flow.
          Wait, previous prompt added State Filter. This prompt says "Perfect now improve the design of featured college... Then in next section show 3 exams...".
          I kept ServicesSection. Assuming StateFilter was requested previously, I should probably leave it or move it if flow demands. 
          I will keep State Filter if it's there (it was removed in previous turn by user edit? No, user edit REMOVED StateFilterSection from imports and JSX. So I will NOT include it).
      */}

      {/* Top Colleges Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#1d4ed8]">
                Top <span className="text-blue-600">Placements</span>
              </h2>
              <p className="text-gray-500 mt-2">
                Colleges with highest salary packages
              </p>
            </div>
            <Button variant="link" asChild className="text-[#1d4ed8]">
              <Link href="/colleges">View All</Link>
            </Button>
          </div>
          {topColleges.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {topColleges.map((college: any) => (
                <CollegeCard key={college._id} college={college} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No colleges found.
            </div>
          )}
        </div>
      </section>

      {/* Top Exams Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#1d4ed8]">
                Upcoming <span className="text-blue-600">Exams</span>
              </h2>
              <p className="text-gray-500 mt-2">
                Stay updated with latest entrance exams
              </p>
            </div>
            <Button variant="link" asChild className="text-[#1d4ed8]">
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
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#1d4ed8]">
                Latest <span className="text-blue-600">News & Blogs</span>
              </h2>
              <p className="text-gray-500 mt-2">
                Insights, tips and education news
              </p>
            </div>
            <Button variant="link" asChild className="text-[#1d4ed8]">
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
