import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase configuration missing in environment variables:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseServiceKey,
  });
}

// Singleton for server-side use (service role — full access, no RLS)
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

// ── Row → App object mappers ───────────────────────────────────────────────
// Each mapper converts Supabase snake_case rows to the camelCase shape the UI
// expects, and adds `_id` as an alias of `id` for backwards compatibility.

export function toCollege(row: any) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    slug: row.slug,
    state: row.state,
    city: row.city,
    courses: row.courses ?? [],
    fees: row.fees,
    description: row.description,
    images: row.images ?? [],
    highestPackage: row.highest_package,
    averagePackage: row.average_package,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toExam(row: any) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    slug: row.slug,
    date: row.date,
    description: row.description,
    eligibility: row.eligibility,
    listing_mode: row.listing_mode,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toBlog(row: any) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    title: row.title,
    slug: row.slug,
    content: row.content,
    excerpt: row.excerpt,
    author: row.author,
    main_image: row.main_image,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toLead(row: any) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    state: row.state,
    interestedCourse: row.interested_course,
    message: row.message,
    source: row.source,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toService(row: any) {
  if (!row) return null;
  return {
    _id: row.id,
    id: row.id,
    title: row.title,
    slug: row.slug,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    icon: row.icon,
    image: row.image,
    features: row.features ?? [],
    benefits: row.benefits ?? [],
    processSteps: row.process_steps ?? [],
    faqs: row.faqs ?? [],
    ctaText: row.cta_text,
    isActive: row.is_active,
    order: row.order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toSettings(row: any) {
  if (!row) return null;
  return {
    _id: row.id,
    key: row.key,
    aboutMission: row.about_mission,
    aboutVision: row.about_vision,
    aboutStats: row.about_stats ?? [],
    aboutWhyUs: row.about_why_us ?? [],
    heroImages: row.hero_images ?? [],
    heroTitle: row.hero_title ?? '',
    heroSubtitle: row.hero_subtitle ?? '',
    updatedAt: row.updated_at,
  };
}
