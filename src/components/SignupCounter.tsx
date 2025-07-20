'use client'

import { useState, useEffect, useCallback, useRef, useImperativeHandle, forwardRef } from 'react'
import { supabase } from '@/lib/supabase'
import { getSignupCount } from '@/lib/database'
import { RefreshCw, AlertCircle } from 'lucide-react'

interface SignupCounterRef {
  forceRefresh: () => void
}

interface SignupCounterProps {
  refreshInterval?: number
  className?: string
  onCountUpdate?: (count: number) => void
}

const SignupCounter = forwardRef<SignupCounterRef, SignupCounterProps>(({ 
  refreshInterval = 30000, 
  className = '',
  onCountUpdate 
}, ref) => {
  const [count, setCount] = useState<number | null>(null)
  const [displayCount, setDisplayCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRetrying, setIsRetrying] = useState(false)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const subscriptionRef = useRef<any>(null)
  const animationRef = useRef<number | null>(null)

  // Animate number changes smoothly
  const animateCount = useCallback((from: number, to: number) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

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

  // Fetch signup count from database
  const fetchCount = useCallback(async (isRetry = false) => {
    if (isRetry) {
      setIsRetrying(true)
    } else if (count === null) {
      setIsLoading(true)
    }
    
    setError(null)

    try {
      const result = await getSignupCount()
      
      if (result.success && typeof result.data === 'number') {
        const newCount = result.data
        
        if (count !== null) {
          // Animate the change
          animateCount(count, newCount)
        } else {
          // Initial load, set directly
          setDisplayCount(newCount)
        }
        
        setCount(newCount)
        onCountUpdate?.(newCount)
      } else {
        throw new Error(result.error || 'Failed to fetch signup count')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      console.error('SignupCounter fetch error:', err)
    } finally {
      setIsLoading(false)
      setIsRetrying(false)
    }
  }, [count, animateCount, onCountUpdate])

  // Function to force refresh counter (called from parent)
  const forceRefresh = useCallback(() => {
    if (count !== null) {
      fetchCount(true)
    }
  }, [count, fetchCount])

  // Expose forceRefresh to parent via ref
  useImperativeHandle(ref, () => ({
    forceRefresh
  }), [forceRefresh])

  // Set up real-time subscription
  const setupRealtimeSubscription = useCallback(() => {
    try {
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

      return () => {
        if (subscriptionRef.current) {
          supabase.removeChannel(subscriptionRef.current)
        }
      }
    } catch (err) {
      console.warn('Failed to setup real-time subscription:', err)
      // Return no-op cleanup function
      return () => {}
    }
  }, [fetchCount])

  // Set up polling interval
  const setupPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      fetchCount()
    }, refreshInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [fetchCount, refreshInterval])

  // Initial setup
  useEffect(() => {
    fetchCount()
    
    const cleanupRealtime = setupRealtimeSubscription()
    const cleanupPolling = setupPolling()

    return () => {
      cleanupRealtime()
      cleanupPolling()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [fetchCount, setupRealtimeSubscription, setupPolling])

  // Handle retry
  const handleRetry = useCallback(() => {
    fetchCount(true)
  }, [fetchCount])

  // Loading skeleton
  if (isLoading && count === null) {
    return (
      <div className={`text-gray-500 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className={`text-gray-500 ${className}`}>
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <span className="text-sm">Unable to load signup count</span>
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="ml-2 text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRetrying ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              'Retry'
            )}
          </button>
        </div>
      </div>
    )
  }

  // Main display
  return (
    <div className={`text-gray-500 ${className}`}>
      <p className="text-sm sm:text-base">
        Join{' '}
        <span className="font-semibold text-gray-700">
          {displayCount.toLocaleString()}
        </span>{' '}
        developers already signed up
      </p>
      {isRetrying && (
        <div className="flex items-center space-x-1 mt-1">
          <RefreshCw className="w-3 h-3 animate-spin" />
          <span className="text-xs">Updating...</span>
        </div>
      )}
    </div>
  )
})

SignupCounter.displayName = 'SignupCounter'

export default SignupCounter 