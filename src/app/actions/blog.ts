'use server';

import { supabase, toBlog } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

function generateSlug(title: string) {
    return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export async function createBlog(data: any) {
    const slug = data.slug || generateSlug(data.title);
    const row = {
        title: data.title,
        slug,
        content: data.content || '',
        excerpt: data.excerpt || '',
        author: data.author || '',
        main_image: data.main_image || '',
    };

    const { data: created, error } = await supabase
        .from('blogs')
        .insert(row)
        .select()
        .single();

    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/blogs');
    revalidatePath('/blogs');
    return { success: true, data: toBlog(created) };
}

export async function updateBlog(id: string, data: any) {
    const row: any = {};
    if (data.title !== undefined) row.title = data.title;
    if (data.slug !== undefined) row.slug = data.slug;
    if (data.content !== undefined) row.content = data.content;
    if (data.excerpt !== undefined) row.excerpt = data.excerpt;
    if (data.author !== undefined) row.author = data.author;
    if (data.main_image !== undefined) row.main_image = data.main_image;

    const { data: updated, error } = await supabase
        .from('blogs')
        .update(row)
        .eq('id', id)
        .select()
        .single();

    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/blogs');
    revalidatePath('/blogs');
    return { success: true, data: toBlog(updated) };
}

export async function deleteBlog(id: string) {
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/blogs');
    revalidatePath('/blogs');
    return { success: true };
}

export async function getBlogs() {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) return [];
    return (data || []).map(toBlog);
}
