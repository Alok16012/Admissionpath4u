'use server';

import { supabase, toExam } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

function generateSlug(name: string) {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export async function createExam(data: any) {
    const slug = data.slug || generateSlug(data.name);
    const row = {
        name: data.name,
        slug,
        date: data.date,
        description: data.description || '',
        eligibility: data.eligibility || '',
        listing_mode: data.listing_mode || 'Online',
    };

    const { data: created, error } = await supabase
        .from('exams')
        .insert(row)
        .select()
        .single();

    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/exams');
    revalidatePath('/exams');
    return { success: true, data: toExam(created) };
}

export async function updateExam(id: string, data: any) {
    const row: any = {};
    if (data.name !== undefined) row.name = data.name;
    if (data.slug !== undefined) row.slug = data.slug;
    if (data.date !== undefined) row.date = data.date;
    if (data.description !== undefined) row.description = data.description;
    if (data.eligibility !== undefined) row.eligibility = data.eligibility;
    if (data.listing_mode !== undefined) row.listing_mode = data.listing_mode;

    const { data: updated, error } = await supabase
        .from('exams')
        .update(row)
        .eq('id', id)
        .select()
        .single();

    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/exams');
    revalidatePath('/exams');
    return { success: true, data: toExam(updated) };
}

export async function deleteExam(id: string) {
    const { error } = await supabase.from('exams').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/exams');
    revalidatePath('/exams');
    return { success: true };
}

export async function getExams() {
    const { data, error } = await supabase
        .from('exams')
        .select('*')
        .order('date', { ascending: true });
    if (error) return [];
    return (data || []).map(toExam);
}
