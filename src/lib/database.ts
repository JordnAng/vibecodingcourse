import { supabase } from './supabase'
import type { 
  SignupFormData, 
  ApiResponse, 
  EarlySignup 
} from '@/types'

/**
 * Submit a new signup to the early_signups table
 * @param formData - The signup form data
 * @returns Promise<ApiResponse> - Success/error response with proper typing
 */
export async function submitSignup(
  formData: SignupFormData
): Promise<ApiResponse<EarlySignup>> {
  try {
    // Validate input data
    if (!formData.name?.trim() || !formData.email?.trim()) {
      return {
        success: false,
        error: 'Name and email are required'
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        error: 'Please enter a valid email address'
      }
    }

    // Prepare data for insertion
    const signupData = {
      full_name: formData.name.trim(),
      email: formData.email.toLowerCase().trim(),
      subscribed_to_updates: formData.subscription || false
    }

    // Insert into early_signups table
    const { data, error } = await supabase
      .from('early_signups')
      .insert(signupData)
      .select()
      .single()

    if (error) {
      // Handle duplicate email error
      if ((error as any).code === '23505' || (error as any).message?.includes('duplicate')) {
        return {
          success: false,
          error: 'This email is already registered. Please use a different email address.'
        }
      }

      // Handle other database errors
      console.error('Database error:', error)
      return {
        success: false,
        error: 'Failed to submit signup. Please try again later.'
      }
    }

    if (!data) {
      return {
        success: false,
        error: 'No data returned from signup submission'
      }
    }

    return {
      success: true,
      data,
      message: 'Signup submitted successfully!'
    }

  } catch (error) {
    // Handle network errors and unexpected exceptions
    console.error('Signup submission error:', error)
    
    if (error instanceof Error) {
      return {
        success: false,
        error: 'Network error. Please check your connection and try again.'
      }
    }

    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.'
    }
  }
}

/**
 * Get the total count of signups using the get_signup_count function
 * @returns Promise<ApiResponse<number>> - Success/error response with count
 */
export async function getSignupCount(): Promise<ApiResponse<number>> {
  try {
    // Call the Supabase function to get signup count
    const { data, error } = await supabase
      .rpc('get_signup_count')

    if (error) {
      console.error('Error fetching signup count:', error)
      return {
        success: false,
        error: 'Failed to fetch signup count'
      }
    }

    // Ensure we have a valid number
    if (typeof data !== 'number' || data < 0) {
      return {
        success: false,
        error: 'Invalid signup count returned'
      }
    }

    return {
      success: true,
      data,
      message: 'Signup count retrieved successfully'
    }

  } catch (error) {
    // Handle network errors and unexpected exceptions
    console.error('Get signup count error:', error)
    
    if (error instanceof Error) {
      return {
        success: false,
        error: 'Network error. Please check your connection and try again.'
      }
    }

    return {
      success: false,
      error: 'An unexpected error occurred while fetching signup count.'
    }
  }
}

/**
 * Get signup count with caching for better performance
 * @param cacheTime - Cache duration in milliseconds (default: 5 minutes)
 * @returns Promise<ApiResponse<number>> - Success/error response with count
 */
let signupCountCache: { count: number; timestamp: number } | null = null
const DEFAULT_CACHE_TIME = 5 * 60 * 1000 // 5 minutes

export async function getSignupCountCached(
  cacheTime: number = DEFAULT_CACHE_TIME
): Promise<ApiResponse<number>> {
  try {
    // Check if we have a valid cached value
    if (signupCountCache && 
        Date.now() - signupCountCache.timestamp < cacheTime) {
      return {
        success: true,
        data: signupCountCache.count,
        message: 'Signup count retrieved from cache'
      }
    }

    // Fetch fresh data
    const result = await getSignupCount()
    
    if (result.success && typeof result.data === 'number') {
      // Update cache
      signupCountCache = {
        count: result.data,
        timestamp: Date.now()
      }
    }

    return result

  } catch (error) {
    console.error('Cached signup count error:', error)
    return {
      success: false,
      error: 'Failed to fetch cached signup count'
    }
  }
}

/**
 * Clear the signup count cache
 * Useful for forcing a fresh fetch
 */
export function clearSignupCountCache(): void {
  signupCountCache = null
}

/**
 * Get all signups (for admin purposes)
 * @param limit - Maximum number of records to return (default: 100)
 * @returns Promise<ApiResponse<EarlySignup[]>> - Success/error response with signups
 */
export async function getAllSignups(
  limit: number = 100
): Promise<ApiResponse<EarlySignup[]>> {
  try {
    const { data, error } = await supabase
      .from('early_signups')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching all signups:', error)
      return {
        success: false,
        error: 'Failed to fetch signups'
      }
    }

    return {
      success: true,
      data: data || [],
      message: `Retrieved ${data?.length || 0} signups`
    }

  } catch (error) {
    console.error('Get all signups error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred while fetching signups.'
    }
  }
} 