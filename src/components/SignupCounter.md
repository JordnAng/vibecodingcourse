# SignupCounter Component

A real-time counter component that displays the number of signups from Supabase with smooth animations, real-time updates, and comprehensive error handling.

## Features

- ✅ **Real-time Updates** via Supabase subscriptions
- ✅ **Smooth Number Animations** with easing functions
- ✅ **Loading States** with skeleton UI
- ✅ **Error Handling** with retry functionality
- ✅ **Configurable Polling** as fallback
- ✅ **Performance Optimized** with proper cleanup
- ✅ **Responsive Design** with TailwindCSS
- ✅ **TypeScript** support with full type safety

## Props Interface

```typescript
interface SignupCounterProps {
  refreshInterval?: number  // Polling interval in ms (default: 30000)
  className?: string        // Additional CSS classes
  onCountUpdate?: (count: number) => void  // Callback when count updates
}
```

## Component States

### 1. Loading State
- Shows skeleton animation while fetching initial data
- Gray placeholder bars with pulse animation

### 2. Error State
- Displays error message with retry button
- Shows alert icon and retry functionality
- Handles network and database errors gracefully

### 3. Success State
- Displays formatted count with smooth animations
- Real-time updates when new signups occur
- Responsive text sizing

### 4. Updating State
- Shows "Updating..." indicator during refresh
- Spinner animation for retry operations

## Real-time Implementation

### Supabase Subscription
```typescript
// Subscribe to changes in the early_signups table
subscriptionRef.current = supabase
  .channel('signup-counter')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'early_signups'
    },
    () => {
      // Fetch updated count when table changes
      fetchCount()
    }
  )
  .subscribe()
```

### Polling Fallback
- Configurable interval (default: 30 seconds)
- Ensures updates even if real-time fails
- Proper cleanup on component unmount

## Animation System

### Smooth Number Transitions
```typescript
const animateCount = useCallback((from: number, to: number) => {
  const startTime = performance.now()
  const duration = 1000 // 1 second animation
  const difference = to - from

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    const currentValue = Math.round(from + (difference * easeOutQuart))
    
    setDisplayCount(currentValue)
    
    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate)
    }
  }

  animationRef.current = requestAnimationFrame(animate)
}, [])
```

### Animation Features
- **Duration**: 1 second smooth transition
- **Easing**: Ease-out quartic function for natural feel
- **Performance**: Uses requestAnimationFrame for 60fps
- **Cleanup**: Properly cancels animations on unmount

## Database Integration

### Uses Existing Functions
- Leverages `getSignupCount()` from `@/lib/database`
- Compatible with existing Supabase setup
- Handles API responses and error states

### Error Handling
```typescript
try {
  const result = await getSignupCount()
  
  if (result.success && typeof result.data === 'number') {
    // Handle success
    setCount(result.data)
    animateCount(count, result.data)
  } else {
    throw new Error(result.error || 'Failed to fetch signup count')
  }
} catch (err) {
  // Handle errors gracefully
  setError(err instanceof Error ? err.message : 'An unexpected error occurred')
}
```

## Performance Optimizations

### Memory Management
- Proper cleanup of intervals and subscriptions
- Cancellation of animation frames
- Efficient re-renders with useCallback

### Debounced Updates
- Prevents excessive API calls
- Smooth animations without flickering
- Optimized for real-time scenarios

## Usage Examples

### Basic Usage
```tsx
import SignupCounter from '@/components/SignupCounter'

export default function MyPage() {
  return (
    <div>
      <h1>Join Our Course</h1>
      <SignupCounter />
    </div>
  )
}
```

### With Custom Configuration
```tsx
import SignupCounter from '@/components/SignupCounter'

export default function MyPage() {
  const handleCountUpdate = (count: number) => {
    console.log('Signup count updated:', count)
    // Handle analytics, notifications, etc.
  }

  return (
    <SignupCounter
      refreshInterval={10000} // 10 seconds
      onCountUpdate={handleCountUpdate}
      className="text-center text-lg"
    />
  )
}
```

### With Error Handling
```tsx
import SignupCounter from '@/components/SignupCounter'

export default function MyPage() {
  return (
    <div>
      <SignupCounter />
      {/* Component handles its own errors with retry functionality */}
    </div>
  )
}
```

## Styling

### Design System
- **Text Color**: Gray (#6B7280) for main text
- **Accent Color**: Darker gray (#374151) for numbers
- **Error Color**: Red (#EF4444) for error states
- **Loading**: Gray skeleton with pulse animation

### Responsive Design
```css
/* Mobile */
.text-sm

/* Desktop */
.sm:text-base
```

### Custom Styling
```tsx
<SignupCounter 
  className="text-center text-xl font-bold text-blue-600"
/>
```

## Integration with SignupForm

### Real-time Updates
When a user submits the SignupForm, the SignupCounter will automatically update via:
1. Supabase real-time subscription (immediate)
2. Polling fallback (within refresh interval)

### Example Integration
```tsx
import SignupForm from '@/components/SignupForm'
import SignupCounter from '@/components/SignupCounter'

export default function LandingPage() {
  return (
    <div>
      <h1>Vibe Coding Course</h1>
      <SignupCounter />
      <SignupForm />
    </div>
  )
}
```

## Testing

### Demo Component
Use `SignupCounterDemo` to test all features:

```tsx
import SignupCounterDemo from '@/components/SignupCounterDemo'

export default function TestPage() {
  return <SignupCounterDemo />
}
```

### Test Scenarios
1. **Initial Load**: Shows loading skeleton
2. **Success State**: Displays count with animation
3. **Real-time Updates**: Test with new signup submissions
4. **Error Handling**: Disconnect network to test error state
5. **Retry Functionality**: Click retry button in error state
6. **Polling**: Adjust refresh interval in demo

## Environment Requirements

### Supabase Setup
- `NEXT_PUBLIC_SUPABASE_URL` environment variable
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variable
- `get_signup_count` database function
- Real-time enabled on `early_signups` table

### Database Function
The component relies on the `get_signup_count` Supabase function:

```sql
CREATE OR REPLACE FUNCTION get_signup_count()
RETURNS integer
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN (SELECT COUNT(*) FROM early_signups);
END;
$$;
```

## Troubleshooting

### Common Issues

1. **No Real-time Updates**
   - Check Supabase real-time is enabled
   - Verify table permissions
   - Check network connectivity

2. **Animation Not Working**
   - Ensure browser supports requestAnimationFrame
   - Check for JavaScript errors in console

3. **Error State Persists**
   - Verify database function exists
   - Check Supabase credentials
   - Test network connectivity

### Debug Mode
Add console logs to track component behavior:

```tsx
<SignupCounter 
  onCountUpdate={(count) => {
    console.log('Count updated:', count)
  }}
/>
``` 