import { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { 
  Calendar,
  Users,
  DollarSign,
  Receipt,
  Bell,
  CheckCircle,
  Clock,
  MapPin,
  ArrowRight,
  TrendingUp
} from 'lucide-react'
import { ReceiptSubmissionModal } from './ReceiptSubmissionModal'

export function MemberDashboard() {
  const [showReceiptModal, setShowReceiptModal] = useState(false)

  const memberInfo = {
    name: 'Alex Rodriguez',
    status: 'Active Member',
    duesStatus: 'paid',
    nextDueDate: 'Sep 1, 2024',
    joinDate: 'Sep 2023'
  }

  const upcomingEvents = [
    { 
      id: 1, 
      title: 'Student Film Festival', 
      date: 'Mar 20', 
      time: '7:00 PM',
      location: 'Goldstein Auditorium',
      rsvpStatus: 'confirmed',
      attendees: 75
    },
    { 
      id: 2, 
      title: 'Industry Mixer', 
      date: 'Mar 25', 
      time: '6:30 PM',
      location: 'Schine Student Center',
      rsvpStatus: 'pending',
      attendees: 40
    }
  ]

  const recentActivity = [
    { id: 1, type: 'dues', message: 'Spring semester dues paid', date: 'Mar 1', icon: CheckCircle, color: 'text-green-600' },
    { id: 2, type: 'event', message: 'Checked in to Movie Screening', date: 'Mar 10', icon: Calendar, color: 'text-[#122B5B]' },
    { id: 3, type: 'receipt', message: 'Receipt approved - Workshop snacks', date: 'Mar 8', icon: Receipt, color: 'text-green-600' }
  ]

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-[#122B5B] text-white px-4 pt-12 pb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm opacity-90">Welcome back,</p>
              <h1 className="text-2xl mt-1">{memberInfo.name}</h1>
              <Badge className="mt-2 bg-white/20 border-0 text-white">
                {memberInfo.status}
              </Badge>
            </div>
            <button className="p-2 rounded-full bg-white/10 active:bg-white/20 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </button>
          </div>

          {/* Membership Status Card */}
          <Card className="bg-white/10 border-0 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {memberInfo.duesStatus === 'paid' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Clock className="h-5 w-5" />
                  )}
                  <span className="font-medium">
                    {memberInfo.duesStatus === 'paid' ? 'Dues Paid' : 'Dues Pending'}
                  </span>
                </div>
                <span className="text-sm opacity-90">Member since {memberInfo.joinDate}</span>
              </div>
              {memberInfo.duesStatus === 'paid' && (
                <p className="text-xs opacity-75">Next payment due: {memberInfo.nextDueDate}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="px-4 -mt-4 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <Button 
              className="h-14 bg-[#c39a4e] hover:bg-[#c39a4e]/90 text-white shadow-lg"
              onClick={() => setShowReceiptModal(true)}
            >
              <Receipt className="mr-2 h-5 w-5" />
              Submit Receipt
            </Button>
            <Button className="h-14 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white shadow-lg">
              <DollarSign className="mr-2 h-5 w-5" />
              Pay Dues
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 mb-6">
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-0 shadow">
              <CardContent className="p-4 text-center">
                <Calendar className="h-5 w-5 text-[#122B5B] mx-auto mb-2" />
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Events Attended</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow">
              <CardContent className="p-4 text-center">
                <Users className="h-5 w-5 text-[#122B5B] mx-auto mb-2" />
                <p className="text-2xl font-bold">48</p>
                <p className="text-xs text-muted-foreground">Club Members</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Points Earned</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Upcoming Events</h3>
            <button className="text-xs text-[#122B5B]">View All</button>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <Card key={event.id} className="border-0 shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{event.title}</h4>
                        {event.rsvpStatus === 'confirmed' && (
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            RSVP'd
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {event.rsvpStatus === 'pending' ? (
                    <Button size="sm" className="w-full bg-[#122B5B] hover:bg-[#122B5B]/90 text-white">
                      RSVP Now
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="w-full">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="px-4 mb-6">
          <h3 className="font-medium mb-3">Recent Activity</h3>
          <Card className="border-0 shadow">
            <CardContent className="p-0">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon
                return (
                  <div 
                    key={activity.id}
                    className={`flex items-center gap-3 p-4 ${
                      index !== recentActivity.length - 1 ? 'border-b' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-full bg-gray-100`}>
                      <Icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Help & Resources */}
        <div className="px-4 mb-6">
          <Card className="border-0 shadow bg-[#B8DFFF]/20">
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-2">💡 Member Resources</h4>
              <div className="space-y-2 text-sm">
                <button className="w-full text-left text-[#122B5B] hover:underline">
                  → How to submit receipts
                </button>
                <button className="w-full text-left text-[#122B5B] hover:underline">
                  → Event RSVP guidelines
                </button>
                <button className="w-full text-left text-[#122B5B] hover:underline">
                  → Contact club officers
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ReceiptSubmissionModal 
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
      />
    </>
  )
}
