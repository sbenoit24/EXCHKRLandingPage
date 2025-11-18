import { Button } from './ui/button'
import { ArrowRight, Play } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-[#BBDFF]/20 px-4 py-2 border border-[#C39A46]/30 animate-pulse">
                <div className="w-2 h-2 bg-[#C39A46] rounded-full mr-2 animate-ping"></div>
                <span className="text-sm text-[#12285B]">🔥 LAUNCHING SOON</span>
              </div>
              <h1 className="text-4xl lg:text-6xl tracking-tight text-gray-900">
                The future of <span className="text-[#12285B]">student organizations</span> is coming
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Be among the first to experience EXCHKR. Join our exclusive beta program and transform how your organization manages finances, membership, and events.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#12285B] hover:bg-[#12285B]/90 text-white shadow-lg">
                🚀 Join Beta Waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#C39A46] rounded-full animate-pulse"></div>
                <span>🎯 Beta testers get exclusive launch perks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}