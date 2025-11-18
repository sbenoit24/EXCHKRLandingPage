import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Calendar, List, Users, DollarSign, CheckCircle, Clock, AlertCircle, Image } from 'lucide-react'
import { EventPhotosModal } from '../EventPhotosModal'

interface AdminEventsHubProps {
  selectedOrg: string
}

export function AdminEventsHub({ selectedOrg }: AdminEventsHubProps) {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list')
  const [selectedEventForPhotos, setSelectedEventForPhotos] = useState<any>(null)

  const events = [
    { id: 1, name: 'Fall Workshop', club: 'Robotics Club', campus: 'Stanford', date: '2024-11-15', attendees: 45, budget: 500, status: 'Upcoming', approval: 'Approved', photoCount: 0 },
    { id: 2, name: 'Networking Night', club: 'Student Government', campus: 'Berkeley', date: '2024-11-18', attendees: 78, budget: 350, status: 'Upcoming', approval: 'Approved', photoCount: 0 },
    { id: 3, name: 'Chess Tournament', club: 'Chess Club', campus: 'MIT', date: '2024-11-12', attendees: 32, budget: 200, status: 'Upcoming', approval: 'Pending', photoCount: 0 },
    { id: 4, name: 'Dance Showcase', club: 'Dance Team', campus: 'Harvard', date: '2024-11-01', attendees: 120, budget: 1200, status: 'Completed', approval: 'Approved', photoCount: 6 },
    { id: 5, name: 'Debate Finals', club: 'Debate Society', campus: 'Stanford', date: '2024-10-28', attendees: 85, budget: 450, status: 'Completed', approval: 'Approved', photoCount: 12 },
    { id: 6, name: 'Environmental Fair', club: 'Environmental Action', campus: 'Berkeley', date: '2024-11-20', attendees: 150, budget: 800, status: 'Upcoming', approval: 'Approved', photoCount: 0 }
  ]

  const upcomingEvents = events.filter(e => e.status === 'Upcoming')
  const completedEvents = events.filter(e => e.status === 'Completed')
  const pendingApproval = events.filter(e => e.approval === 'Pending')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Events Hub</h1>
          <p className="text-muted-foreground">
            Monitor and manage all events across your organization network
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('calendar')}
            className={viewMode === 'calendar' ? 'bg-[#122B5B] hover:bg-[#122B5B]/90 text-white' : ''}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Calendar
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-[#122B5B] hover:bg-[#122B5B]/90 text-white' : ''}
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Total Events</p>
              <div className="p-2 rounded-full bg-[#122B5B]/10">
                <Calendar className="h-5 w-5 text-[#122B5B]" />
              </div>
            </div>
            <p className="text-3xl mb-1">{events.length}</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Upcoming</p>
              <div className="p-2 rounded-full bg-blue-500/10">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl mb-1">{upcomingEvents.length}</p>
            <p className="text-xs text-muted-foreground">Events scheduled</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Total Attendees</p>
              <div className="p-2 rounded-full bg-[#B8DFFF]/50">
                <Users className="h-5 w-5 text-[#122B5B]" />
              </div>
            </div>
            <p className="text-3xl mb-1">{events.reduce((sum, e) => sum + e.attendees, 0)}</p>
            <p className="text-xs text-muted-foreground">Across all events</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Pending Approval</p>
              <div className="p-2 rounded-full bg-amber-500/10">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <p className="text-3xl mb-1">{pendingApproval.length}</p>
            <p className="text-xs text-muted-foreground">Need review</p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals */}
      {pendingApproval.length > 0 && (
        <Card className="border-l-4 border-l-amber-500 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Events Awaiting Approval
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingApproval.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium">{event.name}</span>
                      <Badge variant="outline" className="text-xs">{event.club}</Badge>
                      <Badge variant="outline" className="text-xs">{event.campus}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {event.attendees} expected
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        ${event.budget} budget
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                      Reject
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Events List */}
      <div className="space-y-6">
        {/* Upcoming Events */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Upcoming Events ({upcomingEvents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-lg">{event.name}</h3>
                        <Badge className={
                          event.approval === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }>
                          {event.approval}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-muted-foreground">{event.club}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{event.campus}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {event.attendees} attendees
                        </span>
                        <span className="flex items-center gap-1 text-[#c39a4e]">
                          <DollarSign className="h-4 w-4" />
                          ${event.budget} budget
                        </span>
                        {event.photoCount > 0 && (
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Image className="h-4 w-4" />
                            {event.photoCount} photos
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedEventForPhotos(event)}
                      >
                        <Image className="h-4 w-4 mr-2" />
                        Photos
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completed Events */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Completed Events ({completedEvents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedEvents.map((event) => (
                <div key={event.id} className="p-4 rounded-lg border bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{event.name}</h3>
                        <Badge className="bg-gray-100 text-gray-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-muted-foreground">{event.club}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{event.campus}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {event.attendees} attended
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          ${event.budget} spent
                        </span>
                        {event.photoCount > 0 && (
                          <span className="flex items-center gap-1 text-[#122B5B]">
                            <Image className="h-4 w-4" />
                            {event.photoCount} photos
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedEventForPhotos(event)}
                        className={event.photoCount > 0 ? 'border-[#122B5B] text-[#122B5B]' : ''}
                      >
                        <Image className="h-4 w-4 mr-2" />
                        {event.photoCount > 0 ? `View ${event.photoCount}` : 'Add'} Photos
                      </Button>
                      <Button variant="ghost" size="sm">
                        View Report
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Photos Modal */}
      {selectedEventForPhotos && (
        <EventPhotosModal
          isOpen={true}
          onClose={() => setSelectedEventForPhotos(null)}
          eventName={selectedEventForPhotos.name}
          eventDate={selectedEventForPhotos.date}
          canUpload={true}
        />
      )}
    </div>
  )
}
