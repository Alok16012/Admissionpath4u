// Centralized SEO configuration.
// Override the production domain by setting NEXT_PUBLIC_SITE_URL in your env.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://admissionpath4u.com"
).replace(/\/$/, "");

export const SITE_NAME = "Admission Path4u";

export const SITE_DESCRIPTION =
  "Admission Path4u helps you find your dream college in India. Compare fees, placements, and courses, get personalized college recommendations, and apply online.";

/** Build an absolute URL from a path. */
export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** Trim text to a clean meta-description length (~160 chars). */
export function metaDescription(text?: string | null, fallback = SITE_DESCRIPTION): string {
  if (!text) return fallback;
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= 160) return clean;
  return clean.slice(0, 157).trimEnd() + "...";
}
