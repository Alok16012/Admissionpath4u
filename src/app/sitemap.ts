import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

async function getSlugs(table: string) {
  try {
    const { data, error } = await supabase
      .from(table)
      .select("slug, updated_at");
    if (error || !data) return [];
    return data as { slug: string; updated_at: string | null }[];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/colleges`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/exams`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blogs`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const [colleges, exams, blogs, services] = await Promise.all([
    getSlugs("colleges"),
    getSlugs("exams"),
    getSlugs("blogs"),
    getSlugs("services"),
  ]);

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...colleges.map((c) => ({
      url: `${SITE_URL}/colleges/${c.slug}`,
      lastModified: c.updated_at ? new Date(c.updated_at) : now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...exams.map((e) => ({
      url: `${SITE_URL}/exams/${e.slug}`,
      lastModified: e.updated_at ? new Date(e.updated_at) : now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...blogs.map((b) => ({
      url: `${SITE_URL}/blogs/${b.slug}`,
      lastModified: b.updated_at ? new Date(b.updated_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: s.updated_at ? new Date(s.updated_at) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
