import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { 
  Calendar as CalendarIcon,
  Users,
  MapPin,
  Search,
  LogOut,
  CheckCircle,
  X,
  Mail,
  Phone,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Share2,
  Wallet,
  DollarSign,
  Heart,
  Receipt,
  Upload,
  CreditCard,
  Download,
  Camera,
  Image as ImageIcon,
  FileText,
  Clock,
  MessageCircle,
  Send,
  Circle
} from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { toast } from 'sonner@2.0.3'
import { EventPhotosModal } from './EventPhotosModal'
import { MemberMessagesView } from './MemberMessagesView'

interface Event {
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

interface Member {
  id: number
  name: string
  email: string
  phone?: string
  major: string
  year?: string
  role: string
  linkedin?: string
  status: 'active' | 'alumni'
  gradYear?: string
  occupation?: string
  company?: string
  location?: string
}

export function MemberDesktopView({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'calendar' | 'members' | 'payments' | 'messages'>('calendar')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Payment states
  const [showDuesPayment, setShowDuesPayment] = useState(false)
  const [showDonationDialog, setShowDonationDialog] = useState(false)
  const [showReceiptDialog, setShowReceiptDialog] = useState(false)
  const [donationAmount, setDonationAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  
  // Receipt submission states
  const [receiptAmount, setReceiptAmount] = useState('')
  const [receiptDescription, setReceiptDescription] = useState('')
  const [receiptDate, setReceiptDate] = useState('')
  const [receiptCategory, setReceiptCategory] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  
  // Photo states
  const [showPhotosModal, setShowPhotosModal] = useState(false)
  const [photosEvent, setPhotosEvent] = useState<Event | null>(null)

  const [events, setEvents] = useState<Event[]>([
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
    }
  ])

  const members: Member[] = [
    { 
      id: 1, 
      name: 'Luca', 
      email: 'luca@email.com',
      phone: '(315) 555-0100',
      major: 'Film & Media Studies', 
      year: 'Senior',
      role: 'Treasurer',
      linkedin: 'linkedin.com/in/luca',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Alex Rodriguez', 
      email: 'alex@email.com',
      major: 'Television, Radio & Film', 
      year: 'Junior',
      role: 'Member',
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Jamie Park', 
      email: 'jamie@email.com',
      major: 'Film Production', 
      year: 'Sophomore',
      role: 'Member',
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Emily Davis', 
      email: 'emily@email.com',
      phone: '(315) 555-0103',
      major: 'Communications', 
      year: 'Junior',
      role: 'Vice President',
      linkedin: 'linkedin.com/in/emilydavis',
      status: 'active'
    },
    { 
      id: 5, 
      name: 'Michael Chen', 
      email: 'michael@email.com',
      major: 'Film Production',
      role: 'Alumni',
      status: 'alumni',
      gradYear: '2022',
      occupation: 'Production Assistant',
      company: 'HBO',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/michaelchen'
    },
    { 
      id: 6, 
      name: 'David Lee', 
      email: 'david@email.com',
      major: 'Cinematography', 
      year: 'Senior',
      role: 'President',
      phone: '(315) 555-0106',
      linkedin: 'linkedin.com/in/davidlee',
      status: 'active'
    }
  ]

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
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    
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
        return 'bg-[#122B5B] text-white'
      case 'social':
        return 'bg-[#B8DFFF] text-[#122B5B]'
      case 'workshop':
        return 'bg-[#c39a4e] text-white'
      case 'formal':
        return 'bg-[#122B5B] text-white'
      case 'event':
        return 'bg-[#122B5B] text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const isToday = (day: number) => {
    const today = new Date()
    return today.getFullYear() === currentDate.getFullYear() &&
           today.getMonth() === currentDate.getMonth() &&
           today.getDate() === day
  }

  // Payment data
  const currentDues = {
    period: 'Spring 2024',
    amount: 150,
    status: 'paid',
    paidDate: 'Feb 28, 2024'
  }

  const upcomingDues = {
    period: 'Fall 2024',
    amount: 150,
    dueDate: 'Sep 15, 2024',
    status: 'pending'
  }

  const recentPayments = [
    { id: 1, type: 'Dues', period: 'Spring 2024', amount: 150, date: 'Feb 28, 2024', status: 'completed' },
    { id: 2, type: 'Donation', period: 'Film Festival Fund', amount: 25, date: 'Feb 15, 2024', status: 'completed' },
    { id: 3, type: 'Dues', period: 'Fall 2023', amount: 150, date: 'Sep 10, 2023', status: 'completed' }
  ]

  const receiptCategories = [
    'Event Supplies',
    'Food & Beverages',
    'Equipment',
    'Transportation',
    'Marketing Materials',
    'Other'
  ]

  const suggestedDonationAmounts = ['10', '25', '50', '100']

  // Payment handlers
  const handleDuesPayment = (method: string) => {
    toast.success('Payment processed successfully!')
    setShowDuesPayment(false)
  }

  const handleDonation = (method: string) => {
    const amount = donationAmount === 'custom' ? customAmount : donationAmount
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }
    toast.success(`Thank you for your $${amount} donation!`)
    setShowDonationDialog(false)
    setDonationAmount('')
    setCustomAmount('')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      toast.success('Receipt uploaded')
    }
  }

  const handleReceiptSubmit = () => {
    if (!receiptAmount || !receiptDescription || !receiptDate || !receiptCategory) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!uploadedFile) {
      toast.error('Please upload a receipt image')
      return
    }

    toast.success('Receipt submitted for approval!')
    
    // Reset form
    setReceiptAmount('')
    setReceiptDescription('')
    setReceiptDate('')
    setReceiptCategory('')
    setUploadedFile(null)
    setShowReceiptDialog(false)
  }

  const handleRSVP = (event: Event) => {
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

  const handleViewEventDetails = (event: Event) => {
    setSelectedEvent(event)
    setShowEventDetails(true)
  }

  const handleShare = (event: Event) => {
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

  const filteredMembers = members.filter(member => {
    const query = searchQuery.toLowerCase()
    return member.name.toLowerCase().includes(query) ||
           member.email.toLowerCase().includes(query) ||
           member.major.toLowerCase().includes(query) ||
           (member.company?.toLowerCase().includes(query))
  })

  const activeMembers = filteredMembers.filter(m => m.status === 'active')
  const alumni = filteredMembers.filter(m => m.status === 'alumni')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-[#122B5B] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">EX</span>
              </div>
              <div>
                <h1 className="text-xl">EXCHKR</h1>
                <p className="text-xs text-muted-foreground">Member Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge className="bg-[#B8DFFF] text-[#122B5B]">
                Club Member
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-4">
            <TabsTrigger value="calendar" className="gap-2">
              <CalendarIcon className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="members" className="gap-2">
              <Users className="h-4 w-4" />
              Members
            </TabsTrigger>
            <TabsTrigger value="payments" className="gap-2">
              <Wallet className="h-4 w-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="messages" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl">Event Calendar</h2>
                <p className="text-muted-foreground mt-1">
                  View and RSVP to upcoming club events
                </p>
              </div>
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

            {/* Calendar Grid */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {/* Day headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center font-medium text-sm text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {getDaysArray().map((day, index) => {
                    if (day === null) {
                      return <div key={`empty-${index}`} className="min-h-[100px] bg-gray-50 rounded-lg" />
                    }
                    
                    const dayEvents = getEventsForDate(day)
                    
                    return (
                      <div
                        key={day}
                        className={`min-h-[100px] border rounded-lg p-2 hover:bg-gray-50 transition-colors ${
                          isToday(day) ? 'bg-[#B8DFFF]/20 border-[#122B5B]' : 'bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-sm font-medium ${isToday(day) ? 'text-[#122B5B]' : ''}`}>
                            {day}
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          {dayEvents.map(event => (
                            <div
                              key={event.id}
                              className={`text-xs p-1.5 rounded ${getEventColor(event.type)} cursor-pointer hover:opacity-80 transition-opacity`}
                              onClick={() => handleViewEventDetails(event)}
                            >
                              <div className="font-medium truncate">{event.title}</div>
                              {event.time && (
                                <div className="text-xs opacity-90">{event.time}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events List */}
            <div>
              <h3 className="font-medium mb-4">Upcoming Events</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events
                  .filter(e => e.date >= new Date())
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map(event => {
                    const spotsLeft = event.maxCapacity ? event.maxCapacity - event.attendees! : 0
                    const almostFull = spotsLeft <= 10 && spotsLeft > 0

                    return (
                      <Card 
                        key={event.id} 
                        className={`border-0 shadow cursor-pointer hover:shadow-lg transition-shadow ${
                          event.rsvpStatus === 'confirmed' ? 'border-l-4 border-l-green-600' : ''
                        }`}
                        onClick={() => handleViewEventDetails(event)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-medium">{event.title}</h4>
                              {event.rsvpStatus === 'confirmed' && (
                                <Badge className="bg-green-600 text-white text-xs shrink-0">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  RSVP'd
                                </Badge>
                              )}
                            </div>
                            
                            <div className="space-y-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{event.date.toLocaleDateString()} at {event.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                              {event.maxCapacity && (
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4" />
                                  <span>{event.attendees} / {event.maxCapacity} attending</span>
                                </div>
                              )}
                              {event.photoCount && event.photoCount > 0 && (
                                <div className="flex items-center gap-2">
                                  <ImageIcon className="h-4 w-4 text-[#122B5B]" />
                                  <span className="text-[#122B5B]">{event.photoCount} photos</span>
                                </div>
                              )}
                            </div>

                            <div className="flex gap-2 flex-wrap">
                              <Badge className={getEventColor(event.type) + ' text-xs'}>
                                {event.type}
                              </Badge>
                              {almostFull && (
                                <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">
                                  {spotsLeft} spots left
                                </Badge>
                              )}
                              {event.photoCount && event.photoCount > 0 && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setPhotosEvent(event)
                                    setShowPhotosModal(true)
                                  }}
                                  className="h-6 text-xs border-[#122B5B] text-[#122B5B]"
                                >
                                  <ImageIcon className="h-3 w-3 mr-1" />
                                  View Photos
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl">Member Directory</h2>
                <p className="text-muted-foreground mt-1">
                  Connect with fellow club members and alumni
                </p>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#122B5B]" />
                  <span className="text-muted-foreground">{activeMembers.length} Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#c39a4e]" />
                  <span className="text-muted-foreground">{alumni.length} Alumni</span>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Members Grid */}
            <div className="space-y-6">
              {activeMembers.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">Active Members</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeMembers.map(member => (
                      <Card key={member.id} className="border-0 shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-[#122B5B] text-white">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{member.name}</h4>
                              <p className="text-sm text-muted-foreground truncate">{member.major}</p>
                              <div className="flex items-center gap-2 mt-1">
                                {member.year && (
                                  <Badge variant="secondary" className="text-xs">
                                    {member.year}
                                  </Badge>
                                )}
                                {member.role !== 'Member' && (
                                  <Badge className="bg-[#122B5B] text-white text-xs">
                                    {member.role}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 text-xs">
                            <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-[#122B5B] hover:underline">
                              <Mail className="h-3 w-3" />
                              <span className="truncate">{member.email}</span>
                            </a>
                            {member.phone && (
                              <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-[#122B5B] hover:underline">
                                <Phone className="h-3 w-3" />
                                <span>{member.phone}</span>
                              </a>
                            )}
                            {member.linkedin && (
                              <a href={`https://${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#122B5B] hover:underline">
                                <Linkedin className="h-3 w-3" />
                                <span className="truncate">LinkedIn</span>
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {alumni.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">Alumni Network</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {alumni.map(member => (
                      <Card key={member.id} className="border-0 shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-[#c39a4e] text-white">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{member.name}</h4>
                              <p className="text-sm text-muted-foreground truncate">{member.major}</p>
                              <Badge className="bg-[#c39a4e] text-white text-xs mt-1">
                                Alumni '{member.gradYear?.slice(-2)}
                              </Badge>
                            </div>
                          </div>

                          {member.occupation && (
                            <div className="mb-3 pb-3 border-b text-sm">
                              <p className="font-medium">{member.occupation}</p>
                              {member.company && (
                                <p className="text-xs text-muted-foreground">{member.company}</p>
                              )}
                              {member.location && (
                                <p className="text-xs text-muted-foreground mt-1">{member.location}</p>
                              )}
                            </div>
                          )}

                          <div className="space-y-2 text-xs">
                            <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-[#122B5B] hover:underline">
                              <Mail className="h-3 w-3" />
                              <span className="truncate">{member.email}</span>
                            </a>
                            {member.linkedin && (
                              <a href={`https://${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#122B5B] hover:underline">
                                <Linkedin className="h-3 w-3" />
                                <span className="truncate">LinkedIn</span>
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div>
              <h2 className="text-2xl">Payments</h2>
              <p className="text-muted-foreground mt-1">
                Manage dues, donations, and receipt submissions
              </p>
            </div>

            {/* Current Dues Status */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-[#122B5B] to-[#1a3d7a] text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {currentDues.status === 'paid' ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <Clock className="h-6 w-6" />
                  )}
                  <h2 className="text-xl">
                    {currentDues.status === 'paid' ? 'Membership Active' : 'Payment Due'}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm opacity-90">Current Period</p>
                    <p className="font-medium mt-1">{currentDues.period}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Amount</p>
                    <p className="text-lg mt-1">${currentDues.amount}</p>
                  </div>
                  {currentDues.status === 'paid' && currentDues.paidDate && (
                    <div className="col-span-2">
                      <p className="text-sm opacity-90">Paid On</p>
                      <p className="font-medium mt-1">{currentDues.paidDate}</p>
                    </div>
                  )}
                </div>

                {currentDues.status === 'paid' && (
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-xs opacity-75">Next payment due: {upcomingDues.dueDate}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div>
              <h3 className="font-medium mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {upcomingDues.status === 'pending' && (
                  <Card 
                    className="border-0 shadow cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setShowDuesPayment(true)}
                  >
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-full bg-[#122B5B] flex items-center justify-center mb-4">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-medium mb-2">Pay Dues</h4>
                      <p className="text-sm text-muted-foreground">${upcomingDues.amount} • {upcomingDues.period}</p>
                    </CardContent>
                  </Card>
                )}

                <Card 
                  className="border-0 shadow cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setShowDonationDialog(true)}
                >
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-[#c39a4e] flex items-center justify-center mb-4">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-medium mb-2">Make a Donation</h4>
                    <p className="text-sm text-muted-foreground">Support club activities</p>
                  </CardContent>
                </Card>

                <Card 
                  className="border-0 shadow cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setShowReceiptDialog(true)}
                >
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-[#B8DFFF] flex items-center justify-center mb-4">
                      <Receipt className="h-6 w-6 text-[#122B5B]" />
                    </div>
                    <h4 className="font-medium mb-2">Submit Receipt</h4>
                    <p className="text-sm text-muted-foreground">Get reimbursed</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Transactions */}
            <div>
              <h3 className="font-medium mb-4">Recent Transactions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentPayments.map((payment) => (
                  <Card key={payment.id} className="border-0 shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{payment.type}</h4>
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{payment.period}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CalendarIcon className="h-3 w-3" />
                            <span>{payment.date}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#122B5B]">${payment.amount}</p>
                          {payment.type === 'Dues' && (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="text-xs mt-1 h-auto p-0"
                              onClick={() => toast.success('Receipt downloaded')}
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Receipt
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <MemberMessagesView />
          </TabsContent>
        </Tabs>
      </div>

      {/* Event Details Sheet */}
      {selectedEvent && (
        <Sheet open={showEventDetails} onOpenChange={setShowEventDetails}>
          <SheetContent className="w-full sm:max-w-lg">
            <SheetHeader className="mb-6">
              <div className="flex items-center justify-between">
                <SheetTitle>{selectedEvent.title}</SheetTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare(selectedEvent)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </SheetHeader>

            <div className="space-y-6">
              <Badge className={getEventColor(selectedEvent.type)}>
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
                  <h4 className="font-medium mb-2">Event Photos</h4>
                  <Button
                    variant="outline"
                    className="w-full border-[#122B5B] text-[#122B5B] hover:bg-[#122B5B]/5"
                    onClick={() => {
                      setPhotosEvent(selectedEvent)
                      setShowPhotosModal(true)
                    }}
                  >
                    <ImageIcon className="mr-2 h-4 w-4" />
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

              <div className="pt-4 space-y-2">
                {selectedEvent.rsvpStatus === 'confirmed' ? (
                  <Button 
                    className="w-full border-red-200 text-red-600 hover:bg-red-50"
                    variant="outline"
                    onClick={() => handleRSVP(selectedEvent)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel RSVP
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                    onClick={() => handleRSVP(selectedEvent)}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    RSVP to Event
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Dues Payment Dialog */}
      <Dialog open={showDuesPayment} onOpenChange={setShowDuesPayment}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Pay Dues</DialogTitle>
            <DialogDescription>
              Complete your {upcomingDues.period} membership payment
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Amount Due</span>
                  <span className="text-2xl font-bold">${upcomingDues.amount}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Period</span>
                  <span className="font-medium">{upcomingDues.period}</span>
                </div>
              </CardContent>
            </Card>

            <div>
              <h4 className="font-medium mb-3">Select Payment Method</h4>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full h-14 justify-start"
                  onClick={() => handleDuesPayment('Credit Card')}
                >
                  <CreditCard className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">Credit / Debit Card</p>
                    <p className="text-xs text-muted-foreground">Instant payment via Stripe</p>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full h-14 justify-start"
                  onClick={() => handleDuesPayment('Venmo')}
                >
                  <DollarSign className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">Venmo</p>
                    <p className="text-xs text-muted-foreground">@FilmClubTreasurer</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Donation Dialog */}
      <Dialog open={showDonationDialog} onOpenChange={setShowDonationDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Make a Donation</DialogTitle>
            <DialogDescription>
              Support our club activities and events
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Suggested Amounts */}
            <div>
              <h4 className="font-medium mb-3">Select Amount</h4>
              <div className="grid grid-cols-2 gap-3">
                {suggestedDonationAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setDonationAmount(amount)
                      setCustomAmount('')
                    }}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      donationAmount === amount
                        ? 'border-[#c39a4e] bg-[#c39a4e] text-white'
                        : 'border-gray-200 hover:border-[#c39a4e]'
                    }`}
                  >
                    <DollarSign className={`h-5 w-5 mx-auto mb-1 ${
                      donationAmount === amount ? 'text-white' : 'text-[#c39a4e]'
                    }`} />
                    <p className="font-bold text-xl">${amount}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <h4 className="font-medium mb-3">Or Enter Custom Amount</h4>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setDonationAmount('custom')
                  }}
                  className="pl-10 h-12 text-lg"
                />
              </div>
            </div>

            {/* Impact Message */}
            <Card className="bg-[#B8DFFF]/20 border-[#B8DFFF]">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Heart className="h-5 w-5 text-[#c39a4e] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">Your Impact</h4>
                    <p className="text-xs text-muted-foreground">
                      Donations help fund student film projects, guest speakers, equipment upgrades, and community events.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <div>
              <h4 className="font-medium mb-3">Payment Method</h4>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full h-14 justify-start"
                  onClick={() => handleDonation('Credit Card')}
                  disabled={!donationAmount && !customAmount}
                >
                  <CreditCard className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">Credit / Debit Card</p>
                    <p className="text-xs text-muted-foreground">Secure payment via Stripe</p>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full h-14 justify-start"
                  onClick={() => handleDonation('Venmo')}
                  disabled={!donationAmount && !customAmount}
                >
                  <DollarSign className="mr-3 h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">Venmo</p>
                    <p className="text-xs text-muted-foreground">@FilmClubTreasurer</p>
                  </div>
                </Button>
              </div>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              🎓 Tax-deductible • 🔒 Secure & encrypted
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Receipt Submission Dialog */}
      <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submit Receipt</DialogTitle>
            <DialogDescription>
              Upload a receipt for reimbursement
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Upload Section */}
            <div>
              <Label className="mb-3 block">Receipt Image *</Label>
              {uploadedFile ? (
                <Card className="border-2 border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-green-600">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{uploadedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(uploadedFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setUploadedFile(null)}
                        className="p-2 hover:bg-red-100 rounded-full"
                      >
                        <X className="h-5 w-5 text-red-600" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <label htmlFor="receipt-upload" className="block">
                    <Card className="border-2 border-dashed border-gray-300 hover:border-[#122B5B] cursor-pointer transition-colors">
                      <CardContent className="p-4 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-[#122B5B]" />
                        <p className="font-medium text-sm">Upload File</p>
                        <p className="text-xs text-muted-foreground">Choose from device</p>
                      </CardContent>
                    </Card>
                    <input
                      id="receipt-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>

                  <label htmlFor="receipt-camera" className="block">
                    <Card className="border-2 border-dashed border-gray-300 hover:border-[#122B5B] cursor-pointer transition-colors">
                      <CardContent className="p-4 text-center">
                        <Camera className="h-8 w-8 mx-auto mb-2 text-[#122B5B]" />
                        <p className="font-medium text-sm">Take Photo</p>
                        <p className="text-xs text-muted-foreground">Use camera</p>
                      </CardContent>
                    </Card>
                    <input
                      id="receipt-camera"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Amount */}
            <div>
              <Label htmlFor="amount">Amount *</Label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={receiptAmount}
                  onChange={(e) => setReceiptAmount(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <Label htmlFor="date">Date of Purchase *</Label>
              <div className="relative mt-2">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={receiptDate}
                  onChange={(e) => setReceiptDate(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <Label>Category *</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {receiptCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setReceiptCategory(cat)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                      receiptCategory === cat
                        ? 'border-[#122B5B] bg-[#122B5B] text-white'
                        : 'border-gray-200 hover:border-[#122B5B]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="What was this purchase for?"
                value={receiptDescription}
                onChange={(e) => setReceiptDescription(e.target.value)}
                className="min-h-20 mt-2"
              />
            </div>

            {/* Info Card */}
            <Card className="bg-[#B8DFFF]/20 border-[#B8DFFF]">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <FileText className="h-5 w-5 text-[#122B5B] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">Reimbursement Policy</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Receipts must be submitted within 30 days</li>
                      <li>• Pre-approved purchases only</li>
                      <li>• Processing takes 5-7 business days</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={handleReceiptSubmit}
              className="w-full h-12 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
              disabled={!receiptAmount || !receiptDescription || !receiptDate || !receiptCategory || !uploadedFile}
            >
              <Upload className="mr-2 h-5 w-5" />
              Submit for Approval
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
    </div>
  )
}
