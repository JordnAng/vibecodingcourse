import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types'

// Lazy initialization to avoid build-time errors
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null

const getSupabaseClient = () => {
  if (supabaseInstance) {
    return supabaseInstance
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // During build time, return a mock client that throws when used
    const mockClient = {
      from: () => ({
        insert: () => Promise.reject(new Error('Supabase not configured')),
        select: () => Promise.reject(new Error('Supabase not configured')),
        rpc: () => Promise.reject(new Error('Supabase not configured'))
      }),
      channel: () => ({
        on: () => ({
          subscribe: () => Promise.reject(new Error('Supabase not configured'))
        })
      }),
      removeChannel: () => {}
    } as any
    
    return mockClient
  }

  supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })

  return supabaseInstance
}

// Export the lazy-loaded client
export const supabase = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get(target, prop) {
    const client = getSupabaseClient()
    return client[prop as keyof typeof client]
  }
})

// Export createClient function for custom instances
export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }
  
  return createClient<Database>(supabaseUrl, supabaseAnonKey)
} 