import { z } from 'zod'

// Signup form validation schema
export const signupFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
    .trim()
    .toLowerCase(),
  subscription: z
    .boolean()
    .default(false)
    .optional(),
})

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
    .trim()
    .toLowerCase(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .trim(),
})

// Newsletter form validation schema
export const newsletterFormSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
    .trim()
    .toLowerCase(),
})

// Type exports
export type SignupFormData = z.infer<typeof signupFormSchema>
export type ContactFormData = z.infer<typeof contactFormSchema>
export type NewsletterFormData = z.infer<typeof newsletterFormSchema>

// Validation helper functions
export const validateEmail = (email: string): boolean => {
  return newsletterFormSchema.shape.email.safeParse(email).success
}

export const validateName = (name: string): boolean => {
  return signupFormSchema.shape.name.safeParse(name).success
} 