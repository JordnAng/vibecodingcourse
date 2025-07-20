import HeroSection from '@/components/HeroSection'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function Home() {
  return (
    <main className="min-h-screen">
      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>
    </main>
  )
}
