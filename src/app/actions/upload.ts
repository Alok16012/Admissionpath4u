'use server';

import { supabase } from '@/lib/supabase';

export async function uploadImage(formData: FormData): Promise<{ url?: string; error?: string }> {
    const file = formData.get('file') as File;
    if (!file) return { error: 'No file provided' };

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const ext = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const filePath = `uploads/${fileName}`;

        const { error } = await supabase.storage
            .from('images')
            .upload(filePath, buffer, {
                contentType: file.type,
                upsert: false,
            });

        if (error) {
            return { error: `Storage error: ${error.message}` };
        }

        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        return { url: data.publicUrl };
    } catch (err: any) {
        return { error: err.message || 'Unknown error' };
    }
}
