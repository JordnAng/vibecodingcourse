'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupFormSchema, type SignupFormData } from '@/lib/validations'
import { submitSignup } from '@/lib/database'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface SignupFormProps {
  onSuccess?: (data: SignupFormData) => void
  className?: string
  disabled?: boolean
}

export default function SignupForm({ 
  onSuccess, 
  className = '', 
  disabled = false 
}: SignupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      subscription: false
    }
  })

  const watchedSubscription = watch('subscription')

  const onSubmit = async (data: SignupFormData) => {
    if (disabled || isSubmitting) return

    setIsSubmitting(true)
    setError(null)
    
    try {
      // Submit to database with proper type handling
      const formData = {
        name: data.name,
        email: data.email,
        subscription: data.subscription ?? false
      }
      const result = await submitSignup(formData as SignupFormData)
      
      if (result.success) {
        setIsSuccess(true)
        onSuccess?.(data)
        
        // Clear form on success
        reset()
        
        // Reset success state after delay
        setTimeout(() => {
          setIsSuccess(false)
        }, 3000)
      } else {
        // Handle submission error
        setError(result.error || 'Failed to submit signup')
        console.error('Form submission error:', result.error)
      }
      
    } catch (error) {
      // Handle unexpected errors
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      setError(errorMessage)
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}>
        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Successfully Signed Up!
        </h3>
        <p className="text-green-700">
          Thank you for joining the Vibe Coding Course. We'll be in touch soon!
        </p>
      </div>
    )
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className={`bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4 ${className}`}
      noValidate
    >
      {/* Name Field */}
      <div>
        <label 
          htmlFor="name" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Full Name
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          placeholder="Your full name"
          disabled={disabled || isSubmitting}
          className={`
            w-full px-3 py-2 border rounded-md text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${errors.name 
              ? 'border-red-300 focus:ring-red-500' 
              : 'border-gray-300 hover:border-gray-400'
            }
          `}
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && (
          <p 
            id="name-error" 
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          placeholder="your@email.com"
          disabled={disabled || isSubmitting}
          className={`
            w-full px-3 py-2 border rounded-md text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${errors.email 
              ? 'border-red-300 focus:ring-red-500' 
              : 'border-gray-300 hover:border-gray-400'
            }
          `}
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && (
          <p 
            id="email-error" 
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subscription Checkbox */}
      <div className="flex items-start space-x-3">
        <input
          {...register('subscription')}
          type="checkbox"
          id="subscription"
          disabled={disabled || isSubmitting}
          className={`
            mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded
            focus:ring-blue-500 focus:ring-2
            disabled:bg-gray-100 disabled:cursor-not-allowed
          `}
          aria-describedby="subscription-description"
        />
        <div className="flex-1">
          <label 
            htmlFor="subscription" 
            className="text-sm text-gray-700 cursor-pointer"
          >
            Subscribe for course updates, early access, and development tips
          </label>
          <p 
            id="subscription-description" 
            className="text-xs text-gray-500 mt-1"
          >
            Get notified about new lessons, exclusive content, and coding tips
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={disabled || isSubmitting || !isValid}
        className={`
          w-full py-3 px-4 rounded-md text-sm font-medium text-white
          transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${isSubmitting 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800'
          }
        `}
        aria-describedby={isSubmitting ? 'submitting-status' : undefined}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </span>
        ) : (
          'Get Early Access'
        )}
      </button>

      {isSubmitting && (
        <p 
          id="submitting-status" 
          className="text-sm text-gray-600 text-center"
          role="status"
          aria-live="polite"
        >
          Submitting your information...
        </p>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Form Status Messages */}
      <div className="text-xs text-gray-500 text-center">
        <p>We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </form>
  )
} 