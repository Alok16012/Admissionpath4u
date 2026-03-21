import { supabase, toLead } from "@/lib/supabase";
import { LeadManager } from "./lead-manager";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const { data } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  const leads = (data || []).map(toLead);
  return <LeadManager initialLeads={leads} />;
}
