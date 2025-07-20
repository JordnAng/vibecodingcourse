'use client'

import HeroSection from './HeroSection'

export default function HeroSectionDemo() {
  return (
    <div className="min-h-screen">
      {/* Demo Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                HeroSection Demo
              </h1>
              <p className="text-sm text-gray-600">
                Responsive two-column layout with form and counter integration
              </p>
            </div>
            <div className="text-xs text-gray-500">
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800">
                Live Demo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Demo Footer */}
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Layout Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Layout Features
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✅ Responsive two-column design</li>
                <li>✅ 60% content, 40% form on desktop</li>
                <li>✅ Stacked layout on mobile</li>
                <li>✅ Sticky form positioning</li>
                <li>✅ Proper spacing and typography</li>
              </ul>
            </div>

            {/* Component Integration */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Component Integration
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✅ SignupForm integration</li>
                <li>✅ SignupCounter integration</li>
                <li>✅ Form success handling</li>
                <li>✅ Real-time counter updates</li>
                <li>✅ Trust indicators</li>
              </ul>
            </div>

            {/* Responsive Design */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Responsive Design
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✅ Mobile-first approach</li>
                <li>✅ Breakpoint-specific layouts</li>
                <li>✅ Responsive typography</li>
                <li>✅ Flexible grid system</li>
                <li>✅ Touch-friendly interactions</li>
              </ul>
            </div>

          </div>

          {/* Technical Details */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Technical Implementation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Layout System</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Desktop:</strong> Grid with 5 columns (3fr content, 2fr form)</p>
                  <p><strong>Mobile:</strong> Single column stacked layout</p>
                  <p><strong>Breakpoints:</strong> sm, md, lg responsive design</p>
                  <p><strong>Container:</strong> max-w-7xl with proper padding</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Component Features</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Form Integration:</strong> Success callback handling</p>
                  <p><strong>Counter Updates:</strong> Real-time with animations</p>
                  <p><strong>Typography:</strong> Inter font with proper hierarchy</p>
                  <p><strong>Styling:</strong> TailwindCSS with custom gradients</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
} 