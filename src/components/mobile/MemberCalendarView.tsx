import { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { 
  Calendar as CalendarIcon,
  MapPin,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  X,
  Info,
  Share2,
  ArrowLeft,
  Image as ImageIcon
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { EventPhotosModal } from '../EventPhotosModal'

interface MemberEvent {
  id: number
  title: string
  date: Date
  time?: string
  type: 'event' | 'social' | 'workshop' | 'formal' | 'screening' | 'meeting'
  attendees?: number
  maxCapacity?: number
  location?: string
  description?: string
  rsvpStatus: 'confirmed' | 'pending' | 'none'
  photoCount?: number
}

export function MemberCalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<MemberEvent | null>(null)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [showPhotosModal, setShowPhotosModal] = useState(false)
  const [photosEvent, setPhotosEvent] = useState<MemberEvent | null>(null)

  const [events, setEvents] = useState<MemberEvent[]>([
    {
      id: 1,
      title: 'Student Film Festival',
      date: new Date(2024, 10, 15),
      time: '7:00 PM',
      type: 'formal',
      attendees: 120,
      maxCapacity: 150,
      location: 'University Theater',
      description: 'Annual student film festival showcasing member short films. Formal attire recommended.',
      rsvpStatus: 'none',
      photoCount: 24
    },
    {
      id: 2,
      title: 'Documentary Screening',
      date: new Date(2024, 10, 22),
      time: '9:00 AM',
      type: 'screening',
      attendees: 180,
      maxCapacity: 200,
      location: 'Campus Center Cinema',
      description: 'Charity screening fundraiser for local arts organization.',
      rsvpStatus: 'confirmed',
      photoCount: 12
    },
    {
      id: 3,
      title: 'Cinematography Workshop',
      date: new Date(2024, 10, 25),
      time: '6:00 PM',
      type: 'workshop',
      attendees: 65,
      maxCapacity: 75,
      location: 'Media Arts 301',
      description: 'Professional cinematography and lighting workshop with guest instructor.',
      rsvpStatus: 'none',
      photoCount: 18
    },
    {
      id: 4,
      title: 'Industry Mixer',
      date: new Date(2024, 11, 5),
      time: '6:30 PM',
      type: 'social',
      attendees: 90,
      maxCapacity: 150,
      location: 'Campus Center',
      description: 'Network with alumni and film industry professionals. Business casual attire.',
      rsvpStatus: 'none',
      photoCount: 0
    },
    {
      id: 5,
      title: 'Board Meeting',
      date: new Date(2024, 10, 8),
      time: '5:00 PM',
      type: 'meeting',
      attendees: 12,
      maxCapacity: 12,
      location: 'Virtual - Zoom',
      description: 'Monthly board meeting (Officers only)',
      rsvpStatus: 'none'
    }
  ])

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const getDaysArray = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    
    return days
  }

  const getEventsForDate = (day: number) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    return events.filter(event => {
      const eventDate = event.date
      return eventDate.getFullYear() === year && 
             eventDate.getMonth() === month && 
             eventDate.getDate() === day
    })
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December']

  const getEventColor = (type: string) => {
    switch (type) {
      case 'screening':
        return 'bg-[#122B5B] text-white border-[#122B5B]'
      case 'social':
        return 'bg-[#B8DFFF] text-[#122B5B] border-[#B8DFFF]'
      case 'workshop':
        return 'bg-[#c39a4e] text-white border-[#c39a4e]'
      case 'formal':
        return 'bg-[#122B5B] text-white border-[#122B5B]'
      case 'event':
        return 'bg-[#122B5B] text-white border-[#122B5B]'
      case 'meeting':
        return 'bg-gray-400 text-white border-gray-400'
      default:
        return 'bg-gray-500 text-white border-gray-500'
    }
  }

  const isToday = (day: number) => {
    const today = new Date()
    return today.getFullYear() === currentDate.getFullYear() &&
           today.getMonth() === currentDate.getMonth() &&
           today.getDate() === day
  }

  const handleRSVP = (event: MemberEvent) => {
    setEvents(events.map(e => {
      if (e.id === event.id) {
        const newStatus = e.rsvpStatus === 'confirmed' ? 'none' : 'confirmed'
        const newAttendees = e.attendees! + (newStatus === 'confirmed' ? 1 : -1)
        const updatedEvent = { ...e, rsvpStatus: newStatus, attendees: newAttendees }
        setSelectedEvent(updatedEvent)
        toast.success(newStatus === 'confirmed' ? 'RSVP confirmed!' : 'RSVP cancelled')
        return updatedEvent
      }
      return e
    }))
  }

  const handleViewEventDetails = (event: MemberEvent) => {
    setSelectedEvent(event)
    setShowEventDetails(true)
  }

  const handleShare = (event: MemberEvent) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Join me at ${event.title} on ${event.date.toLocaleDateString()}!`,
        url: window.location.href
      })
    } else {
      toast.success('Event link copied!')
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="px-4 pt-12 pb-4">
            <h1 className="text-2xl mb-4">Event Calendar</h1>
            
            {/* Month Navigation */}
            <div className="flex justify-between items-center">
              <h2 className="font-medium">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={previousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentDate(new Date())}
                >
                  Today
                </Button>
                <Button variant="outline" size="sm" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="px-4 py-4">
          <Card className="border-0 shadow">
            <CardContent className="p-3">
              <div className="grid grid-cols-7 gap-1">
                {/* Day headers */}
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                  <div key={idx} className="text-center text-xs text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {getDaysArray().map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square bg-gray-50/50 rounded" />
                  }
                  
                  const dayEvents = getEventsForDate(day)
                  
                  return (
                    <div
                      key={day}
                      className={`aspect-square border rounded p-1 flex flex-col ${
                        isToday(day) ? 'bg-[#B8DFFF]/20 border-[#122B5B]' : 'bg-white'
                      }`}
                    >
                      <span className={`text-xs text-center ${isToday(day) ? 'text-[#122B5B]' : ''}`}>
                        {day}
                      </span>
                      
                      <div className="flex-1 flex flex-col gap-0.5 mt-0.5">
                        {dayEvents.slice(0, 2).map(event => (
                          <button
                            key={event.id}
                            className={`w-full h-1.5 rounded ${getEventColor(event.type).split(' ')[0]}`}
                            onClick={() => handleViewEventDetails(event)}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events List */}
        <div className="px-4 pb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">UPCOMING EVENTS</h3>
          <div className="space-y-3">
            {events
              .filter(e => e.date >= new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map(event => {
                const spotsLeft = event.maxCapacity ? event.maxCapacity - event.attendees! : 0
                const almostFull = spotsLeft <= 10 && spotsLeft > 0

                return (
                  <Card 
                    key={event.id} 
                    className={`border-0 shadow cursor-pointer ${
                      event.rsvpStatus === 'confirmed' ? 'bg-green-50 border-l-4 border-l-green-600' : ''
                    }`}
                    onClick={() => handleViewEventDetails(event)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h4 className="font-medium">{event.title}</h4>
                            <Badge className={getEventColor(event.type) + ' text-xs'}>
                              {event.type}
                            </Badge>
                            {event.rsvpStatus === 'confirmed' && (
                              <Badge className="bg-green-600 text-white text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                RSVP'd
                              </Badge>
                            )}
                            {almostFull && (
                              <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">
                                {spotsLeft} spots left
                              </Badge>
                            )}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{event.date.toLocaleDateString()} at {event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                            {event.maxCapacity && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>{event.attendees} / {event.maxCapacity} attending</span>
                              </div>
                            )}
                            {event.photoCount && event.photoCount > 0 && (
                              <div className="flex items-center gap-2 text-sm text-[#122B5B]">
                                <ImageIcon className="h-4 w-4" />
                                <span>{event.photoCount} photos</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {event.photoCount && event.photoCount > 0 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            setPhotosEvent(event)
                            setShowPhotosModal(true)
                          }}
                          className="mt-3 w-full border-[#122B5B] text-[#122B5B]"
                        >
                          <ImageIcon className="h-4 w-4 mr-2" />
                          View Photos
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </div>
      </div>

      {/* Event Details Sheet */}
      {selectedEvent && (
        <Sheet open={showEventDetails} onOpenChange={setShowEventDetails}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
            <div className="sticky top-0 bg-white border-b z-10 rounded-t-3xl">
              <SheetHeader className="p-4 pb-3">
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowEventDetails(false)} className="p-2 -ml-2 active:bg-gray-100 rounded-full">
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
                  <CalendarIcon className="h-5 w-5 text-[#122B5B] mt-0.5" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })} at {selectedEvent.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#122B5B] mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{selectedEvent.location}</p>
                  </div>
                </div>

                {selectedEvent.maxCapacity && (
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-[#122B5B] mt-0.5" />
                    <div>
                      <p className="font-medium">Attendance</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedEvent.attendees} attending • {selectedEvent.maxCapacity - selectedEvent.attendees!} spots available
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {selectedEvent.description && (
                <div>
                  <h4 className="font-medium mb-2">About This Event</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>
              )}

              {selectedEvent.photoCount && selectedEvent.photoCount > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Event Photos</h4>
                  <Button
                    variant="outline"
                    className="w-full border-[#122B5B] text-[#122B5B] hover:bg-[#122B5B]/5 h-12"
                    onClick={() => {
                      setPhotosEvent(selectedEvent)
                      setShowPhotosModal(true)
                    }}
                  >
                    <ImageIcon className="mr-2 h-5 w-5" />
                    View {selectedEvent.photoCount} Photos
                  </Button>
                </div>
              )}

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
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t space-y-2">
              {selectedEvent.rsvpStatus === 'confirmed' ? (
                <Button 
                  className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50"
                  variant="outline"
                  onClick={() => {
                    handleRSVP(selectedEvent)
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

      {/* Event Photos Modal */}
      {photosEvent && (
        <EventPhotosModal
          isOpen={showPhotosModal}
          onClose={() => {
            setShowPhotosModal(false)
            setPhotosEvent(null)
          }}
          eventName={photosEvent.title}
          eventDate={photosEvent.date.toISOString()}
          canUpload={false}
        />
      )}
    </>
  )
}
