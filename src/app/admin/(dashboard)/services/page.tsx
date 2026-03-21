import { supabase, toService } from "@/lib/supabase";
import { ServiceManager } from "./service-manager";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const { data } = await supabase
    .from('services')
    .select('*')
    .order('order', { ascending: true })
    .order('created_at', { ascending: false });

  const services = (data || []).map(toService);
  return <ServiceManager initialServices={services} />;
}
