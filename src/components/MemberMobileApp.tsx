import { useState } from 'react'
import { MemberCalendarView } from './mobile/MemberCalendarView'
import { MemberDirectory } from './mobile/MemberDirectory'
import { MemberPayments } from './mobile/MemberPayments'
import { MemberMessagesView } from './MemberMessagesView'
import { Card, CardContent } from './ui/card'
import { 
  Calendar,
  Users,
  Wallet,
  MessageCircle
} from 'lucide-react'

type MemberView = 'calendar' | 'directory' | 'payments' | 'messages'

export function MemberMobileApp() {
  const [currentView, setCurrentView] = useState<MemberView>('calendar')

  const renderView = () => {
    switch (currentView) {
      case 'calendar':
        return <MemberCalendarView />
      case 'directory':
        return <MemberDirectory />
      case 'payments':
        return <MemberPayments />
      case 'messages':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b sticky top-0 z-10">
              <div className="px-4 pt-12 pb-4">
                <h1 className="text-2xl mb-1">Messages</h1>
                <p className="text-sm text-muted-foreground">Connect with members and officers</p>
              </div>
            </div>
            <div className="p-4">
              <MemberMessagesView />
            </div>
          </div>
        )
      default:
        return <MemberCalendarView />
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 max-w-[430px] mx-auto">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-20">
        {renderView()}
      </div>

      {/* Bottom Navigation - 4 tabs */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white border-t border-gray-200 safe-area-bottom">
        <div className="grid grid-cols-4 h-20">
          <button
            onClick={() => setCurrentView('calendar')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              currentView === 'calendar' ? 'text-[#122B5B]' : 'text-gray-400'
            }`}
          >
            <Calendar className="h-6 w-6" />
            <span className="text-xs">Calendar</span>
          </button>
          
          <button
            onClick={() => setCurrentView('directory')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              currentView === 'directory' ? 'text-[#122B5B]' : 'text-gray-400'
            }`}
          >
            <Users className="h-6 w-6" />
            <span className="text-xs">Members</span>
          </button>

          <button
            onClick={() => setCurrentView('payments')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              currentView === 'payments' ? 'text-[#122B5B]' : 'text-gray-400'
            }`}
          >
            <Wallet className="h-6 w-6" />
            <span className="text-xs">Payments</span>
          </button>

          <button
            onClick={() => setCurrentView('messages')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              currentView === 'messages' ? 'text-[#122B5B]' : 'text-gray-400'
            }`}
          >
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs">Messages</span>
          </button>
        </div>
      </div>
    </div>
  )
}
