import { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  Plus,
  QrCode,
  MapPin,
  Users,
  DollarSign,
  Clock,
  Search,
  Calendar,
  ChevronRight,
  Filter
} from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { MobileCheckIn } from './MobileCheckIn'

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  attendees: number
  budget: number
  spent: number
  type: 'screening' | 'social' | 'workshop' | 'formal'
}

export function MobileEvents() {
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const events: Event[] = [
    {
      id: 1,
      title: 'Student Film Festival',
      date: 'Mar 20, 2024',
      time: '7:00 PM',
      location: 'Goldstein Auditorium',
      attendees: 75,
      budget: 2500,
      spent: 1200,
      type: 'screening'
    },
    {
      id: 2,
      title: 'Industry Mixer',
      date: 'Mar 25, 2024',
      time: '6:30 PM',
      location: 'Schine Student Center',
      attendees: 40,
      budget: 800,
      spent: 450,
      type: 'social'
    },
    {
      id: 3,
      title: 'Cinematography Workshop',
      date: 'Mar 28, 2024',
      time: '5:00 PM',
      location: 'Newhouse Studio',
      attendees: 25,
      budget: 300,
      spent: 150,
      type: 'workshop'
    },
    {
      id: 4,
      title: 'Spring Formal Gala',
      date: 'Apr 5, 2024',
      time: '8:00 PM',
      location: 'Drumlins Country Club',
      attendees: 120,
      budget: 5000,
      spent: 2800,
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

  const handleCheckIn = (event: Event) => {
    setSelectedEvent(event)
    setShowCheckIn(true)
  }

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="px-4 pt-12 pb-4">
            <h1 className="text-2xl mb-4">Events</h1>
            
            {/* Search Bar */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button 
                className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white h-11"
                onClick={() => {
                  if (filteredEvents.length > 0) {
                    handleCheckIn(filteredEvents[0])
                  }
                }}
              >
                <QrCode className="mr-2 h-5 w-5" />
                Quick Check-In
              </Button>
              <Button variant="outline" className="h-11">
                <Plus className="mr-2 h-5 w-5" />
                New Event
              </Button>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="px-4 py-4 space-y-4">
          {/* Upcoming Section */}
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-3">UPCOMING</h2>
            {filteredEvents.slice(0, 2).map(event => (
              <Card key={event.id} className="mb-3 border-0 shadow active:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{event.title}</h3>
                        <Badge className={getEventColor(event.type) + ' text-xs'}>
                          {event.type}
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
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            {event.attendees} people
                          </span>
                          <span className="flex items-center gap-1.5">
                            <DollarSign className="h-4 w-4" />
                            ${event.spent} / ${event.budget}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Budget Progress */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">Budget Used</span>
                      <span className="font-medium">
                        {Math.round((event.spent / event.budget) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#122B5B]"
                        style={{ width: `${Math.min((event.spent / event.budget) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      size="sm" 
                      className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                      onClick={() => handleCheckIn(event)}
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      Check-In
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Past Events */}
          {filteredEvents.length > 2 && (
            <div>
              <h2 className="text-sm font-medium text-muted-foreground mb-3">LATER</h2>
              {filteredEvents.slice(2).map(event => (
                <Card key={event.id} className="mb-3 border-0 shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <Badge className={getEventColor(event.type) + ' text-xs'}>
                            {event.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {event.attendees}
                          </span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleCheckIn(event)}
                      >
                        <QrCode className="h-5 w-5 text-[#122B5B]" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Check-In Sheet */}
      {selectedEvent && (
        <MobileCheckIn
          isOpen={showCheckIn}
          onClose={() => {
            setShowCheckIn(false)
            setSelectedEvent(null)
          }}
          event={selectedEvent}
        />
      )}
    </>
  )
}
