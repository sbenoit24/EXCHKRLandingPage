import { 
  Home, 
  DollarSign, 
  Users, 
  Calendar, 
  MessageCircle,
  Shield,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from './ui/button'
import { cn } from './ui/utils'

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  onLogout: () => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'finances', name: 'Finance', icon: DollarSign },
  { id: 'members', name: 'Members', icon: Users },
  { id: 'events', name: 'Events', icon: Calendar },
  { id: 'messages', name: 'Messages', icon: MessageCircle },
  { id: 'permissions', name: 'Permissions', icon: Shield }
]

export function Sidebar({ activeView, onViewChange, onLogout, isCollapsed, onToggleCollapse }: SidebarProps) {
  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl h-screen flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#122B5B] rounded-xl flex items-center justify-center text-white text-sm shadow-lg">
                🦬
              </div>
              <span className="ml-3 text-xl text-[#122B5B] font-bold">EXCHKR</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="h-8 w-8 p-0 hover:bg-white/50"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeView === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start transition-all duration-200 hover:scale-105 rounded-xl",
                  activeView === item.id && "bg-[#122B5B] text-white hover:bg-[#0f1f47] shadow-lg border border-[#c39a4e]",
                  activeView !== item.id && "hover:bg-[#B8DFFF]/20",
                  isCollapsed && "justify-center px-2"
                )}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                {!isCollapsed && item.name}
              </Button>
            )
          })}
        </div>
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-white/20">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50/50 rounded-xl transition-all duration-200 hover:scale-105",
            isCollapsed && "justify-center px-2"
          )}
          onClick={onLogout}
        >
          <LogOut className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
          {!isCollapsed && "Sign Out"}
        </Button>
      </div>
    </div>
  )
}