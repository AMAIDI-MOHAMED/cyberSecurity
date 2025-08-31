# Contact Form Setup with Supabase

This guide explains how to set up the contact form integration with Supabase.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new account if you don't have one
2. Create a new project
3. Wait for the project to be set up

## 2. Create the Contact Submissions Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create the contact_submissions table
CREATE TABLE contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company_name TEXT,
    phone_number TEXT,
    service_of_interest TEXT,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster queries
CREATE INDEX idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);

-- Add RLS (Row Level Security) policy
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserting new submissions (for the contact form)
CREATE POLICY "Allow public insert" ON contact_submissions
    FOR INSERT
    WITH CHECK (true);

-- Create a policy for reading submissions (you can restrict this to authenticated users later)
CREATE POLICY "Allow authenticated read" ON contact_submissions
    FOR SELECT
    USING (auth.role() = 'authenticated');
```

## 3. Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Click on "Settings" in the sidebar
3. Click on "API" 
4. Copy the following values:
   - **Project URL** (something like `https://your-project-id.supabase.co`)
   - **anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 4. Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values:

```bash
PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 5. Optional: Set Up Email Notifications

You can set up email notifications when new contact form submissions are received:

1. Go to Database → Functions in your Supabase dashboard
2. Create a new function with this code:

```sql
CREATE OR REPLACE FUNCTION notify_new_contact_submission()
RETURNS TRIGGER AS $$
BEGIN
    -- You can integrate with email services here
    -- For example, using Supabase Edge Functions or webhooks
    PERFORM pg_notify('new_contact_submission', 
        json_build_object(
            'id', NEW.id,
            'name', NEW.full_name,
            'email', NEW.email,
            'submitted_at', NEW.submitted_at
        )::text
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER on_contact_submission_created
    AFTER INSERT ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION notify_new_contact_submission();
```

## 6. View Contact Submissions

You can view contact submissions in your Supabase dashboard:

1. Go to "Table Editor"
2. Select the `contact_submissions` table
3. View and manage submissions

## 7. Security Notes

- The current setup allows anyone to submit the contact form (which is intended)
- Only authenticated users can read submissions (you'll need to set up authentication to view them)
- Consider adding rate limiting to prevent spam
- The anon key is safe to use in client-side code as it only allows the operations you've explicitly permitted

## 8. Testing the Setup

1. Make sure your environment variables are set correctly
2. Start your development server: `npm run dev`
3. Go to the contact page and submit a test form
4. Check your Supabase table to see if the submission was recorded

## Form Fields

The contact form captures:
- **full_name** (required): User's full name
- **email** (required): User's email address
- **company_name** (optional): Company name
- **phone_number** (optional): Phone number
- **service_of_interest** (optional): Selected service from dropdown
- **message** (required): User's message
- **submitted_at**: Automatic timestamp
- **status**: Defaults to 'new'
