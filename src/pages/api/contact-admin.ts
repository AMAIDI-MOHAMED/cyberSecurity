import type { APIRoute } from "astro";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const GET: APIRoute = async ({ request }) => {
  try {
    // In a real application, you'd want to add authentication here
    // For now, this is a simple demonstration
    
    // Fetch contact submissions from Supabase
    const { data: submissions, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('submitted_at', { ascending: false })
      .limit(100); // Limit to recent 100 submissions

    if (error) {
      console.error('Supabase fetch error:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to fetch contact submissions'
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: submissions || []
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Contact submissions fetch error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
