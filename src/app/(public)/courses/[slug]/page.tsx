import { notFound } from "next/navigation";
import Link from "next/link";
import { getColleges } from "@/app/actions/public";
import { CollegeCard } from "@/components/college-card";
import { Button } from "@/components/ui/button";
import { COURSE_CONFIG } from "@/lib/course-config";
import {
  Settings, GraduationCap, Briefcase, Gavel, Plane, Palette,
  Clock, BookOpen, IndianRupee, Users, ChevronRight, CheckCircle,
  Search,
} from "lucide-react";
import { CourseSearchBar } from "./course-search-bar";

const ICON_MAP: Record<string, React.ElementType> = {
  Settings, GraduationCap, Briefcase, Gavel, Plane, Palette,
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = COURSE_CONFIG[slug];
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.name} Colleges | Admission For You`,
    description: course.description,
  };
}

export default async function CoursePage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { slug } = params;

  const course = COURSE_CONFIG[slug];
  if (!course) notFound();

  const IconComponent = ICON_MAP[course.icon] || GraduationCap;

  // Fetch colleges filtered by this course + optional search
  const courseSearchParams = {
    ...searchParams,
    course: course.name,
  };
  const { colleges, totalPages, currentPage } = await getColleges(courseSearchParams);

  const createPageLink = (page: number) => {
    const p = new URLSearchParams(searchParams as any);
    p.set("page", page.toString());
    return `?${p.toString()}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3">
        <div className="container mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#800000]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/colleges" className="hover:text-[#800000]">Colleges</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">{course.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className={`relative bg-gradient-to-br ${course.gradient} py-16 overflow-hidden`}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full mb-4 border border-white/20">
              <IconComponent className="w-3.5 h-3.5" />
              {course.fullName}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Top <span className="text-[#FFD700]">{course.name}</span> Colleges in India
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-2xl">
              {course.description}
            </p>

            {/* Search Bar */}
            <CourseSearchBar />
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            <div className="py-5 px-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#800000] flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Duration</p>
                <p className="text-sm font-semibold text-gray-800">{course.duration}</p>
              </div>
            </div>
            <div className="py-5 px-4 flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-[#800000] flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Eligibility</p>
                <p className="text-sm font-semibold text-gray-800 line-clamp-1">{course.eligibility}</p>
              </div>
            </div>
            <div className="py-5 px-4 flex items-center gap-3">
              <IndianRupee className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Avg Salary</p>
                <p className="text-sm font-semibold text-green-700">{course.avgSalary}</p>
              </div>
            </div>
            <div className="py-5 px-4 flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Colleges Listed</p>
                <p className="text-sm font-semibold text-gray-800">{colleges.length}+ Colleges</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gray-50 flex-1">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* Course Highlights */}
                <div className={`${course.bgLight} rounded-2xl p-5 border border-gray-100`}>
                  <h3 className="font-bold text-gray-900 mb-3 text-sm">Why Study {course.name}?</h3>
                  <ul className="space-y-2">
                    {course.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle className="w-3.5 h-3.5 text-[#800000] flex-shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Top Recruiters */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-3 text-sm">Top Recruiters</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.topRecruiters.map((r) => (
                      <span key={r} className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-[#800000] to-[#a00000] rounded-2xl p-5 text-white text-center">
                  <p className="text-sm font-bold mb-1">Need Admission Help?</p>
                  <p className="text-xs text-white/70 mb-3">Free counseling by experts</p>
                  <Button asChild size="sm" className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold w-full border-none">
                    <Link href="/contact">Talk to Counselor</Link>
                  </Button>
                </div>
              </div>
            </aside>

            {/* College Grid */}
            <main className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {colleges.length > 0 ? `${colleges.length} Colleges Found` : "Colleges"}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">Best {course.name} colleges with placement records</p>
                </div>
              </div>

              {colleges.length > 0 ? (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {colleges.map((college: any) => (
                      <CollegeCard key={college._id} college={college} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-10">
                      <Button variant="outline" disabled={currentPage <= 1} asChild={currentPage > 1}>
                        {currentPage > 1 ? (
                          <Link href={createPageLink(currentPage - 1)}>Previous</Link>
                        ) : "Previous"}
                      </Button>
                      <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
                      <Button variant="outline" disabled={currentPage >= totalPages} asChild={currentPage < totalPages}>
                        {currentPage < totalPages ? (
                          <Link href={createPageLink(currentPage + 1)}>Next</Link>
                        ) : "Next"}
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-20 text-center border rounded-2xl bg-white">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">No colleges found</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your search or check back later</p>
                  <Button asChild className="mt-4 bg-[#800000] hover:bg-[#900000] text-white">
                    <Link href="/contact">Request College Info</Link>
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Other Courses */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Explore Other Courses</h2>
          <div className="flex flex-wrap gap-3">
            {Object.values(COURSE_CONFIG)
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/courses/${c.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-[#800000] hover:text-white text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:border-[#800000] transition-all"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
