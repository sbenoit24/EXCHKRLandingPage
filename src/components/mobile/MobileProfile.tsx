import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { 
  User,
  Bell,
  Lock,
  HelpCircle,
  LogOut,
  ChevronRight,
  Settings,
  CreditCard,
  Shield,
  Mail,
  Smartphone
} from 'lucide-react'

export function MobileProfile() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#122B5B] text-white px-4 pt-12 pb-8">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-3 border-4 border-white/20">
            <AvatarFallback className="bg-white text-[#122B5B] text-2xl">
              L
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl mb-1">Luca</h1>
          <p className="text-sm opacity-90 mb-1">Treasurer</p>
          <p className="text-xs opacity-75">Syracuse Film Club</p>
        </div>
      </div>

      <div className="px-4 -mt-4 mb-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[#122B5B]">48</p>
                <p className="text-xs text-muted-foreground">Members</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#122B5B]">12</p>
                <p className="text-xs text-muted-foreground">Events</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#122B5B]">$12k</p>
                <p className="text-xs text-muted-foreground">Budget</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 space-y-6">
        {/* Account Settings */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-3 px-1">ACCOUNT</h3>
          <Card className="border-0 shadow">
            <CardContent className="p-0">
              <button className="w-full flex items-center justify-between p-4 border-b active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#B8DFFF]">
                    <User className="h-4 w-4 text-[#122B5B]" />
                  </div>
                  <span className="text-sm font-medium">Profile Information</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button className="w-full flex items-center justify-between p-4 border-b active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#B8DFFF]">
                    <Mail className="h-4 w-4 text-[#122B5B]" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-xs text-muted-foreground">luca@email.com</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button className="w-full flex items-center justify-between p-4 active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#B8DFFF]">
                    <Lock className="h-4 w-4 text-[#122B5B]" />
                  </div>
                  <span className="text-sm font-medium">Change Password</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-3 px-1">PREFERENCES</h3>
          <Card className="border-0 shadow">
            <CardContent className="p-0">
              <button className="w-full flex items-center justify-between p-4 border-b active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#c39a4e]/20">
                    <Bell className="h-4 w-4 text-[#c39a4e]" />
                  </div>
                  <span className="text-sm font-medium">Notifications</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button className="w-full flex items-center justify-between p-4 border-b active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#c39a4e]/20">
                    <CreditCard className="h-4 w-4 text-[#c39a4e]" />
                  </div>
                  <span className="text-sm font-medium">Payment Methods</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button className="w-full flex items-center justify-between p-4 active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#c39a4e]/20">
                    <Shield className="h-4 w-4 text-[#c39a4e]" />
                  </div>
                  <span className="text-sm font-medium">Privacy & Security</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Organization */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-3 px-1">ORGANIZATION</h3>
          <Card className="border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-xl bg-[#122B5B] flex items-center justify-center">
                  <span className="text-white font-bold">SF</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">Syracuse Film Club</h4>
                  <p className="text-xs text-muted-foreground">Syracuse University</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Settings className="mr-1.5 h-3 w-3" />
                  Settings
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Smartphone className="mr-1.5 h-3 w-3" />
                  Invite
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-3 px-1">SUPPORT</h3>
          <Card className="border-0 shadow">
            <CardContent className="p-0">
              <button className="w-full flex items-center justify-between p-4 border-b active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Help Center</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button className="w-full flex items-center justify-between p-4 active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Contact Support</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Logout */}
        <Button 
          variant="outline" 
          className="w-full h-12 text-red-600 border-red-200 hover:bg-red-50"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Sign Out
        </Button>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground pb-6">
          EXCHKR v1.0.0
        </p>
      </div>
    </div>
  )
}
