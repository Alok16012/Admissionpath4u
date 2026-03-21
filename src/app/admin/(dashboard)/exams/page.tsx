import { supabase, toExam } from "@/lib/supabase";
import { ExamManager } from "./exam-manager";

export const dynamic = "force-dynamic";

export default async function AdminExamsPage() {
  const { data } = await supabase
    .from('exams')
    .select('*')
    .order('date', { ascending: true });

  const exams = (data || []).map(toExam);
  return <ExamManager initialExams={exams} />;
}
