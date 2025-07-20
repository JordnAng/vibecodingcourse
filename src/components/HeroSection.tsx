'use client'

import { useState, useRef, useCallback } from 'react'
import SignupForm from './SignupForm'
import SignupCounter from './SignupCounter'
import type { SignupFormData } from '@/lib/validations'

export default function HeroSection() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const counterRef = useRef<{ forceRefresh: () => void }>(null)

  const handleFormSuccess = useCallback((data: SignupFormData) => {
    setIsFormSubmitted(true)
    console.log('Form submitted successfully:', data)
    
    // Force refresh the counter immediately
    if (counterRef.current) {
      counterRef.current.forceRefresh()
    }
    
    // Reset the flag after a delay
    setTimeout(() => {
      setIsFormSubmitted(false)
    }, 2000)
  }, [])

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
            🚀 Coming Soon - Join the Waitlist
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Vibe Coding Course
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Build and launch your MVP in 30 days with modern web technologies. 
            Learn React, Next.js, and full-stack development from industry experts.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Content Section */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Benefits Section */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-gray-900 text-center lg:text-left">
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Modern React</h3>
                      <p className="text-gray-600 text-sm">Master hooks, context, and modern patterns</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Next.js 14</h3>
                      <p className="text-gray-600 text-sm">App router, server components, and optimization</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Full-Stack Dev</h3>
                      <p className="text-gray-600 text-sm">Database, APIs, and deployment with Supabase</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Production Ready</h3>
                      <p className="text-gray-600 text-sm">Deployment, optimization, and monitoring</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 text-center lg:text-left">
                Why Choose Vibe Coding?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-gray-100">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 text-xl">✓</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">30-Day Guarantee</h4>
                  <p className="text-sm text-gray-600">Money-back if not satisfied</p>
                </div>
                
                <div className="text-center p-4 bg-white rounded-lg border border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 text-xl">∞</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Lifetime Access</h4>
                  <p className="text-sm text-gray-600">Learn at your own pace</p>
                </div>
                
                <div className="text-center p-4 bg-white rounded-lg border border-gray-100">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 text-xl">👥</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Community</h4>
                  <p className="text-sm text-gray-600">Join developer network</p>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="text-center lg:text-left">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <SignupCounter 
                  ref={counterRef}
                  className="text-2xl font-bold text-blue-600"
                  onCountUpdate={(count) => {
                    if (isFormSubmitted) {
                      console.log('Counter updated after form submission:', count)
                    }
                  }}
                />
                <p className="text-gray-600 mt-2">developers already signed up</p>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-10">
                
                {/* Form Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🎯</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                    Get Early Access
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Join the waitlist and be the first to know when we launch. 
                    Get exclusive early-bird pricing and bonus content.
                  </p>
                </div>

                {/* Signup Form */}
                <SignupForm
                  onSuccess={handleFormSuccess}
                  className="space-y-6"
                />

                {/* Security & Trust */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>No spam</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>Free</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 