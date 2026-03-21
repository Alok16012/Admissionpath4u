import { supabase, toCollege } from "@/lib/supabase";
import { ALL_COURSES } from "@/lib/course-config";
import { CoursesOverview } from "./courses-overview";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const { data: allData } = await supabase
    .from('colleges')
    .select('*')
    .order('created_at', { ascending: false });

  const allColleges = (allData || []).map(toCollege);

  // Count colleges per course
  const courseStats = ALL_COURSES.map((course) => ({
    slug: course.slug,
    name: course.name,
    count: allColleges.filter((c: any) =>
      (c.courses || []).some((cr: string) =>
        cr.toLowerCase().includes(course.name.toLowerCase()) ||
        course.name.toLowerCase().includes(cr.toLowerCase())
      )
    ).length,
  }));

  return <CoursesOverview courseStats={courseStats} colleges={allColleges} />;
}
