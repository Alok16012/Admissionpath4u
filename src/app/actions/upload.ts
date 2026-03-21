'use server';

import { supabase } from '@/lib/supabase';

export async function uploadImage(formData: FormData) {
    // Image upload has been disabled as per user request to remove external dependencies like Cloudinary/Supabase Storage for now.
    console.warn("Image upload is currently disabled.");
    return "";
}
