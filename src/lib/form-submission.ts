import { submitSignup, getSignupCount, getSignupCountCached, clearSignupCountCache } from './database'
import type { SignupFormData, ApiResponse, EarlySignup } from '@/types'

/**
 * Form submission states for UI feedback
 */
export type FormSubmissionState = 
  | 'idle'
  | 'submitting'
  | 'success'
  | 'error'

/**
 * Enhanced form submission with loading state management
 * @param formData - The signup form data
 * @param onStateChange - Callback for state changes
 * @returns Promise<ApiResponse<EarlySignup>> - Final result
 */
export async function handleSignupSubmission(
  formData: SignupFormData,
  onStateChange?: (state: FormSubmissionState, message?: string) => void
): Promise<ApiResponse<EarlySignup>> {
  try {
    // Set submitting state
    onStateChange?.('submitting', 'Submitting your signup...')

    // Submit the form data
    const result = await submitSignup(formData)

    if (result.success) {
      // Clear cache to ensure fresh count
      clearSignupCountCache()
      
      // Set success state
      onStateChange?.('success', result.message || 'Signup submitted successfully!')
    } else {
      // Set error state
      onStateChange?.('error', result.error || 'Failed to submit signup')
    }

    return result

  } catch (error) {
    console.error('Form submission error:', error)
    
    const errorMessage = 'An unexpected error occurred. Please try again.'
    onStateChange?.('error', errorMessage)
    
    return {
      success: false,
      error: errorMessage
    }
  }
}

/**
 * Validate signup form data before submission
 * @param formData - The form data to validate
 * @returns Validation result with errors if any
 */
export function validateSignupForm(formData: SignupFormData): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // Validate name
  if (!formData.name?.trim()) {
    errors.push('Name is required')
  } else if (formData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long')
  } else if (formData.name.trim().length > 100) {
    errors.push('Name must be less than 100 characters')
  }

  // Validate email
  if (!formData.email?.trim()) {
    errors.push('Email is required')
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      errors.push('Please enter a valid email address')
    }
  }

  // Validate subscription (optional boolean)
  if (typeof formData.subscription !== 'boolean') {
    errors.push('Invalid subscription preference')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Get signup count with automatic retry on failure
 * @param maxRetries - Maximum number of retry attempts (default: 3)
 * @param useCache - Whether to use cached version (default: true)
 * @returns Promise<ApiResponse<number>> - Signup count result
 */
export async function getSignupCountWithRetry(
  maxRetries: number = 3,
  useCache: boolean = true
): Promise<ApiResponse<number>> {
  let lastError: string | undefined

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = useCache 
        ? await getSignupCountCached()
        : await getSignupCount()

      if (result.success) {
        return result
      }

      lastError = result.error

      // Don't retry on validation errors
      if (result.error?.includes('Invalid signup count')) {
        break
      }

      // Wait before retry (exponential backoff)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
      }

    } catch (error) {
      lastError = 'Network error'
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
      }
    }
  }

  return {
    success: false,
    error: lastError || 'Failed to fetch signup count after multiple attempts'
  }
}

/**
 * Format signup count for display
 * @param count - The raw count number
 * @returns Formatted string (e.g., "1,234" or "1.2K")
 */
export function formatSignupCount(count: number): string {
  if (count < 1000) {
    return count.toString()
  } else if (count < 10000) {
    return (count / 1000).toFixed(1) + 'K'
  } else {
    return Math.floor(count / 1000) + 'K'
  }
}

/**
 * Debounce function for form inputs
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for API calls
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Re-export database functions for convenience
export { submitSignup, getSignupCount, getSignupCountCached, clearSignupCountCache } from './database' 