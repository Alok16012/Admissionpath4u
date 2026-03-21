'use server';

import { supabase } from '@/lib/supabase';

export async function uploadImage(formData: FormData) {
    const file = formData.get('file') as File;
    if (!file) throw new Error('No file provided');

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
        console.error('Supabase Storage Error:', error);
        throw new Error(`Upload failed: ${error.message}`);
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return data.publicUrl;
}
