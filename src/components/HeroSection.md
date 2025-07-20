# HeroSection Component

A responsive hero section component that combines the SignupForm and SignupCounter in a modern two-column layout with proper typography, spacing, and mobile-responsive design.

## Features

- ✅ **Responsive Two-Column Layout** (60% content, 40% form on desktop)
- ✅ **Mobile-First Design** with stacked layout on smaller screens
- ✅ **Component Integration** with SignupForm and SignupCounter
- ✅ **Real-time Updates** when form is submitted
- ✅ **Modern Typography** with Inter font family
- ✅ **Sticky Form Positioning** on desktop
- ✅ **Trust Indicators** and social proof elements

## Layout Specifications

### Desktop (lg+)
- **Grid System**: 5-column grid (3fr content, 2fr form)
- **Content Column**: Left side with title, description, counter, and benefits
- **Form Column**: Right side with sticky positioning
- **Gap**: 12 units between columns
- **Container**: max-w-7xl with proper padding

### Mobile (< lg)
- **Layout**: Single column stacked
- **Content Order**: Content first, form below
- **Alignment**: Centered content
- **Gap**: 8 units between sections
- **Padding**: Responsive padding for touch devices

## Component Structure

```tsx
<section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
      
      {/* Content Column (60%) */}
      <div className="lg:col-span-3">
        {/* Title, Description, Counter, Benefits */}
      </div>
      
      {/* Form Column (40%) */}
      <div className="lg:col-span-2">
        {/* SignupForm with header and trust indicators */}
      </div>
      
    </div>
  </div>
</section>
```

## Content Elements

### 1. Title Section
```tsx
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
  Vibe Coding Course
</h1>
<p className="text-lg sm:text-xl lg:text-2xl text-gray-600">
  Build and launch your MVP in 30 days...
</p>
```

### 2. Signup Counter
```tsx
<SignupCounter 
  className="text-lg sm:text-xl"
  onCountUpdate={(count) => {
    // Handle counter updates
  }}
/>
```

### 3. Benefits List
- 30-day bootcamp
- Live coding sessions
- Community support
- Lifetime access

### 4. Signup Form
```tsx
<SignupForm
  onSuccess={handleFormSuccess}
  className="space-y-6"
/>
```

### 5. Trust Indicators
- Secure (lock icon)
- No spam (checkmark icon)
- Free (info icon)

## Responsive Design

### Breakpoint System
```css
/* Mobile First */
.text-4xl                    /* Base size */
.sm:text-5xl                /* Small screens (640px+) */
.lg:text-6xl                /* Large screens (1024px+) */

/* Grid Layout */
.grid-cols-1                /* Single column on mobile */
.lg:grid-cols-5             /* 5 columns on desktop */
.lg:col-span-3              /* Content takes 3/5 columns */
.lg:col-span-2              /* Form takes 2/5 columns */
```

### Typography Scale
- **Title**: 4xl → 5xl → 6xl (mobile → tablet → desktop)
- **Description**: lg → xl → 2xl
- **Counter**: lg → xl
- **Form Text**: Base sizes with responsive spacing

## Component Integration

### Form Success Handling
```tsx
const handleFormSuccess = (data: SignupFormData) => {
  setIsFormSubmitted(true)
  console.log('Form submitted successfully:', data)
  
  // Reset after delay to allow counter updates
  setTimeout(() => {
    setIsFormSubmitted(false)
  }, 2000)
}
```

### Counter Updates
```tsx
<SignupCounter 
  onCountUpdate={(count) => {
    if (isFormSubmitted) {
      console.log('Counter updated after form submission:', count)
    }
  }}
/>
```

## Styling System

### Color Palette
- **Background**: Gradient from gray-50 to gray-100
- **Text Primary**: gray-900 (headings)
- **Text Secondary**: gray-600 (body text)
- **Accent**: blue-600 (benefits dots)
- **Form Background**: white with shadow

### Spacing System
```css
.space-y-8                  /* Vertical spacing between sections */
.gap-8.lg:gap-12           /* Grid gap (mobile/desktop) */
.p-6.lg:p-8                /* Form padding */
.py-12.lg:py-20            /* Section padding */
```

### Shadow & Borders
```css
.shadow-xl                  /* Form shadow */
.border.border-gray-200     /* Form border */
.rounded-2xl                /* Form border radius */
```

## Usage Examples

### Basic Usage
```tsx
import HeroSection from '@/components/HeroSection'

export default function LandingPage() {
  return <HeroSection />
}
```

### With Custom Styling
```tsx
import HeroSection from '@/components/HeroSection'

export default function LandingPage() {
  return (
    <div className="custom-wrapper">
      <HeroSection />
    </div>
  )
}
```

### Integration with Layout
```tsx
import HeroSection from '@/components/HeroSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <Footer />
    </div>
  )
}
```

## Performance Optimizations

### Component Optimization
- **Lazy Loading**: Components load when needed
- **Memoization**: Form success state prevents unnecessary re-renders
- **Efficient Re-renders**: Proper state management

### Layout Performance
- **CSS Grid**: Efficient layout calculations
- **Sticky Positioning**: Smooth scrolling performance
- **Responsive Images**: Optimized for different screen sizes

## Accessibility Features

### Semantic HTML
```tsx
<section>                    {/* Main section */}
<h1>                        {/* Primary heading */}
<h2>                        {/* Form section heading */}
<main>                      {/* Main content area */}
```

### ARIA Support
- Proper heading hierarchy
- Form labels and descriptions
- Screen reader friendly content
- Keyboard navigation support

### Focus Management
- Logical tab order
- Visible focus indicators
- Form field associations

## Mobile Considerations

### Touch Targets
- Minimum 44px touch targets
- Adequate spacing between interactive elements
- Thumb-friendly button placement

### Performance
- Optimized for mobile networks
- Reduced animations on mobile
- Efficient scrolling performance

### Content Prioritization
- Most important content first
- Form prominently displayed
- Clear call-to-action

## Testing

### Demo Component
Use `HeroSectionDemo` to test all features:

```tsx
import HeroSectionDemo from '@/components/HeroSectionDemo'

export default function TestPage() {
  return <HeroSectionDemo />
}
```

### Test Scenarios
1. **Responsive Layout**: Test on different screen sizes
2. **Form Integration**: Submit form and verify counter updates
3. **Real-time Updates**: Test counter animations
4. **Mobile Experience**: Test touch interactions
5. **Accessibility**: Test with screen readers
6. **Performance**: Test loading and scrolling

## Browser Support

### Modern Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### CSS Features Used
- CSS Grid
- Flexbox
- Custom Properties
- Modern Selectors

### Fallbacks
- Graceful degradation for older browsers
- Progressive enhancement approach
- Mobile-first responsive design

## Integration Guidelines

### With Next.js
- Server-side rendering compatible
- Static generation support
- Image optimization ready

### With TailwindCSS
- Utility-first approach
- Custom design system
- Responsive utilities

### With TypeScript
- Full type safety
- Component prop interfaces
- Event handler typing

## Customization

### Theme Colors
```tsx
// Custom color scheme
<section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
```

### Typography
```tsx
// Custom font sizes
<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
```

### Layout
```tsx
// Custom grid proportions
<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-16">
```

## Troubleshooting

### Common Issues

1. **Layout Breaking**
   - Check container max-width
   - Verify grid column spans
   - Test responsive breakpoints

2. **Form Not Working**
   - Verify component imports
   - Check prop passing
   - Test form validation

3. **Counter Not Updating**
   - Check Supabase connection
   - Verify real-time subscriptions
   - Test database permissions

### Debug Mode
Add console logs to track component behavior:

```tsx
const handleFormSuccess = (data: SignupFormData) => {
  console.log('Form submitted:', data)
  setIsFormSubmitted(true)
}
``` 