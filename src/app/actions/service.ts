'use server';

import { supabase, toService } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

function generateSlug(title: string) {
    return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export async function createService(data: any) {
    const slug = data.slug || generateSlug(data.title);
    const row = {
        title: data.title,
        slug,
        short_description: data.shortDescription || '',
        full_description: data.fullDescription || '',
        icon: data.icon || 'Star',
        image: data.image || null,
        features: data.features || [],
        benefits: data.benefits || [],
        process_steps: data.processSteps || [],
        faqs: data.faqs || [],
        cta_text: data.ctaText || 'Contact Us',
        is_active: data.isActive ?? true,
        order: data.order ?? 0,
    };

    const { data: created, error } = await supabase
        .from('services')
        .insert(row)
        .select()
        .single();

    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/services');
    revalidatePath('/services');
    revalidatePath('/');
    return { success: true, data: toService(created) };
}

export async function updateService(id: string, data: any) {
    const row: any = {};
    if (data.title !== undefined) row.title = data.title;
    if (data.slug !== undefined) row.slug = data.slug;
    if (data.shortDescription !== undefined) row.short_description = data.shortDescription;
    if (data.fullDescription !== undefined) row.full_description = data.fullDescription;
    if (data.icon !== undefined) row.icon = data.icon;
    if (data.image !== undefined) row.image = data.image;
    if (data.features !== undefined) row.features = data.features;
    if (data.benefits !== undefined) row.benefits = data.benefits;
    if (data.processSteps !== undefined) row.process_steps = data.processSteps;
    if (data.faqs !== undefined) row.faqs = data.faqs;
    if (data.ctaText !== undefined) row.cta_text = data.ctaText;
    if (data.isActive !== undefined) row.is_active = data.isActive;
    if (data.order !== undefined) row.order = data.order;

    const { data: updated, error } = await supabase
        .from('services')
        .update(row)
        .eq('id', id)
        .select()
        .single();

    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/services');
    revalidatePath('/services');
    revalidatePath('/');
    return { success: true, data: toService(updated) };
}

export async function deleteService(id: string) {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/services');
    revalidatePath('/services');
    revalidatePath('/');
    return { success: true };
}

export async function getAdminServices() {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order', { ascending: true })
        .order('created_at', { ascending: false });
    if (error) return [];
    return (data || []).map(toService);
}
