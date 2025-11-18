# Supabase Setup Guide

Follow these steps to set up Supabase for the waitlist feature:

## Step 1: Create a Supabase Account and Project

1. Go to https://supabase.com
2. Click "Start your project" or "Sign up"
3. Sign up with GitHub, Google, or email
4. Once logged in, click "New Project"
5. Fill in:
   - **Project Name**: EXCHKR Waitlist (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
6. Click "Create new project"
7. Wait 2-3 minutes for the project to be created

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, click on the "Settings" icon (gear icon) in the left sidebar
2. Click on "API" in the settings menu
3. You'll see two important values:
   - **Project URL** - This is your `VITE_SUPABASE_URL`
   - **anon public** key - This is your `VITE_SUPABASE_ANON_KEY`

## Step 3: Create the Database Table

1. In your Supabase dashboard, click on "Table Editor" in the left sidebar
2. Click "Create a new table"
3. Name the table: `waitlist_entries`
4. Add the following columns (click "Add Column" for each):

   | Column Name | Type | Default Value | Nullable |
   |------------|------|---------------|----------|
   | id | uuid | `uuid_generate_v4()` | No (Primary Key) |
   | created_at | timestamptz | `now()` | No |
   | name | text | - | No |
   | email | text | - | No |
   | club_name | text | - | No |
   | university | text | - | No |
   | role | text | - | No |
   | org_type | text | - | No |

5. Make sure `id` is set as the Primary Key
6. Click "Save" to create the table

## Step 4: Set Up Row Level Security (RLS)

1. In the Table Editor, click on your `waitlist_entries` table
2. Click on the "Policies" tab
3. Click "New Policy"
4. For the INSERT policy:
   - Name: `Allow anonymous inserts`
   - Allowed operation: `INSERT`
   - Target roles: `anon`
   - Policy definition: `true` (allows all inserts)
   - Click "Review" then "Save policy"
5. Click "New Policy" again
6. For the SELECT policy:
   - Name: `Allow anonymous selects`
   - Allowed operation: `SELECT`
   - Target roles: `anon`
   - Policy definition: `true` (allows all selects)
   - Click "Review" then "Save policy"

## Step 5: Update Your .env File

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
   ```
3. Save the file

## Step 6: Restart Your Dev Server

1. Stop your current dev server (Ctrl+C in the terminal)
2. Start it again:
   ```bash
   npm run dev
   ```

## Testing

1. Open your website in the browser
2. Fill out the waitlist form
3. Click "Join the Waitlist"
4. You should see a success message and "UserWaitlist.xlsx" should download
5. Open the Excel file to verify your entry is there

## Troubleshooting

- **Error: "Supabase is not configured"**: Make sure your `.env` file has the correct values and you've restarted the dev server
- **Error: "relation 'waitlist_entries' does not exist"**: Make sure you created the table with the exact name `waitlist_entries`
- **Error: "new row violates row-level security policy"**: Make sure you've created the RLS policies for INSERT and SELECT

