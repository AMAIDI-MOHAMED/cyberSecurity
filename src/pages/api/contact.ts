import type { APIRoute } from "astro";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, company, phone, service, message } = data;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields: name, email, and message are required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid email format'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Insert contact form submission into Supabase
    const { data: insertData, error: insertError } = await supabase
      .from('contact_submissions')
      .insert([
        {
          full_name: name,
          email: email,
          company_name: company || null,
          phone_number: phone || null,
          service_of_interest: service || null,
          message: message,
          submitted_at: new Date().toISOString(),
          status: 'new'
        }
      ])
      .select();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Failed to submit contact form'
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
        message: 'Contact form submitted successfully',
        data: insertData
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);
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
