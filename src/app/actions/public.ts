'use server';

import { supabase, toCollege, toExam, toBlog, toService } from '@/lib/supabase';

export async function getBlogs(searchParams: { [key: string]: string | string[] | undefined }) {
    const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
    const limit = 9;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from('blogs').select('*', { count: 'exact' });
    if (searchParams.search) {
        query = query.ilike('title', `%${searchParams.search as string}%`);
    }

    const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) return { blogs: [], totalPages: 0, currentPage: page };
    return {
        blogs: (data || []).map(toBlog),
        totalPages: Math.ceil((count || 0) / limit),
        currentPage: page,
    };
}

export async function getBlogBySlug(slug: string) {
    const { data, error } = await supabase.from('blogs').select('*').eq('slug', slug).single();
    if (error || !data) return null;
    return toBlog(data);
}

export async function getExams(searchParams: { [key: string]: string | string[] | undefined }) {
    const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
    const limit = 9;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from('exams').select('*', { count: 'exact' });
    if (searchParams.search) {
        query = query.ilike('name', `%${searchParams.search as string}%`);
    }

    const { data, error, count } = await query
        .order('date', { ascending: true })
        .range(from, to);

    if (error) return { exams: [], totalPages: 0, currentPage: page };
    return {
        exams: (data || []).map(toExam),
        totalPages: Math.ceil((count || 0) / limit),
        currentPage: page,
    };
}

export async function getExamBySlug(slug: string) {
    const { data, error } = await supabase.from('exams').select('*').eq('slug', slug).single();
    if (error || !data) return null;
    return toExam(data);
}

export async function getColleges(searchParams: { [key: string]: string | string[] | undefined }) {
    const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
    const limit = 9;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase.from('colleges').select('*', { count: 'exact' });

    if (searchParams.state) {
        query = query.ilike('state', `%${searchParams.state as string}%`);
    }
    if (searchParams.city) {
        query = query.ilike('city', `%${searchParams.city as string}%`);
    }
    if (searchParams.course) {
        // colleges.courses is a text[] — check if array contains the value
        query = query.contains('courses', [searchParams.course as string]);
    }
    if (searchParams.search) {
        query = query.ilike('name', `%${searchParams.search as string}%`);
    }

    const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) return { colleges: [], totalPages: 0, currentPage: page };
    return {
        colleges: (data || []).map(toCollege),
        totalPages: Math.ceil((count || 0) / limit),
        currentPage: page,
    };
}

export async function getCollegeBySlug(slug: string) {
    const { data, error } = await supabase.from('colleges').select('*').eq('slug', slug).single();
    if (error || !data) return null;
    return toCollege(data);
}

export async function getFeaturedColleges() {
    const { data, error } = await supabase
        .from('colleges')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);
    if (error) return [];
    return (data || []).map(toCollege);
}

export async function getTopColleges() {
    const { data, error } = await supabase
        .from('colleges')
        .select('*')
        .order('highest_package', { ascending: false })
        .limit(3);
    if (error) return [];
    return (data || []).map(toCollege);
}

// Colleges for the homepage "Top Colleges / Universities" filterable directory.
// All filtering happens client-side, so we hand over a generous slice ordered
// by placement strength. Managed entirely from the admin Colleges panel.
export async function getDirectoryColleges() {
    const { data, error } = await supabase
        .from('colleges')
        .select('*')
        .order('highest_package', { ascending: false, nullsFirst: false })
        .limit(60);
    if (error) return [];
    return (data || []).map(toCollege).filter((c): c is NonNullable<typeof c> => c !== null);
}

export async function getUniqueStates() {
    const { data, error } = await supabase.from('colleges').select('state');
    if (error || !data) return [];
    return [...new Set(data.map((row: any) => row.state).filter(Boolean))].sort();
}

export async function getRecentExams() {
    const { data, error } = await supabase
        .from('exams')
        .select('*')
        .order('date', { ascending: true })
        .limit(3);
    if (error) return [];
    return (data || []).map(toExam);
}

export async function getRecentBlogs() {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
    if (error) return [];
    return (data || []).map(toBlog);
}

export async function getUniqueCourses() {
    const { data, error } = await supabase.from('colleges').select('courses');
    if (error || !data) return [];
    const allCourses = data.flatMap((row: any) => row.courses || []);
    return [...new Set(allCourses)].sort();
}

export async function getServices() {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true })
        .order('created_at', { ascending: false });
    if (error) return [];
    return (data || []).map(toService);
}

export async function getServiceBySlug(slug: string) {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();
    if (error || !data) return null;
    return toService(data);
}

export async function createLead(formData: FormData) {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('mobile') as string;
    const message = formData.get('message') as string;
    const source = (formData.get('source') as string) || 'Contact Page';
    const interestedCourse = (formData.get('interestedCourse') as string) || 'General';

    const name = `${firstName} ${lastName}`.trim();

    if (!firstName || !email || !phone) {
        return { success: false, error: 'Name, Email and Phone are required' };
    }

    const { error } = await supabase.from('leads').insert({
        name,
        email,
        phone,
        message,
        state: 'General',
        interested_course: interestedCourse,
        source,
    });

    if (error) {
        console.error('Error creating lead:', error);
        return { success: false, error: 'Failed to submit form' };
    }
    return { success: true };
}
