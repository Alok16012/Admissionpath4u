'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function updateLeadStatus(id: string, status: string) {
    await supabase.from('leads').update({ status }).eq('id', id);
    revalidatePath('/admin/leads');
}
