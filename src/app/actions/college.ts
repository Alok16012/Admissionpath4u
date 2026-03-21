'use server';

import { supabase, toCollege } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

function generateSlug(name: string) {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export async function createCollege(data: any) {
    const slug = data.slug || generateSlug(data.name);
    const row = {
        name: data.name,
        slug,
        state: data.state || '',
        city: data.city || '',
        courses: data.courses || [],
        fees: data.fees || 0,
        description: data.description || '',
        images: data.images || [],
        highest_package: data.highestPackage ?? null,
        average_package: data.averagePackage ?? null,
    };

    const { data: created, error } = await supabase
        .from('colleges')
        .insert(row)
        .select()
        .single();

    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/colleges');
    revalidatePath('/colleges');
    return { success: true, data: toCollege(created) };
}

export async function updateCollege(id: string, data: any) {
    const row: any = {};
    if (data.name !== undefined) row.name = data.name;
    if (data.slug !== undefined) row.slug = data.slug;
    if (data.state !== undefined) row.state = data.state;
    if (data.city !== undefined) row.city = data.city;
    if (data.courses !== undefined) row.courses = data.courses;
    if (data.fees !== undefined) row.fees = data.fees;
    if (data.description !== undefined) row.description = data.description;
    if (data.images !== undefined) row.images = data.images;
    if (data.highestPackage !== undefined) row.highest_package = data.highestPackage;
    if (data.averagePackage !== undefined) row.average_package = data.averagePackage;

    const { data: updated, error } = await supabase
        .from('colleges')
        .update(row)
        .eq('id', id)
        .select()
        .single();

    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/colleges');
    revalidatePath('/colleges');
    return { success: true, data: toCollege(updated) };
}

export async function deleteCollege(id: string) {
    const { error } = await supabase.from('colleges').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/colleges');
    revalidatePath('/colleges');
    return { success: true };
}
