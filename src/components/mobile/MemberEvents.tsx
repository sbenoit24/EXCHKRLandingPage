import { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { 
  Calendar,
  MapPin,
  Users,
  Clock,
  Search,
  CheckCircle,
  X,
  Info,
  Share2,
  ArrowLeft
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  attendees: number
  maxCapacity: number
  rsvpStatus: 'confirmed' | 'pending' | 'none'
  type: 'screening' | 'social' | 'workshop' | 'formal'
}

export function MemberEvents() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const events: Event[] = [
    {
      id: 1,
      title: 'Student Film Festival',
      date: 'Mar 20, 2024',
      time: '7:00 PM',
      location: 'Goldstein Auditorium',
      description: 'Annual showcase of student films from across campus. Join us for an evening of creativity and celebration!',
      attendees: 75,
      maxCapacity: 150,
      rsvpStatus: 'confirmed',
      type: 'screening'
    },
    {
      id: 2,
      title: 'Industry Mixer',
      date: 'Mar 25, 2024',
      time: '6:30 PM',
      location: 'Schine Student Center',
      description: 'Network with film industry professionals and alumni. Business casual attire recommended.',
      attendees: 40,
      maxCapacity: 60,
      rsvpStatus: 'pending',
      type: 'social'
    },
    {
      id: 3,
      title: 'Cinematography Workshop',
      date: 'Mar 28, 2024',
      time: '5:00 PM',
      location: 'Newhouse Studio',
      description: 'Hands-on workshop covering lighting techniques and camera operation. Bring your creative ideas!',
      attendees: 25,
      maxCapacity: 30,
      rsvpStatus: 'none',
      type: 'workshop'
    },
    {
      id: 4,
      title: 'Spring Formal Gala',
      date: 'Apr 5, 2024',
      time: '8:00 PM',
      location: 'Drumlins Country Club',
      description: 'Our biggest event of the year! Formal attire required. Dinner and dancing included.',
      attendees: 120,
      maxCapacity: 150,
      rsvpStatus: 'none',
      type: 'formal'
    }
  ]

  const getEventColor = (type: string) => {
    switch (type) {
      case 'screening': return 'bg-[#122B5B] text-white'
      case 'social': return 'bg-[#B8DFFF] text-[#122B5B]'
      case 'workshop': return 'bg-[#c39a4e] text-white'
      case 'formal': return 'bg-purple-600 text-white'
      default: return 'bg-gray-200 text-gray-700'
    }
  }

  const handleRSVP = (event: Event) => {
    if (event.rsvpStatus === 'confirmed') {
      toast.success('RSVP cancelled')
    } else {
      toast.success('RSVP confirmed!')
    }
  }

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event)
    setShowDetails(true)
  }

  const handleShare = (event: Event) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Join me at ${event.title} on ${event.date}!`,
        url: window.location.href
      })
    } else {
      toast.success('Event link copied!')
    }
  }

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const upcomingEvents = filteredEvents.filter(e => e.rsvpStatus !== 'confirmed')
  const myEvents = filteredEvents.filter(e => e.rsvpStatus === 'confirmed')

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="px-4 pt-12 pb-4">
            <h1 className="text-2xl mb-4">Events</h1>
            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
          </div>
        </div>

        <div className="px-4 py-4 space-y-6">
          {/* My Events */}
          {myEvents.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-muted-foreground mb-3">MY EVENTS ({myEvents.length})</h2>
              {myEvents.map(event => (
                <Card key={event.id} className="mb-3 border-0 shadow bg-green-50 border-l-4 border-l-green-600">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{event.title}</h3>
                          <Badge className="bg-green-600 text-white text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            RSVP'd
                          </Badge>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date} at {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(event)}
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => handleRSVP(event)}
                      >
                        <X className="mr-1 h-4 w-4" />
                        Cancel RSVP
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Upcoming Events */}
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-3">UPCOMING EVENTS</h2>
            {upcomingEvents.map(event => {
              const spotsLeft = event.maxCapacity - event.attendees
              const almostFull = spotsLeft <= 10

              return (
                <Card key={event.id} className="mb-3 border-0 shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h3 className="font-medium">{event.title}</h3>
                          <Badge className={getEventColor(event.type) + ' text-xs'}>
                            {event.type}
                          </Badge>
                          {almostFull && (
                            <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">
                              {spotsLeft} spots left
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-1.5 mb-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date} at {event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{event.attendees} / {event.maxCapacity} attending</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        size="sm" 
                        className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                        onClick={() => handleRSVP(event)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        RSVP
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(event)}
                      >
                        <Info className="mr-2 h-4 w-4" />
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Event Details Sheet */}
      {selectedEvent && (
        <Sheet open={showDetails} onOpenChange={setShowDetails}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
            <div className="sticky top-0 bg-white border-b z-10 rounded-t-3xl">
              <SheetHeader className="p-4 pb-3">
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowDetails(false)} className="p-2 -ml-2 active:bg-gray-100 rounded-full">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <div className="flex-1">
                    <SheetTitle className="text-lg">{selectedEvent.title}</SheetTitle>
                  </div>
                  <button 
                    onClick={() => handleShare(selectedEvent)}
                    className="p-2 active:bg-gray-100 rounded-full"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </SheetHeader>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto h-full pb-32">
              <Badge className={getEventColor(selectedEvent.type) + ' text-sm'}>
                {selectedEvent.type}
              </Badge>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-[#122B5B] mt-0.5" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-sm text-muted-foreground">{selectedEvent.date} at {selectedEvent.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#122B5B] mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{selectedEvent.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-[#122B5B] mt-0.5" />
                  <div>
                    <p className="font-medium">Attendance</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.attendees} attending • {selectedEvent.maxCapacity - selectedEvent.attendees} spots available
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">About This Event</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              {selectedEvent.rsvpStatus === 'confirmed' && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      <p className="font-medium">You're going to this event!</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Fixed Bottom Button */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
              {selectedEvent.rsvpStatus === 'confirmed' ? (
                <Button 
                  className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50"
                  variant="outline"
                  onClick={() => {
                    handleRSVP(selectedEvent)
                    setShowDetails(false)
                  }}
                >
                  <X className="mr-2 h-5 w-5" />
                  Cancel RSVP
                </Button>
              ) : (
                <Button 
                  className="w-full h-12 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                  onClick={() => {
                    handleRSVP(selectedEvent)
                    setShowDetails(false)
                  }}
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  RSVP to Event
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}
