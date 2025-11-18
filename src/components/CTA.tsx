import { Button } from './ui/button'
import { Input } from './ui/input'
import { ArrowRight, CheckCircle, Zap, Shield } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 bg-[#12285B]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl text-white">
                🚀 Be Part of the Revolution
              </h2>
              <p className="text-xl text-[#BBDFF]">
                Join our exclusive beta program and help us build the future of student organization management. Limited spots available!
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-[#BBDFF]">
                <CheckCircle className="h-5 w-5" />
                <span>🎯 Early access to all premium features</span>
              </div>
              <div className="flex items-center space-x-3 text-[#BBDFF]">
                <Zap className="h-5 w-5" />
                <span>⚡ Direct line to founders for feedback</span>
              </div>
              <div className="flex items-center space-x-3 text-[#BBDFF]">
                <Shield className="h-5 w-5" />
                <span>🎁 Founding member recognition & perks</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl text-gray-900 mb-2">🚀 Join Beta Program</h3>
                <p className="text-gray-600">Be among the first to experience EXCHKR. Help shape the platform that will transform student organizations.</p>
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First name" className="bg-gray-50" />
                  <Input placeholder="Last name" className="bg-gray-50" />
                </div>
                <Input placeholder="Email address" type="email" className="bg-gray-50" />
                <Input placeholder="Organization name" className="bg-gray-50" />
                <Input placeholder="University" className="bg-gray-50" />
                <Button className="w-full bg-[#12285B] hover:bg-[#12285B]/90 text-white shadow-lg">
                  🚀 Apply for Beta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Questions? Email us at <a href="mailto:support@exchkr.com" className="text-blue-600 hover:underline">support@exchkr.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}