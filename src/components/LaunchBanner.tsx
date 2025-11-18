import { Button } from './ui/button'
import { X, Sparkles } from 'lucide-react'
import { useState } from 'react'

export function PreLaunchBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-[#12285B] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3">
            <Sparkles className="h-5 w-5 animate-spin" />
            <span className="text-sm sm:text-base">
              🚀 <strong>LAUNCHING SOON:</strong> Join our beta waitlist and be first to experience EXCHKR!
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white text-[#12285B] hover:bg-gray-100 text-xs sm:text-sm"
            >
              Join Beta
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/80 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}