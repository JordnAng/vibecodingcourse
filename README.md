# Vibe Coding Course Landing Page

A clean, conversion-optimized landing page for capturing early interest in the Vibe Coding Course. Built to generate leads and build an email list of developers interested in rapid MVP development.

## 🎯 **PRD Goals**

- **Primary**: Capture qualified leads and build email list
- **Secondary**: Establish brand credibility and trust
- **Target**: 15-25% email signup conversion rate

## 🚀 **Features**

- **Clean Hero Section** with clear value proposition
- **Signup Form** with name, email, and subscription fields
- **Real-time Counter** showing social proof
- **Responsive Design** optimized for all devices
- **Supabase Integration** for data storage and real-time updates

## 🛠 **Tech Stack**

- **Frontend**: React 18+ with Next.js 14
- **Styling**: TailwindCSS
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Netlify

## 📦 **Quick Start**

```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔧 **Environment Variables**

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 📊 **Database Setup**

The app uses a Supabase table called `early_signups`:

```sql
CREATE TABLE early_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_to_updates BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎨 **Design**

- **Minimalist design** focused on conversion
- **Mobile-first responsive** layout
- **Accessibility compliant** (WCAG 2.1 AA)
- **Performance optimized** for fast loading

## 📈 **Success Metrics**

- Form submission rate
- Email signup conversion rate
- Page load performance
- Mobile usability

## 🚀 **Deployment**

Deploy to Netlify with the included `netlify.toml` configuration. The build process is optimized for production with:

- Static optimization
- Image optimization
- Security headers
- Caching strategies

---

**Built for lead generation and conversion optimization.**
