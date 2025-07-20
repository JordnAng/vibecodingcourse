/**
 * Database functions test examples
 * This file demonstrates how to use the database functions
 * Note: These are examples and should be run in a proper test environment
 */

import { 
  submitSignup, 
  getSignupCount, 
  getSignupCountCached, 
  getAllSignups,
  clearSignupCountCache 
} from './database'
import type { SignupFormData } from '@/types'

// Example usage functions (not actual tests)
export async function exampleUsage() {
  console.log('=== Database Functions Examples ===')

  // Example 1: Submit a signup
  const signupData: SignupFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    subscription: true
  }

  console.log('1. Submitting signup...')
  const signupResult = await submitSignup(signupData)
  
  if (signupResult.success) {
    console.log('✅ Signup successful:', signupResult.data)
  } else {
    console.log('❌ Signup failed:', signupResult.error)
  }

  // Example 2: Get signup count
  console.log('\n2. Getting signup count...')
  const countResult = await getSignupCount()
  
  if (countResult.success) {
    console.log('✅ Signup count:', countResult.data)
  } else {
    console.log('❌ Failed to get count:', countResult.error)
  }

  // Example 3: Get cached signup count
  console.log('\n3. Getting cached signup count...')
  const cachedCountResult = await getSignupCountCached()
  
  if (cachedCountResult.success) {
    console.log('✅ Cached signup count:', cachedCountResult.data)
  } else {
    console.log('❌ Failed to get cached count:', cachedCountResult.error)
  }

  // Example 4: Get all signups (limited)
  console.log('\n4. Getting recent signups...')
  const allSignupsResult = await getAllSignups(5)
  
  if (allSignupsResult.success) {
    console.log('✅ Recent signups:', allSignupsResult.data?.length || 0)
    allSignupsResult.data?.forEach((signup, index) => {
      console.log(`   ${index + 1}. ${signup.full_name} (${signup.email})`)
    })
  } else {
    console.log('❌ Failed to get signups:', allSignupsResult.error)
  }

  // Example 5: Clear cache
  console.log('\n5. Clearing cache...')
  clearSignupCountCache()
  console.log('✅ Cache cleared')
}

// Example error handling
export async function exampleErrorHandling() {
  console.log('\n=== Error Handling Examples ===')

  // Example: Duplicate email
  const duplicateData: SignupFormData = {
    name: 'Jane Doe',
    email: 'john@example.com', // Same email as above
    subscription: false
  }

  console.log('1. Testing duplicate email...')
  const duplicateResult = await submitSignup(duplicateData)
  
  if (!duplicateResult.success) {
    console.log('✅ Correctly handled duplicate email:', duplicateResult.error)
  } else {
    console.log('❌ Should have failed for duplicate email')
  }

  // Example: Invalid email
  const invalidData: SignupFormData = {
    name: 'Test User',
    email: 'invalid-email',
    subscription: true
  }

  console.log('\n2. Testing invalid email...')
  const invalidResult = await submitSignup(invalidData)
  
  if (!invalidResult.success) {
    console.log('✅ Correctly handled invalid email:', invalidResult.error)
  } else {
    console.log('❌ Should have failed for invalid email')
  }

  // Example: Missing required fields
  const missingData: SignupFormData = {
    name: '',
    email: '',
    subscription: false
  }

  console.log('\n3. Testing missing fields...')
  const missingResult = await submitSignup(missingData)
  
  if (!missingResult.success) {
    console.log('✅ Correctly handled missing fields:', missingResult.error)
  } else {
    console.log('❌ Should have failed for missing fields')
  }
}

// Example form validation
export function exampleValidation() {
  console.log('\n=== Validation Examples ===')

  const testCases = [
    { name: 'John', email: 'john@example.com', subscription: true },
    { name: '', email: 'john@example.com', subscription: true },
    { name: 'John', email: 'invalid-email', subscription: true },
    { name: 'John', email: '', subscription: true },
    { name: 'A', email: 'john@example.com', subscription: true }, // Too short
    { name: 'John'.repeat(30), email: 'john@example.com', subscription: true }, // Too long
  ]

  testCases.forEach((testCase, index) => {
    console.log(`\nTest case ${index + 1}:`, testCase)
    
    // Basic validation
    const isValid = testCase.name.trim().length >= 2 && 
                   testCase.name.trim().length <= 100 &&
                   testCase.email.trim() &&
                   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testCase.email.trim())
    
    console.log(isValid ? '✅ Valid' : '❌ Invalid')
  })
}

// Run examples (uncomment to run)
// exampleUsage()
// exampleErrorHandling()
// exampleValidation() 