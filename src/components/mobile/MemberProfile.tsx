import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { 
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Bell,
  Lock,
  HelpCircle,
  LogOut,
  ChevronRight,
  Settings,
  Receipt,
  CreditCard,
  FileText
} from 'lucide-react'

export function MemberProfile() {
  const memberInfo = {
    name: 'Alex Rodriguez',
    email: 'alex@email.com',
    phone: '(315) 555-0123',
    major: 'Television, Radio & Film',
    year: 'Junior',
    memberSince: 'Sep 2023',
    status: 'Active Member'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#122B5B] text-white px-4 pt-12 pb-8">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-3 border-4 border-white/20">
            <AvatarFallback className="bg-white text-[#122B5B] text-2xl">
              AR
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl mb-1">{memberInfo.name}</h1>
          <p className="text-sm opacity-90 mb-1">{memberInfo.major}</p>
          <Badge className="bg-white/20 border-0 text-white">
            {memberInfo.status}
          </Badge>
        </div>
      </div>

      <div className="px-4 -mt-4 mb-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[#122B5B]">{memberInfo.year}</p>
                <p className="text-xs text-muted-foreground">Class Year</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#122B5B]">8</p>
                <p className="text-xs text-muted-foreground">Events Attended</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 space-y-6">
        {/* Personal Info */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-3 px-1">PERSONAL INFORMATION</h3>
          <Card className="border-0 shadow">
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">{memberInfo.email}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{memberInfo.phone}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Major</p>
                    <p className="text-sm font-medium">{memberInfo.major}</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Member Since</p>
                    <p className="text-sm font-medium">{memberInfo.memberSince}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Activity */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-3 px-1">MY ACTIVITY</h3>
          <Card className="border-0 shadow">
            <CardContent className="p-0">
              <button className="w-full flex items-center justify-between p-4 border-b active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#B8DFFF]">
                    <Receipt className="h-4 w-4 text-[#122B5B]" />
                  </div>
                  <span className="text-sm font-medium">My Receipts</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button className="w-full flex items-center justify-between p-4 border-b active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#B8DFFF]">
                    <Calendar className="h-4 w-4 text-[#122B5B]" />
                  </div>
                  <span className="text-sm font-medium">Event History</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button className="w-full flex items-center justify-between p-4 active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#B8DFFF]">
                    <CreditCard className="h-4 w-4 text-[#122B5B]" />
                  </div>
                  <span className="text-sm font-medium">Payment History</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Settings */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-3 px-1">SETTINGS</h3>
          <Card className="border-0 shadow">
            <CardContent className="p-0">
              <button className="w-full flex items-center justify-between p-4 border-b active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#c39a4e]/20">
                    <User className="h-4 w-4 text-[#c39a4e]" />
                  </div>
                  <span className="text-sm font-medium">Edit Profile</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button className="w-full flex items-center justify-between p-4 border-b active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#c39a4e]/20">
                    <Bell className="h-4 w-4 text-[#c39a4e]" />
                  </div>
                  <span className="text-sm font-medium">Notifications</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button className="w-full flex items-center justify-between p-4 active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#c39a4e]/20">
                    <Lock className="h-4 w-4 text-[#c39a4e]" />
                  </div>
                  <span className="text-sm font-medium">Privacy & Security</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Club Info */}
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-3 px-1">CLUB</h3>
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
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t">
                <div>
                  <p className="text-lg font-bold text-[#122B5B]">48</p>
                  <p className="text-xs text-muted-foreground">Members</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-[#122B5B]">12</p>
                  <p className="text-xs text-muted-foreground">Events</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-[#122B5B]">Est. 2018</p>
                  <p className="text-xs text-muted-foreground">Founded</p>
                </div>
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

              <button className="w-full flex items-center justify-between p-4 border-b active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Club Policies</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button className="w-full flex items-center justify-between p-4 active:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Contact Officers</span>
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
