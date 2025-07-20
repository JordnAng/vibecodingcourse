// Form types
export interface SignupFormData {
  name: string;
  email: string;
  subscription?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SupabaseResponse<T = unknown> {
  data: T | null;
  error: unknown;
  count?: number;
  status?: number;
  statusText?: string;
}

// Course types
export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  features: string[];
  imageUrl?: string;
}

// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

// Database table types
export interface EarlySignup {
  id: string;
  full_name: string;
  email: string;
  subscribed_to_updates: boolean;
  created_at: string;
}

// Database types (for Supabase)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at'>>;
      };
      courses: {
        Row: Course;
        Insert: Omit<Course, 'id'>;
        Update: Partial<Omit<Course, 'id'>>;
      };
      early_signups: {
        Row: EarlySignup;
        Insert: Omit<EarlySignup, 'id' | 'created_at'>;
        Update: Partial<Omit<EarlySignup, 'id' | 'created_at'>>;
      };
    };
    Functions: {
      get_signup_count: {
        Args: Record<string, never>;
        Returns: number;
      };
    };
  };
} 