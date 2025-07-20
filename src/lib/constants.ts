// Site metadata
export const SITE_CONFIG = {
  name: 'Vibe Coding Course',
  description: 'Learn to code with confidence and build amazing projects',
  url: 'https://vibecodingcourse.com',
  ogImage: '/og-image.jpg',
}

// Navigation
export const NAVIGATION = {
  home: 'Home',
  courses: 'Courses',
  about: 'About',
  contact: 'Contact',
  signup: 'Sign Up',
}

// Hero section
export const HERO = {
  title: 'Master Coding with Confidence',
  subtitle: 'Join thousands of developers who have transformed their careers with our comprehensive coding courses',
  cta: 'Start Learning Today',
  secondaryCta: 'View Courses',
  features: [
    'Learn at your own pace',
    'Real-world projects',
    'Expert instructors',
    'Lifetime access',
  ],
}

// Features section
export const FEATURES = {
  title: 'Why Choose Vibe Coding?',
  subtitle: 'Everything you need to succeed in your coding journey',
  items: [
    {
      title: 'Structured Learning Path',
      description: 'Follow our carefully crafted curriculum designed for beginners to advanced developers',
      icon: 'BookOpen',
    },
    {
      title: 'Hands-on Projects',
      description: 'Build real-world projects that you can add to your portfolio',
      icon: 'Code',
    },
    {
      title: 'Expert Support',
      description: 'Get help from experienced developers and join our community',
      icon: 'Users',
    },
    {
      title: 'Flexible Schedule',
      description: 'Learn at your own pace with lifetime access to all courses',
      icon: 'Clock',
    },
  ],
}

// Courses section
export const COURSES = {
  title: 'Featured Courses',
  subtitle: 'Start your coding journey with our most popular courses',
  viewAll: 'View All Courses',
  items: [
    {
      title: 'Web Development Fundamentals',
      description: 'Learn HTML, CSS, and JavaScript from scratch',
      price: 99,
      duration: '8 weeks',
      level: 'Beginner',
      features: ['HTML & CSS', 'JavaScript Basics', 'Responsive Design', 'Final Project'],
    },
    {
      title: 'React Mastery',
      description: 'Build modern web applications with React',
      price: 149,
      duration: '10 weeks',
      level: 'Intermediate',
      features: ['React Hooks', 'State Management', 'API Integration', 'Deployment'],
    },
    {
      title: 'Full-Stack Development',
      description: 'Master both frontend and backend development',
      price: 199,
      duration: '12 weeks',
      level: 'Advanced',
      features: ['Node.js', 'Database Design', 'Authentication', 'Cloud Deployment'],
    },
  ],
}

// Testimonials
export const TESTIMONIALS = {
  title: 'What Our Students Say',
  subtitle: 'Join thousands of satisfied students who have transformed their careers',
  items: [
    {
      name: 'Sarah Johnson',
      role: 'Frontend Developer',
      company: 'TechCorp',
      content: 'Vibe Coding Course completely changed my career. The structured approach and real-world projects gave me the confidence to land my dream job.',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      role: 'Full-Stack Developer',
      company: 'StartupXYZ',
      content: 'The instructors are amazing and the community is incredibly supportive. I went from knowing nothing about coding to building full applications.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Software Engineer',
      company: 'BigTech Inc',
      content: 'The course material is up-to-date and the projects are challenging but achievable. Highly recommend for anyone serious about learning to code.',
      rating: 5,
    },
  ],
}

// Contact section
export const CONTACT = {
  title: 'Get in Touch',
  subtitle: 'Have questions? We\'d love to hear from you',
  form: {
    name: 'Full Name',
    email: 'Email Address',
    message: 'Your Message',
    submit: 'Send Message',
  },
  info: {
    email: 'hello@vibecodingcourse.com',
    phone: '+1 (555) 123-4567',
    address: '123 Coding Street, Tech City, TC 12345',
  },
}

// Newsletter
export const NEWSLETTER = {
  title: 'Stay Updated',
  subtitle: 'Get the latest coding tips, course updates, and exclusive offers',
  placeholder: 'Enter your email address',
  button: 'Subscribe',
  disclaimer: 'We respect your privacy. Unsubscribe at any time.',
}

// Footer
export const FOOTER = {
  description: 'Empowering developers to build amazing things with confidence and skill.',
  links: {
    courses: ['Web Development', 'React', 'Full-Stack', 'Python', 'Data Science'],
    company: ['About Us', 'Careers', 'Blog', 'Press'],
    support: ['Help Center', 'Contact', 'Community', 'FAQ'],
    legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  },
  social: {
    twitter: 'https://twitter.com/vibecoding',
    facebook: 'https://facebook.com/vibecoding',
    instagram: 'https://instagram.com/vibecoding',
    linkedin: 'https://linkedin.com/company/vibecoding',
    youtube: 'https://youtube.com/vibecoding',
  },
  copyright: '© 2024 Vibe Coding Course. All rights reserved.',
}

// Error messages
export const ERROR_MESSAGES = {
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  minLength: (field: string, min: number) => `${field} must be at least ${min} characters`,
  maxLength: (field: string, max: number) => `${field} must be less than ${max} characters`,
  networkError: 'Network error. Please check your connection and try again.',
  serverError: 'Server error. Please try again later.',
  unknownError: 'An unexpected error occurred. Please try again.',
  formSubmission: 'Failed to submit form. Please try again.',
  validationError: 'Please check your input and try again.',
}

// Success messages
export const SUCCESS_MESSAGES = {
  formSubmitted: 'Thank you! Your message has been sent successfully.',
  newsletterSubscribed: 'Successfully subscribed to our newsletter!',
  signupComplete: 'Welcome! Your account has been created successfully.',
  courseEnrolled: 'Successfully enrolled in the course!',
  profileUpdated: 'Profile updated successfully.',
  passwordReset: 'Password reset email sent. Please check your inbox.',
}

// Form validation messages
export const VALIDATION_MESSAGES = {
  name: {
    required: 'Name is required',
    minLength: 'Name must be at least 2 characters',
    maxLength: 'Name must be less than 50 characters',
  },
  email: {
    required: 'Email is required',
    invalid: 'Please enter a valid email address',
  },
  message: {
    required: 'Message is required',
    minLength: 'Message must be at least 10 characters',
    maxLength: 'Message must be less than 1000 characters',
  },
  subscription: {
    required: 'Please select your subscription preference',
  },
}

// API endpoints
export const API_ENDPOINTS = {
  contact: '/api/contact',
  newsletter: '/api/newsletter',
  signup: '/api/signup',
  courses: '/api/courses',
  users: '/api/users',
}

// Local storage keys
export const STORAGE_KEYS = {
  user: 'vibe_user',
  theme: 'vibe_theme',
  preferences: 'vibe_preferences',
}

// Animation durations
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
}

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} 