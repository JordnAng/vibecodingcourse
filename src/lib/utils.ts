import { z } from 'zod'
import type { ApiResponse } from '@/types'

// Utility functions
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function formatDuration(duration: string): string {
  return duration
}

// Form submission utilities
export async function submitForm<T>(
  url: string,
  data: T,
  options?: RequestInit
): Promise<ApiResponse> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      ...options,
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Something went wrong',
      }
    }

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    }
  }
}

// Error handling helpers
export function handleFormError(error: unknown): string {
  if (error instanceof z.ZodError) {
    return error.issues[0]?.message || 'Validation error'
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  return 'An unexpected error occurred'
}

export function createApiResponse<T>(
  success: boolean,
  data?: T,
  error?: string,
  message?: string
): ApiResponse<T> {
  return {
    success,
    data,
    error,
    message,
  }
}

// Validation helpers (keeping existing ones for backward compatibility)
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const newsletterFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

// Type exports for backward compatibility
export type ContactFormData = z.infer<typeof contactFormSchema>
export type NewsletterFormData = z.infer<typeof newsletterFormSchema> 