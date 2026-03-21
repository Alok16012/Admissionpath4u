-- ================================================
-- Admission For You - Supabase SQL Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL)
-- ================================================

-- Enable UUID extension (usually already enabled on Supabase)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Auto update_updated_at trigger function ───────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ─── COLLEGES ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS colleges (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name            TEXT        NOT NULL,
  slug            TEXT        NOT NULL UNIQUE,
  state           TEXT        NOT NULL DEFAULT '',
  city            TEXT        NOT NULL DEFAULT '',
  courses         TEXT[]      NOT NULL DEFAULT '{}',
  fees            NUMERIC     NOT NULL DEFAULT 0,
  description     TEXT        NOT NULL DEFAULT '',
  images          TEXT[]      DEFAULT '{}',
  highest_package NUMERIC,
  average_package NUMERIC,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER colleges_updated_at
  BEFORE UPDATE ON colleges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── EXAMS ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS exams (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT        NOT NULL,
  slug         TEXT        UNIQUE,
  date         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  description  TEXT        NOT NULL DEFAULT '',
  eligibility  TEXT        NOT NULL DEFAULT '',
  listing_mode TEXT        DEFAULT 'Online' CHECK (listing_mode IN ('Online', 'Offline')),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER exams_updated_at
  BEFORE UPDATE ON exams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── BLOGS ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blogs (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title      TEXT        NOT NULL,
  slug       TEXT        UNIQUE,
  content    TEXT        NOT NULL DEFAULT '',
  excerpt    TEXT        NOT NULL DEFAULT '',
  author     TEXT        NOT NULL DEFAULT '',
  main_image TEXT        NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── LEADS ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id                UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name              TEXT        NOT NULL,
  email             TEXT        NOT NULL,
  phone             TEXT        NOT NULL,
  state             TEXT        DEFAULT '',
  interested_course TEXT        DEFAULT '',
  message           TEXT        DEFAULT '',
  source            TEXT        DEFAULT 'Contact Page',
  status            TEXT        DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'enrolled')),
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── SERVICES ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id                UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  title             TEXT        NOT NULL,
  slug              TEXT        NOT NULL UNIQUE,
  short_description TEXT        NOT NULL DEFAULT '',
  full_description  TEXT        NOT NULL DEFAULT '',
  icon              TEXT        NOT NULL DEFAULT 'Star',
  image             TEXT,
  features          TEXT[]      DEFAULT '{}',
  benefits          TEXT[]      DEFAULT '{}',
  process_steps     JSONB       DEFAULT '[]',
  faqs              JSONB       DEFAULT '[]',
  cta_text          TEXT        DEFAULT 'Contact Us',
  is_active         BOOLEAN     DEFAULT true,
  "order"           INTEGER     DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── SITE SETTINGS ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  key           TEXT        NOT NULL UNIQUE DEFAULT 'main',
  about_mission TEXT        DEFAULT '',
  about_vision  TEXT        DEFAULT '',
  about_stats   JSONB       DEFAULT '[]',
  about_why_us  JSONB       DEFAULT '[]',
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default site settings row
INSERT INTO site_settings (key) VALUES ('main') ON CONFLICT (key) DO NOTHING;

-- ─── Disable RLS (or enable + add policies as needed) ──────────────────────
-- Since this app uses a service role key server-side, RLS policies are optional.
-- If you want public read access on some tables, enable RLS and add SELECT policies.
-- For now, all access is via the service role key in server actions.
