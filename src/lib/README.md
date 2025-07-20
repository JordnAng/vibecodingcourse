# Database Functions Documentation

This directory contains the database-related functions for the Vibe Coding Course landing page. These functions provide a clean, type-safe interface for interacting with Supabase.

## Files

- `database.ts` - Core database functions for signup operations
- `form-submission.ts` - Enhanced form submission utilities with validation
- `supabase.ts` - Supabase client configuration
- `database.test.ts` - Example usage and testing patterns

## Core Functions

### `submitSignup(formData: SignupFormData)`

Submits a new signup to the `early_signups` table.

**Parameters:**
- `formData`: Object containing `name`, `email`, and `subscription` fields

**Returns:** `Promise<ApiResponse<EarlySignup>>`

**Example:**
```typescript
import { submitSignup } from '@/lib/database'

const result = await submitSignup({
  name: 'John Doe',
  email: 'john@example.com',
  subscription: true
})

if (result.success) {
  console.log('Signup successful:', result.data)
} else {
  console.log('Error:', result.error)
}
```

### `getSignupCount()`

Fetches the total number of signups using the `get_signup_count()` Supabase function.

**Returns:** `Promise<ApiResponse<number>>`

**Example:**
```typescript
import { getSignupCount } from '@/lib/database'

const result = await getSignupCount()
if (result.success) {
  console.log('Total signups:', result.data)
}
```

### `getSignupCountCached(cacheTime?: number)`

Fetches signup count with in-memory caching for better performance.

**Parameters:**
- `cacheTime`: Cache duration in milliseconds (default: 5 minutes)

**Returns:** `Promise<ApiResponse<number>>`

**Example:**
```typescript
import { getSignupCountCached } from '@/lib/database'

// Use default 5-minute cache
const result = await getSignupCountCached()

// Use custom 10-minute cache
const result = await getSignupCountCached(10 * 60 * 1000)
```

### `getAllSignups(limit?: number)`

Retrieves all signups for admin purposes.

**Parameters:**
- `limit`: Maximum number of records to return (default: 100)

**Returns:** `Promise<ApiResponse<EarlySignup[]>>`

**Example:**
```typescript
import { getAllSignups } from '@/lib/database'

// Get last 10 signups
const result = await getAllSignups(10)
if (result.success) {
  result.data?.forEach(signup => {
    console.log(`${signup.full_name}: ${signup.email}`)
  })
}
```

## Form Submission Utilities

### `handleSignupSubmission(formData, onStateChange?)`

Enhanced form submission with loading state management.

**Parameters:**
- `formData`: Signup form data
- `onStateChange`: Optional callback for state changes

**Returns:** `Promise<ApiResponse<EarlySignup>>`

**Example:**
```typescript
import { handleSignupSubmission } from '@/lib/form-submission'

const result = await handleSignupSubmission(
  formData,
  (state, message) => {
    switch (state) {
      case 'submitting':
        setLoading(true)
        break
      case 'success':
        setLoading(false)
        showSuccess(message)
        break
      case 'error':
        setLoading(false)
        showError(message)
        break
    }
  }
)
```

### `validateSignupForm(formData)`

Validates signup form data before submission.

**Parameters:**
- `formData`: Form data to validate

**Returns:** `{ isValid: boolean, errors: string[] }`

**Example:**
```typescript
import { validateSignupForm } from '@/lib/form-submission'

const validation = validateSignupForm(formData)
if (!validation.isValid) {
  console.log('Validation errors:', validation.errors)
}
```

### `getSignupCountWithRetry(maxRetries?, useCache?)`

Fetches signup count with automatic retry on failure.

**Parameters:**
- `maxRetries`: Maximum retry attempts (default: 3)
- `useCache`: Whether to use cached version (default: true)

**Returns:** `Promise<ApiResponse<number>>`

**Example:**
```typescript
import { getSignupCountWithRetry } from '@/lib/form-submission'

const result = await getSignupCountWithRetry(5, false)
```

## Error Handling

All functions return a consistent `ApiResponse<T>` type with the following structure:

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
```

### Common Error Types

1. **Validation Errors**
   - Missing required fields
   - Invalid email format
   - Name length constraints

2. **Database Errors**
   - Duplicate email (code: '23505')
   - Network connectivity issues
   - Server errors

3. **Network Errors**
   - Connection timeouts
   - Fetch failures
   - CORS issues

## Caching

The `getSignupCountCached` function provides in-memory caching to reduce database calls:

- Default cache duration: 5 minutes
- Cache is automatically cleared when new signups are submitted
- Manual cache clearing available via `clearSignupCountCache()`

## TypeScript Support

All functions are fully typed with TypeScript:

```typescript
import type { 
  SignupFormData, 
  ApiResponse, 
  EarlySignup 
} from '@/types'
```

## Environment Variables

Ensure these environment variables are set:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Schema

The functions work with the following Supabase table structure:

```sql
CREATE TABLE early_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  subscribed_to_updates BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to get signup count
CREATE OR REPLACE FUNCTION get_signup_count()
RETURNS INTEGER
LANGUAGE SQL
AS $$
  SELECT COUNT(*) FROM early_signups;
$$;
```

## Testing

See `database.test.ts` for example usage patterns and testing approaches.

## Best Practices

1. **Always handle errors**: Check the `success` property before accessing `data`
2. **Use caching**: Use `getSignupCountCached` for better performance
3. **Validate input**: Use `validateSignupForm` before submission
4. **Clear cache**: Call `clearSignupCountCache` after successful submissions
5. **Type safety**: Use TypeScript interfaces for all data structures 