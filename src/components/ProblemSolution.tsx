import { AlertTriangle, CheckCircle } from 'lucide-react'

export function ProblemSolution() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            The Challenge Student Organizations Face
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Research shows 65% of student leaders cite finances as their biggest operational challenge
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Problem */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <h3 className="text-2xl text-gray-900">The Problem</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-600">
                  Club leaders change annually leading to lost records and lack of continuity
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-600">
                  Clubs rely on a spotty patchwork of Venmo, spreadsheets, and group chats
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-600">
                  Universities spend millions on tools that do not meet student needs
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-600">
                  Leaders spend time creating systems rather than building community
                </p>
              </div>
            </div>
          </div>
          
          {/* Solution */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <h3 className="text-2xl text-gray-900">Our Solution</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-600">
                  Student-first platform with fast self-service onboarding
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-600">
                  One-click hosted checkouts and real-time financial reconciliation
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-600">
                  Dynamic rosters, built-in messaging, and alumni/sponsor portals
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-gray-600">
                  Instant transparency and time savings for leaders and administrators
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}