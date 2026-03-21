import { supabase, toBlog } from "@/lib/supabase";
import { BlogManager } from "./blog-manager";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const { data } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  const blogs = (data || []).map(toBlog);
  return <BlogManager initialBlogs={blogs} />;
}
