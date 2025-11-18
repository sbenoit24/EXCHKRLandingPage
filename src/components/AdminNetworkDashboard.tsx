import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { 
  LayoutDashboard,
  Users,
  UserCog,
  DollarSign,
  Calendar,
  Shield,
  FileText,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Building2,
  Menu,
  X,
  MessageSquare
} from 'lucide-react'
import { AdminOverview } from './admin/AdminOverview'
import { AdminClubsDirectory } from './admin/AdminClubsDirectory'
import { AdminOfficersDirectory } from './admin/AdminOfficersDirectory'
import { AdminMembersDirectory } from './admin/AdminMembersDirectory'
import { AdminFinanceHub } from './admin/AdminFinanceHub'
import { AdminEventsHub } from './admin/AdminEventsHub'
import { AdminComplianceCenter } from './admin/AdminComplianceCenter'
import { AdminReportsSection } from './admin/AdminReportsSection'
import { AdminPermissionsSettings } from './admin/AdminPermissionsSettings'
import { AdminNetworkMessages } from './admin/AdminNetworkMessages'

export function AdminNetworkDashboard() {
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedOrg, setSelectedOrg] = useState('all')
  const [showNotifications, setShowNotifications] = useState(false)
  
  // Current user role
  const currentUser = {
    name: 'Sarah Johnson',
    role: 'National Admin',
    email: 'sarah.j@exchkr.com',
    avatar: 'SJ'
  }

  // Organizations available based on role
  const organizations = [
    { id: 'all', name: 'All Organizations', type: 'national' },
    { id: 'stanford', name: 'Stanford University', type: 'university' },
    { id: 'berkeley', name: 'UC Berkeley', type: 'university' },
    { id: 'mit', name: 'MIT', type: 'university' },
    { id: 'harvard', name: 'Harvard University', type: 'university' }
  ]

  const notifications = [
    { id: 1, type: 'alert', message: '3 clubs pending recognition at Stanford', time: '2h ago' },
    { id: 2, type: 'warning', message: '5 overdue compliance filings', time: '4h ago' },
    { id: 3, type: 'info', message: 'Monthly financial report ready', time: '1d ago' }
  ]

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'clubs', label: 'Clubs', icon: Building2 },
    { id: 'officers', label: 'Officers', icon: UserCog },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <AdminOverview selectedOrg={selectedOrg} />
      case 'clubs':
        return <AdminClubsDirectory selectedOrg={selectedOrg} />
      case 'officers':
        return <AdminOfficersDirectory selectedOrg={selectedOrg} />
      case 'members':
        return <AdminMembersDirectory selectedOrg={selectedOrg} />
      case 'finance':
        return <AdminFinanceHub selectedOrg={selectedOrg} />
      case 'events':
        return <AdminEventsHub selectedOrg={selectedOrg} />
      case 'messages':
        return <AdminNetworkMessages selectedOrg={selectedOrg} />
      case 'compliance':
        return <AdminComplianceCenter selectedOrg={selectedOrg} />
      case 'reports':
        return <AdminReportsSection selectedOrg={selectedOrg} />
      case 'settings':
        return <AdminPermissionsSettings />
      default:
        return <AdminOverview selectedOrg={selectedOrg} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#122B5B] flex items-center justify-center">
                <span className="text-white">E</span>
              </div>
              <div>
                <h1 className="text-lg">EXCHKR</h1>
                <p className="text-xs text-muted-foreground">Network Admin</p>
              </div>
            </div>

            {/* Organization Selector */}
            <div className="hidden md:block ml-6">
              <select
                value={selectedOrg}
                onChange={(e) => setSelectedOrg(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm min-w-[240px] bg-white"
              >
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            {/* Global Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clubs, officers, members..."
                className="pl-9 w-[300px]"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {notifications.length}
                </span>
              </Button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-sm">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                      >
                        <p className="text-sm">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-200">
                    <Button variant="ghost" size="sm" className="text-xs">
                      View all notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
              <div className="hidden md:block text-right">
                <p className="text-sm">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.role}</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-[#122B5B] flex items-center justify-center text-white text-sm">
                {currentUser.avatar}
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Side Navigation */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 mt-[73px] lg:mt-0`}
        >
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id)
                    if (window.innerWidth < 1024) {
                      setSidebarOpen(false)
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-[#122B5B] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
