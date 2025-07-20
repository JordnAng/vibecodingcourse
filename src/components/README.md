# SignupForm Component

A reusable signup form component for the Vibe Coding Course landing page with React Hook Form, Zod validation, and comprehensive accessibility features.

## Features

- ✅ **React Hook Form** with Zod validation
- ✅ **Real-time validation** with inline error messages
- ✅ **Loading states** with spinner animation
- ✅ **Success state** with auto-reset functionality
- ✅ **Accessibility features** (ARIA labels, roles, focus management)
- ✅ **Responsive design** with TailwindCSS
- ✅ **Disabled state** handling
- ✅ **Keyboard navigation** support
- ✅ **TypeScript** support with full type safety

## Props Interface

```typescript
interface SignupFormProps {
  onSuccess?: (data: SignupFormData) => void
  className?: string
  disabled?: boolean
}
```

### Props Description

- `onSuccess`: Callback function called when form is successfully submitted
- `className`: Additional CSS classes for custom styling
- `disabled`: Disables the entire form when true

## Form Fields

1. **Name Input** (required)
   - Minimum 2 characters
   - Maximum 50 characters
   - Placeholder: "Your full name"

2. **Email Input** (required)
   - Valid email format validation
   - Placeholder: "your@email.com"

3. **Subscription Checkbox** (optional)
   - Boolean field for course updates
   - Default: false

4. **Submit Button**
   - Text: "Get Early Access"
   - Shows loading spinner during submission

## Validation Rules

The form uses the existing `signupFormSchema` from `@/lib/validations`:

```typescript
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
```

## Usage Examples

### Basic Usage

```tsx
import SignupForm from '@/components/SignupForm'

export default function MyPage() {
  return (
    <div>
      <h1>Join Our Course</h1>
      <SignupForm />
    </div>
  )
}
```

### With Success Callback

```tsx
import SignupForm from '@/components/SignupForm'
import type { SignupFormData } from '@/lib/validations'

export default function MyPage() {
  const handleSuccess = (data: SignupFormData) => {
    console.log('User signed up:', data)
    // Handle success (e.g., analytics, redirect, etc.)
  }

  return (
    <SignupForm onSuccess={handleSuccess} />
  )
}
```

### With Custom Styling

```tsx
import SignupForm from '@/components/SignupForm'

export default function MyPage() {
  return (
    <SignupForm 
      className="max-w-lg mx-auto shadow-xl"
    />
  )
}
```

### Disabled State

```tsx
import SignupForm from '@/components/SignupForm'

export default function MyPage() {
  const [isDisabled, setIsDisabled] = useState(false)

  return (
    <SignupForm 
      disabled={isDisabled}
      onSuccess={() => setIsDisabled(true)}
    />
  )
}
```

## Styling

The component uses TailwindCSS with the following design system:

- **Form background**: `bg-gray-50`
- **Input borders**: `border-gray-300` (normal), `border-red-300` (error)
- **Focus states**: Blue ring (`focus:ring-blue-500`)
- **Button**: Blue gradient with hover states
- **Error messages**: Red text (`text-red-600`)
- **Success state**: Green background with checkmark icon

## Accessibility Features

- **ARIA labels** for all form controls
- **Error associations** with `aria-describedby`
- **Invalid state** indicators with `aria-invalid`
- **Loading status** announcements with `aria-live`
- **Focus management** during form states
- **Keyboard navigation** support
- **Screen reader** friendly error messages

## Form States

1. **Default State**: Empty form with validation
2. **Loading State**: Spinner animation, disabled inputs
3. **Success State**: Green success message, auto-reset after 3 seconds
4. **Error State**: Inline validation errors, form remains interactive
5. **Disabled State**: All inputs and button disabled

## Integration Notes

- Currently uses simulated API call (1.5s delay)
- Replace the `onSubmit` function with actual database integration
- Form data matches the `EarlySignup` database schema
- Compatible with existing Supabase setup

## Testing

Use the `SignupFormDemo` component to test all features:

```tsx
import SignupFormDemo from '@/components/SignupFormDemo'

export default function TestPage() {
  return <SignupFormDemo />
}
``` 