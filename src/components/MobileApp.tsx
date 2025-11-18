import { useState } from 'react'
import { MobileDashboard } from './mobile/MobileDashboard'
import { MobileFinance } from './mobile/MobileFinance'
import { MobileMembers } from './mobile/MobileMembers'
import { MobileEvents } from './mobile/MobileEvents'
import { MobileMessages } from './mobile/MobileMessages'
import { MobileProfile } from './mobile/MobileProfile'
import { 
  Home, 
  DollarSign, 
  Users, 
  Calendar,
  MessageCircle,
  User
} from 'lucide-react'

type MobileView = 'dashboard' | 'finance' | 'members' | 'events' | 'messages' | 'profile'

export function MobileApp() {
  const [currentView, setCurrentView] = useState<MobileView>('dashboard')

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <MobileDashboard />
      case 'finance':
        return <MobileFinance />
      case 'members':
        return <MobileMembers />
      case 'events':
        return <MobileEvents />
      case 'messages':
        return <MobileMessages />
      case 'profile':
        return <MobileProfile />
      default:
        return <MobileDashboard />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 max-w-[430px] mx-auto">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-20">
        {renderView()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-gray-200 safe-area-bottom">
        <div className="grid grid-cols-6 h-20">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex flex-col items-center justify-center gap-1 ${
              currentView === 'dashboard' ? 'text-[#122B5B]' : 'text-gray-400'
            }`}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </button>
          
          <button
            onClick={() => setCurrentView('finance')}
            className={`flex flex-col items-center justify-center gap-1 ${
              currentView === 'finance' ? 'text-[#122B5B]' : 'text-gray-400'
            }`}
          >
            <DollarSign className="h-6 w-6" />
            <span className="text-xs">Finance</span>
          </button>
          
          <button
            onClick={() => setCurrentView('members')}
            className={`flex flex-col items-center justify-center gap-1 ${
              currentView === 'members' ? 'text-[#122B5B]' : 'text-gray-400'
            }`}
          >
            <Users className="h-6 w-6" />
            <span className="text-xs">Members</span>
          </button>
          
          <button
            onClick={() => setCurrentView('events')}
            className={`flex flex-col items-center justify-center gap-1 ${
              currentView === 'events' ? 'text-[#122B5B]' : 'text-gray-400'
            }`}
          >
            <Calendar className="h-6 w-6" />
            <span className="text-xs">Events</span>
          </button>

          <button
            onClick={() => setCurrentView('messages')}
            className={`flex flex-col items-center justify-center gap-1 ${
              currentView === 'messages' ? 'text-[#122B5B]' : 'text-gray-400'
            }`}
          >
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs">Messages</span>
          </button>
          
          <button
            onClick={() => setCurrentView('profile')}
            className={`flex flex-col items-center justify-center gap-1 ${
              currentView === 'profile' ? 'text-[#122B5B]' : 'text-gray-400'
            }`}
          >
            <User className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}
