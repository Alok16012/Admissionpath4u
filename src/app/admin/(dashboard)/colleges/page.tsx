import { supabase, toCollege } from "@/lib/supabase";
import { CollegeManager } from "./college-manager";

export const dynamic = "force-dynamic";

export default async function AdminCollegesPage() {
  const { data } = await supabase
    .from('colleges')
    .select('*')
    .order('created_at', { ascending: false });

  const colleges = (data || []).map(toCollege);
  return <CollegeManager initialColleges={colleges} />;
}
