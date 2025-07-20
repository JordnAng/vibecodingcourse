'use client'

import { useState } from 'react'
import SignupCounter from './SignupCounter'

export default function SignupCounterDemo() {
  const [refreshInterval, setRefreshInterval] = useState(30000)
  const [lastCount, setLastCount] = useState<number | null>(null)

  const handleCountUpdate = (count: number) => {
    setLastCount(count)
    console.log('Signup count updated:', count)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          SignupCounter Demo
        </h1>
        <p className="text-gray-600">
          Real-time signup counter with Supabase integration
        </p>
      </div>

      {/* Demo Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Demo Controls</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Refresh Interval (ms)
            </label>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5000}>5 seconds</option>
              <option value={10000}>10 seconds</option>
              <option value={30000}>30 seconds (default)</option>
              <option value={60000}>1 minute</option>
            </select>
          </div>
          
          {lastCount !== null && (
            <div className="text-sm text-gray-600">
              Last count update: {lastCount.toLocaleString()}
            </div>
          )}
        </div>
      </div>

      {/* SignupCounter Component */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Live Counter</h2>
        <SignupCounter
          refreshInterval={refreshInterval}
          onCountUpdate={handleCountUpdate}
          className="text-center"
        />
      </div>

      {/* Component Features */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Features Included</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>✅ Real-time Supabase subscription</li>
          <li>✅ Polling with configurable interval</li>
          <li>✅ Smooth number animations</li>
          <li>✅ Loading skeleton state</li>
          <li>✅ Error handling with retry</li>
          <li>✅ Responsive design</li>
          <li>✅ Performance optimized</li>
          <li>✅ Proper cleanup on unmount</li>
        </ul>
      </div>

      {/* Technical Details */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Technical Details</h3>
        <div className="text-sm text-blue-700 space-y-2">
          <p><strong>Real-time Updates:</strong> Uses Supabase real-time subscriptions to listen for changes in the early_signups table</p>
          <p><strong>Polling Fallback:</strong> Configurable interval polling as backup (default: 30s)</p>
          <p><strong>Animation:</strong> Smooth number transitions using requestAnimationFrame with easing</p>
          <p><strong>Performance:</strong> Debounced updates, efficient re-renders, proper cleanup</p>
          <p><strong>Error Handling:</strong> Graceful error states with retry functionality</p>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-green-800 mb-3">Usage Examples</h3>
        <div className="text-sm text-green-700 space-y-2">
          <div>
            <strong>Basic Usage:</strong>
            <pre className="bg-white p-2 rounded mt-1 text-xs overflow-x-auto">
{`<SignupCounter />`}
            </pre>
          </div>
          <div>
            <strong>With Custom Interval:</strong>
            <pre className="bg-white p-2 rounded mt-1 text-xs overflow-x-auto">
{`<SignupCounter refreshInterval={10000} />`}
            </pre>
          </div>
          <div>
            <strong>With Callback:</strong>
            <pre className="bg-white p-2 rounded mt-1 text-xs overflow-x-auto">
{`<SignupCounter onCountUpdate={(count) => console.log(count)} />`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
} 