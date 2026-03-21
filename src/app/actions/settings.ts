'use server';

import { supabase, toSettings } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function getSiteSettings() {
    const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', 'main')
        .single();
    if (error || !data) return null;
    return toSettings(data);
}

export async function saveSiteSettings(data: {
    aboutMission: string;
    aboutVision: string;
    aboutStats: { label: string; value: string }[];
    aboutWhyUs: { title: string; description: string }[];
}) {
    const row = {
        about_mission: data.aboutMission,
        about_vision: data.aboutVision,
        about_stats: data.aboutStats,
        about_why_us: data.aboutWhyUs,
    };

    const { error } = await supabase
        .from('site_settings')
        .upsert({ key: 'main', ...row }, { onConflict: 'key' });

    if (error) return { success: false, error: error.message };
    revalidatePath('/about');
    revalidatePath('/admin/about');
    return { success: true };
}

export async function saveHeroSettings(data: {
    heroImages: string[];
    heroTitle: string;
    heroSubtitle: string;
}) {
    const row = {
        hero_images: data.heroImages,
        hero_title: data.heroTitle,
        hero_subtitle: data.heroSubtitle,
    };

    const { error } = await supabase
        .from('site_settings')
        .upsert({ key: 'main', ...row }, { onConflict: 'key' });

    if (error) return { success: false, error: error.message };
    revalidatePath('/');
    revalidatePath('/admin/homepage');
    return { success: true };
}
