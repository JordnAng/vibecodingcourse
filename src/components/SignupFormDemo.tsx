'use client'

import { useState } from 'react'
import SignupForm from './SignupForm'
import type { SignupFormData } from '@/lib/validations'

export default function SignupFormDemo() {
  const [lastSubmission, setLastSubmission] = useState<SignupFormData | null>(null)
  const [isDisabled, setIsDisabled] = useState(false)

  const handleSuccess = (data: SignupFormData) => {
    setLastSubmission(data)
    console.log('Form submitted successfully:', data)
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          SignupForm Demo
        </h1>
        <p className="text-gray-600">
          Test the signup form component with different states
        </p>
      </div>

      {/* Demo Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Demo Controls</h2>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isDisabled}
              onChange={(e) => setIsDisabled(e.target.checked)}
              className="mr-2"
            />
            Disable Form
          </label>
        </div>
      </div>

      {/* SignupForm Component */}
      <SignupForm
        onSuccess={handleSuccess}
        disabled={isDisabled}
        className="shadow-lg"
      />

      {/* Last Submission Display */}
      {lastSubmission && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Last Submission
          </h3>
          <pre className="text-sm text-blue-700 whitespace-pre-wrap">
            {JSON.stringify(lastSubmission, null, 2)}
          </pre>
        </div>
      )}

      {/* Component Features */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Features Included</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>✅ React Hook Form with Zod validation</li>
          <li>✅ Real-time validation with error messages</li>
          <li>✅ Loading states with spinner</li>
          <li>✅ Success state with auto-reset</li>
          <li>✅ Accessibility features (ARIA labels, roles)</li>
          <li>✅ Responsive design with TailwindCSS</li>
          <li>✅ Disabled state handling</li>
          <li>✅ Focus management and keyboard navigation</li>
        </ul>
      </div>
    </div>
  )
} 