
  # EXCHKR beta (Copy)

  This is a code bundle for EXCHKR beta (Copy). The original project is available at https://www.figma.com/design/FesBG50rfmsE2MQeaWjAoJ/EXCHKR-beta--Copy-.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Waitlist Database Setup

  The waitlist feature saves all entries to a single Excel file called "UserWaitlist.xlsx". This requires a Supabase database.

  1. Create a Supabase project at https://supabase.com
  2. Create a table named `waitlist_entries` with the following columns:
     - `id` (uuid, primary key, default: `uuid_generate_v4()`)
     - `created_at` (timestamp with time zone, default: `now()`)
     - `name` (text)
     - `email` (text)
     - `club_name` (text)
     - `university` (text)
     - `role` (text)
     - `org_type` (text)
  3. Enable Row Level Security (RLS) and create policies to allow:
     - INSERT for anonymous users (so anyone can submit)
     - SELECT for anonymous users (so anyone can download)
  4. Copy `env.example` to `.env` and add your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your-project-url
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```
  5. Restart the dev server after adding environment variables

  ### How it works:
  - When someone fills out the form and clicks "Join the Waitlist", their entry is saved to the database
  - The system automatically downloads "UserWaitlist.xlsx" containing ALL entries (including the new one)
  - Every user downloads the same file with all previous entries plus their own
  - The file is always named "UserWaitlist.xlsx" for consistency
  