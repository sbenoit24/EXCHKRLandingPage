import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment variables are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
  )
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

/**
 * Fetches ALL waitlist entries from Supabase using pagination.
 * This ensures we get every single entry, not just the first 1000.
 */
export async function fetchAllWaitlistEntries() {
  const allEntries: any[] = []
  let from = 0
  const pageSize = 1000 // Supabase default limit
  let hasMore = true

  while (hasMore) {
    const { data, error } = await supabase
      .from('waitlist_entries')
      .select('name, email, club_name, university, role, org_type, created_at')
      .order('created_at', { ascending: true })
      .range(from, from + pageSize - 1)

    if (error) {
      throw error
    }

    if (data && data.length > 0) {
      allEntries.push(...data)
      from += pageSize
      hasMore = data.length === pageSize // If we got a full page, there might be more
    } else {
      hasMore = false
    }
  }

  return allEntries
}

