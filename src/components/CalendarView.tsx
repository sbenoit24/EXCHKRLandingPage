import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Users, 
  DollarSign, 
  MapPin, 
  Trash2, 
  Edit,
  Receipt,
  AlertCircle,
  Upload,
  FileText,
  UserPlus,
  Building2,
  ChevronLeft,
  ChevronRight,
  Wallet,
  TrendingDown,
  QrCode,
  Image
} from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { toast } from 'sonner@2.0.3'
import { Separator } from './ui/separator'
import { EventCheckInModal } from './EventCheckInModal'
import { EventPhotosModal } from './EventPhotosModal'

interface Receipt {
  id: number
  name: string
  amount: number
  date: string
  category: string
}

interface Expense {
  id: number
  description: string
  amount: number
  category: string
  status: 'pending' | 'approved' | 'reimbursed'
  submittedBy: string
}

interface Vendor {
  id: number
  name: string
  email: string
  category: string
  status: 'invited' | 'confirmed' | 'declined'
}

interface CalendarEvent {
  id: number
  title: string
  date: Date
  time?: string
  type: 'meeting' | 'event' | 'deadline' | 'dues' | 'social' | 'philanthropy' | 'formal'
  attendees?: number
  location?: string
  budget: number
  actualSpending: number
  description?: string
  receipts: Receipt[]
  expenses: Expense[]
  vendors: Vendor[]
  status: 'planning' | 'in-progress' | 'completed'
  budgetCategory: string
  published: boolean
}

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedView, setSelectedView] = useState<'month' | 'list'>('month')
  const [showEventModal, setShowEventModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [showEventDetails, setShowEventDetails] = useState(false)
  const [showReceiptUpload, setShowReceiptUpload] = useState(false)
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [showVendorModal, setShowVendorModal] = useState(false)
  const [showCheckInModal, setShowCheckInModal] = useState(false)
  const [checkInEvent, setCheckInEvent] = useState<CalendarEvent | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showPhotosModal, setShowPhotosModal] = useState(false)
  const [photosEvent, setPhotosEvent] = useState<CalendarEvent | null>(null)
  
  // Form state
  const [eventTitle, setEventTitle] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  const [eventAttendees, setEventAttendees] = useState('')
  const [eventBudget, setEventBudget] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [eventType, setEventType] = useState<'meeting' | 'event' | 'deadline' | 'dues' | 'social' | 'philanthropy' | 'formal'>('event')
  const [budgetCategory, setBudgetCategory] = useState('Events')
  const [eventPublished, setEventPublished] = useState(true)

  // Receipt form
  const [receiptName, setReceiptName] = useState('')
  const [receiptAmount, setReceiptAmount] = useState('')
  const [receiptCategory, setReceiptCategory] = useState('')

  // Expense form
  const [expenseDescription, setExpenseDescription] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseCategory, setExpenseCategory] = useState('')
  const [expenseSubmittedBy, setExpenseSubmittedBy] = useState('')

  // Vendor form
  const [vendorName, setVendorName] = useState('')
  const [vendorEmail, setVendorEmail] = useState('')
  const [vendorCategory, setVendorCategory] = useState('')

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: 'Student Film Festival',
      date: new Date(2024, 10, 15),
      time: '7:00 PM',
      type: 'formal',
      attendees: 150,
      location: 'University Theater',
      budget: 8500,
      actualSpending: 7250,
      description: 'Annual student film festival showcasing member short films',
      status: 'in-progress',
      budgetCategory: 'Events',
      published: true,
      receipts: [
        { id: 1, name: 'Venue Deposit', amount: 3500, date: '2024-10-01', category: 'Venue' },
        { id: 2, name: 'Catering', amount: 2500, date: '2024-10-10', category: 'Food' },
        { id: 3, name: 'Projector & Sound', amount: 1250, date: '2024-10-15', category: 'Equipment' }
      ],
      expenses: [
        { id: 1, description: 'Projector Rental', amount: 450, category: 'Equipment', status: 'approved', submittedBy: 'Luca' }
      ],
      vendors: [
        { id: 1, name: 'Campus AV Services', email: 'contact@campusav.com', category: 'Equipment', status: 'confirmed' }
      ]
    },
    {
      id: 2,
      title: 'Fall Dues Deadline',
      date: new Date(2024, 10, 20),
      type: 'dues',
      budget: 0,
      actualSpending: 0,
      description: 'Final deadline for Fall 2024 semester dues',
      status: 'planning',
      budgetCategory: 'Dues',
      published: true,
      receipts: [],
      expenses: [],
      vendors: []
    },
    {
      id: 3,
      title: 'Documentary Screening',
      date: new Date(2024, 10, 22),
      time: '9:00 AM',
      type: 'philanthropy',
      attendees: 200,
      location: 'Campus Center Cinema',
      budget: 3500,
      actualSpending: 2100,
      description: 'Charity screening fundraiser for local arts organization',
      status: 'in-progress',
      budgetCategory: 'Philanthropy',
      published: true,
      receipts: [
        { id: 4, name: 'Film Licensing', amount: 1500, date: '2024-10-05', category: 'Licensing' },
        { id: 5, name: 'Poster Printing', amount: 350, date: '2024-10-08', category: 'Marketing' }
      ],
      expenses: [],
      vendors: [
        { id: 3, name: 'FilmDist Co', email: 'orders@filmdist.com', category: 'Licensing', status: 'confirmed' }
      ]
    },
    {
      id: 4,
      title: 'Cinematography Workshop',
      date: new Date(2024, 10, 25),
      time: '6:00 PM',
      type: 'event',
      attendees: 75,
      location: 'Media Arts 301',
      budget: 2500,
      actualSpending: 1850,
      description: 'Professional cinematography and lighting workshop',
      status: 'in-progress',
      budgetCategory: 'Educational Events',
      published: true,
      receipts: [
        { id: 7, name: 'Guest Cinematographer Fee', amount: 1000, date: '2024-10-12', category: 'Speaker' }
      ],
      expenses: [],
      vendors: []
    },
    {
      id: 5,
      title: 'Industry Mixer',
      date: new Date(2024, 11, 5),
      time: '6:30 PM',
      type: 'social',
      attendees: 150,
      location: 'Campus Center',
      budget: 4500,
      actualSpending: 0,
      description: 'Connect with alumni and film industry professionals',
      status: 'planning',
      budgetCategory: 'Networking Events',
      published: false,
      receipts: [],
      expenses: [],
      vendors: []
    },
    {
      id: 6,
      title: 'Board Meeting',
      date: new Date(2024, 10, 8),
      time: '5:00 PM',
      type: 'meeting',
      attendees: 12,
      location: 'Virtual',
      budget: 0,
      actualSpending: 0,
      description: 'Monthly board meeting',
      status: 'completed',
      budgetCategory: 'Other',
      published: false,
      receipts: [],
      expenses: [],
      vendors: []
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
      case 'meeting':
        return 'bg-[#B8DFFF] text-[#122B5B] border-[#B8DFFF]'
      case 'event':
        return 'bg-[#122B5B] text-white border-[#122B5B]'
      case 'social':
        return 'bg-[#122B5B] text-white border-[#122B5B]'
      case 'formal':
        return 'bg-[#c39a4e] text-white border-[#c39a4e]'
      case 'philanthropy':
        return 'bg-[#B8DFFF] text-[#122B5B] border-[#B8DFFF]'
      case 'deadline':
        return 'bg-[#c39a4e] text-white border-[#c39a4e]'
      case 'dues':
        return 'bg-[#c39a4e] text-white border-[#c39a4e]'
      default:
        return 'bg-gray-500 text-white border-gray-500'
    }
  }

  const totalBudget = events.reduce((sum, event) => sum + event.budget, 0)
  const totalSpending = events.reduce((sum, event) => sum + event.actualSpending, 0)
  const totalReceipts = events.reduce((sum, event) => sum + event.receipts.length, 0)
  const pendingExpenses = events.reduce((sum, event) => 
    sum + event.expenses.filter(e => e.status === 'pending').length, 0
  )

  const resetForm = () => {
    setEventTitle('')
    setEventDate('')
    setEventTime('')
    setEventLocation('')
    setEventAttendees('')
    setEventBudget('')
    setEventDescription('')
    setEventType('event')
    setBudgetCategory('Events')
    setEventPublished(true)
    setEditingEvent(null)
  }

  const handleCreateEvent = () => {
    if (!eventTitle || !eventDate) {
      toast.error('Please fill in the required fields')
      return
    }

    const newEvent: CalendarEvent = {
      id: Date.now(),
      title: eventTitle,
      date: new Date(eventDate),
      time: eventTime,
      type: eventType,
      location: eventLocation || undefined,
      attendees: eventAttendees ? parseInt(eventAttendees) : undefined,
      budget: eventBudget ? parseFloat(eventBudget) : 0,
      actualSpending: 0,
      description: eventDescription || undefined,
      status: 'planning',
      budgetCategory: budgetCategory,
      published: eventPublished,
      receipts: [],
      expenses: [],
      vendors: []
    }

    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? { ...newEvent, id: editingEvent.id, receipts: editingEvent.receipts, expenses: editingEvent.expenses, vendors: editingEvent.vendors, actualSpending: editingEvent.actualSpending } : e))
      toast.success('Event updated successfully!')
    } else {
      setEvents([...events, newEvent])
      toast.success('Event created successfully!')
    }

    resetForm()
    setShowEventModal(false)
  }

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event)
    setEventTitle(event.title)
    setEventDate(event.date.toISOString().split('T')[0])
    setEventTime(event.time || '')
    setEventLocation(event.location || '')
    setEventAttendees(event.attendees?.toString() || '')
    setEventBudget(event.budget.toString())
    setEventDescription(event.description || '')
    setEventType(event.type)
    setBudgetCategory(event.budgetCategory)
    setEventPublished(event.published)
    setShowEventModal(true)
  }

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(e => e.id !== eventId))
    toast.success('Event deleted successfully!')
    setShowEventDetails(false)
  }

  const handleTogglePublish = (eventId: number) => {
    setEvents(events.map(e => {
      if (e.id === eventId) {
        const newPublished = !e.published
        toast.success(newPublished ? 'Event published to members' : 'Event saved as draft')
        return { ...e, published: newPublished }
      }
      return e
    }))
  }

  const handleAddReceipt = () => {
    if (!selectedEvent || !receiptName || !receiptAmount) {
      toast.error('Please fill in all receipt fields')
      return
    }

    const newReceipt: Receipt = {
      id: Date.now(),
      name: receiptName,
      amount: parseFloat(receiptAmount),
      date: new Date().toISOString().split('T')[0],
      category: receiptCategory
    }

    setEvents(events.map(e => {
      if (e.id === selectedEvent.id) {
        const updatedReceipts = [...e.receipts, newReceipt]
        const newActualSpending = updatedReceipts.reduce((sum, r) => sum + r.amount, 0)
        const updatedEvent = { ...e, receipts: updatedReceipts, actualSpending: newActualSpending }
        setSelectedEvent(updatedEvent)
        return updatedEvent
      }
      return e
    }))

    setReceiptName('')
    setReceiptAmount('')
    setReceiptCategory('')
    setShowReceiptUpload(false)
    toast.success('Receipt added successfully!')
  }

  const handleAddExpense = () => {
    if (!selectedEvent || !expenseDescription || !expenseAmount) {
      toast.error('Please fill in all expense fields')
      return
    }

    const newExpense: Expense = {
      id: Date.now(),
      description: expenseDescription,
      amount: parseFloat(expenseAmount),
      category: expenseCategory,
      status: 'pending',
      submittedBy: expenseSubmittedBy
    }

    setEvents(events.map(e => {
      if (e.id === selectedEvent.id) {
        const updatedEvent = { ...e, expenses: [...e.expenses, newExpense] }
        setSelectedEvent(updatedEvent)
        return updatedEvent
      }
      return e
    }))

    setExpenseDescription('')
    setExpenseAmount('')
    setExpenseCategory('')
    setExpenseSubmittedBy('')
    setShowExpenseModal(false)
    toast.success('Expense added successfully!')
  }

  const handleAddVendor = () => {
    if (!selectedEvent || !vendorName || !vendorEmail) {
      toast.error('Please fill in all vendor fields')
      return
    }

    const newVendor: Vendor = {
      id: Date.now(),
      name: vendorName,
      email: vendorEmail,
      category: vendorCategory,
      status: 'invited'
    }

    setEvents(events.map(e => {
      if (e.id === selectedEvent.id) {
        const updatedEvent = { ...e, vendors: [...e.vendors, newVendor] }
        setSelectedEvent(updatedEvent)
        return updatedEvent
      }
      return e
    }))

    setVendorName('')
    setVendorEmail('')
    setVendorCategory('')
    setShowVendorModal(false)
    toast.success('Vendor invitation sent!')
  }

  const handleViewEventDetails = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setShowEventDetails(true)
  }

  const handleDayClick = (day: number) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const clickedDate = new Date(year, month, day)
    setSelectedDate(clickedDate)
    setEventDate(clickedDate.toISOString().split('T')[0])
    setShowEventModal(true)
  }

  const budgetUtilization = selectedEvent && selectedEvent.budget > 0 
    ? (selectedEvent.actualSpending / selectedEvent.budget) * 100 
    : 0

  const isToday = (day: number) => {
    const today = new Date()
    return today.getFullYear() === currentDate.getFullYear() &&
           today.getMonth() === currentDate.getMonth() &&
           today.getDate() === day
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl">Event Calendar</h1>
          <p className="text-muted-foreground mt-1">
            Centralize your club's financial and social activities in one visual hub
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              // Show check-in for the next upcoming event
              const upcomingEvent = events
                .filter(e => e.date >= new Date())
                .sort((a, b) => a.date.getTime() - b.date.getTime())[0]
              
              if (upcomingEvent) {
                setCheckInEvent(upcomingEvent)
                setShowCheckInModal(true)
              } else {
                toast.error('No upcoming events to check in to')
              }
            }}
            variant="outline"
            className="border-[#122B5B] text-[#122B5B] hover:bg-[#122B5B]/10"
          >
            <QrCode className="mr-2 h-4 w-4" />
            Quick Check-In
          </Button>
          <Button 
            onClick={() => {
              resetForm()
              setSelectedDate(null)
              setShowEventModal(true)
            }}
            className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-3xl mt-1">${totalBudget.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-full bg-[#122B5B]">
                <Wallet className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spending</p>
                <p className="text-3xl mt-1">${totalSpending.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-full bg-[#c39a4e]">
                <TrendingDown className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Receipts</p>
                <p className="text-3xl mt-1">{totalReceipts}</p>
              </div>
              <div className="p-3 rounded-full bg-[#B8DFFF]">
                <Receipt className="h-6 w-6 text-[#122B5B]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Expenses</p>
                <p className="text-3xl mt-1">{pendingExpenses}</p>
              </div>
              <div className="p-3 rounded-full bg-[#122B5B]">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Calendar */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-[#122B5B]" />
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
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
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
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
                return <div key={`empty-${index}`} className="min-h-[120px] bg-gray-50 rounded-lg" />
              }
              
              const dayEvents = getEventsForDate(day)
              const dayBudget = dayEvents.reduce((sum, e) => sum + e.budget, 0)
              const daySpending = dayEvents.reduce((sum, e) => sum + e.actualSpending, 0)
              
              return (
                <div
                  key={day}
                  className={`min-h-[120px] border rounded-lg p-2 hover:bg-gray-50 transition-colors cursor-pointer ${
                    isToday(day) ? 'bg-[#B8DFFF]/20 border-[#122B5B]' : 'bg-white'
                  }`}
                  onClick={() => handleDayClick(day)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-sm font-medium ${isToday(day) ? 'text-[#122B5B]' : ''}`}>
                      {day}
                    </span>
                    {dayBudget > 0 && (
                      <span className="text-xs text-muted-foreground">
                        ${daySpending.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map(event => {
                      const budgetUsage = event.budget > 0 ? (event.actualSpending / event.budget) * 100 : 0
                      return (
                        <div
                          key={event.id}
                          className={`text-xs p-1.5 rounded border ${getEventColor(event.type)} ${!event.published ? 'opacity-60 border-dashed' : ''} cursor-pointer hover:opacity-80 transition-opacity`}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewEventDetails(event)
                          }}
                        >
                          <div className="font-medium truncate flex items-center gap-1">
                            {event.title}
                            {!event.published && <span className="text-[10px] opacity-75">(Draft)</span>}
                          </div>
                          {event.time && (
                            <div className="text-xs opacity-90">{event.time}</div>
                          )}
                          {event.budget > 0 && (
                            <div className="mt-1">
                              <Progress 
                                value={Math.min(budgetUsage, 100)} 
                                className="h-1 bg-white/30"
                              />
                            </div>
                          )}
                        </div>
                      )
                    })}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center">
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Budget Breakdown */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-[#c39a4e]" />
            Budget Breakdown by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Social Events', 'Educational Events', 'Philanthropy', 'Networking Events'].map((category) => {
              const categoryEvents = events.filter(e => e.budgetCategory === category)
              const categoryBudget = categoryEvents.reduce((sum, e) => sum + e.budget, 0)
              const categorySpending = categoryEvents.reduce((sum, e) => sum + e.actualSpending, 0)
              const percentage = categoryBudget > 0 ? (categorySpending / categoryBudget) * 100 : 0
              
              if (categoryBudget === 0) return null
              
              return (
                <Card key={category} className="border">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm">{category}</h4>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">${categorySpending.toLocaleString()}</span>
                        <span className="text-muted-foreground">${categoryBudget.toLocaleString()}</span>
                      </div>
                      <Progress value={Math.min(percentage, 100)} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Event Modal */}
      <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingEvent ? 'Edit Event' : 'Create New Event'}</DialogTitle>
            <DialogDescription>
              {editingEvent ? 'Update the event details' : 'Add a new event and link it to your budget'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input 
                id="title"
                placeholder="Enter event name" 
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Event Type</Label>
              <Select value={eventType} onValueChange={(value: any) => setEventType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="philanthropy">Philanthropy</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="dues">Dues</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budgetCategory">Budget Category</Label>
              <Select value={budgetCategory} onValueChange={setBudgetCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Social Events">Social Events</SelectItem>
                  <SelectItem value="Educational Events">Educational Events</SelectItem>
                  <SelectItem value="Philanthropy">Philanthropy</SelectItem>
                  <SelectItem value="Networking Events">Networking Events</SelectItem>
                  <SelectItem value="Dues">Dues</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input 
                  id="date"
                  type="date" 
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input 
                  id="time"
                  type="time" 
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location"
                placeholder="Event location" 
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="attendees">Expected Attendees</Label>
                <Input 
                  id="attendees"
                  type="number" 
                  placeholder="Number of attendees" 
                  value={eventAttendees}
                  onChange={(e) => setEventAttendees(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget ($)</Label>
                <Input 
                  id="budget"
                  type="number"
                  placeholder="0.00" 
                  value={eventBudget}
                  onChange={(e) => setEventBudget(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                placeholder="Event details" 
                rows={3}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border bg-gray-50">
              <div className="space-y-1">
                <Label htmlFor="published" className="cursor-pointer">Event Visibility</Label>
                <p className="text-sm text-muted-foreground">
                  {eventPublished ? 'Published - Visible to all members' : 'Draft - Only visible to officers'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={eventPublished ? 'bg-green-600' : 'bg-gray-400'}>
                  {eventPublished ? 'Published' : 'Draft'}
                </Badge>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEventPublished(!eventPublished)}
                >
                  {eventPublished ? 'Set as Draft' : 'Publish'}
                </Button>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button 
                className="flex-1 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                onClick={handleCreateEvent}
              >
                {editingEvent ? 'Update Event' : 'Create Event'}
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  resetForm()
                  setShowEventModal(false)
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Details Modal */}
      <Dialog open={showEventDetails} onOpenChange={setShowEventDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-2xl">{selectedEvent?.title}</DialogTitle>
                <DialogDescription>
                  {selectedEvent?.date.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                  {selectedEvent?.time && ` • ${selectedEvent.time}`}
                </DialogDescription>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button 
                  size="sm"
                  variant={selectedEvent?.published ? 'outline' : 'default'}
                  onClick={() => {
                    if (selectedEvent) {
                      handleTogglePublish(selectedEvent.id)
                    }
                  }}
                  className={selectedEvent?.published ? '' : 'bg-green-600 hover:bg-green-700 text-white'}
                >
                  {selectedEvent?.published ? 'Unpublish' : 'Publish'}
                </Button>
                <Button 
                  size="sm"
                  onClick={() => {
                    if (selectedEvent) {
                      setCheckInEvent(selectedEvent)
                      setShowCheckInModal(true)
                    }
                  }}
                  className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                >
                  <QrCode className="h-3 w-3 mr-1" />
                  Check-In
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (selectedEvent) {
                      setPhotosEvent(selectedEvent)
                      setShowPhotosModal(true)
                    }
                  }}
                  className="border-[#122B5B] text-[#122B5B] hover:bg-[#122B5B]/5"
                >
                  <Image className="h-3 w-3 mr-1" />
                  Photos
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    if (selectedEvent) {
                      handleEditEvent(selectedEvent)
                      setShowEventDetails(false)
                    }
                  }}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => selectedEvent && handleDeleteEvent(selectedEvent.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-6 py-4">
              {/* Status Badge */}
              <div className="flex gap-2">
                <Badge className={getEventColor(selectedEvent.type)}>
                  {selectedEvent.type}
                </Badge>
                <Badge className={selectedEvent.published ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'}>
                  {selectedEvent.published ? '✓ Published' : 'Draft'}
                </Badge>
              </div>

              {/* Event Info */}
              <div className="grid grid-cols-2 gap-4">
                {selectedEvent.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedEvent.location}</span>
                  </div>
                )}
                {selectedEvent.attendees && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedEvent.attendees} attendees</span>
                  </div>
                )}
              </div>

              {selectedEvent.description && (
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                </div>
              )}

              <Separator />

              {/* Budget Overview */}
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Budget & Spending
                </h4>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <Card className="border">
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="text-2xl mt-1">${selectedEvent.budget.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  <Card className="border">
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground">Actual Spending</p>
                      <p className="text-2xl mt-1">${selectedEvent.actualSpending.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  <Card className="border">
                    <CardContent className="p-4">
                      <p className="text-xs text-muted-foreground">Remaining</p>
                      <p className={`text-2xl mt-1 ${selectedEvent.budget - selectedEvent.actualSpending < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ${(selectedEvent.budget - selectedEvent.actualSpending).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                {selectedEvent.budget > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Budget Utilization</span>
                      <span className={budgetUtilization > 100 ? 'text-red-600' : 'text-[#122B5B]'}>
                        {budgetUtilization.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={Math.min(budgetUtilization, 100)} className="h-3" />
                  </div>
                )}
              </div>

              <Separator />

              {/* Receipts */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Receipt className="h-4 w-4" />
                    Receipts ({selectedEvent.receipts.length})
                  </h4>
                  <Button 
                    size="sm"
                    onClick={() => setShowReceiptUpload(true)}
                    className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Add Receipt
                  </Button>
                </div>
                {selectedEvent.receipts.length > 0 ? (
                  <div className="space-y-2">
                    {selectedEvent.receipts.map((receipt) => (
                      <Card key={receipt.id} className="border">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">{receipt.name}</p>
                              <p className="text-xs text-muted-foreground">{receipt.category} • {receipt.date}</p>
                            </div>
                            <p className="font-medium text-[#122B5B]">${receipt.amount.toLocaleString()}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No receipts uploaded yet</p>
                )}
              </div>

              <Separator />

              {/* Expenses */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Expense Requests ({selectedEvent.expenses.length})
                  </h4>
                  <Button 
                    size="sm"
                    onClick={() => setShowExpenseModal(true)}
                    variant="outline"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Expense
                  </Button>
                </div>
                {selectedEvent.expenses.length > 0 ? (
                  <div className="space-y-2">
                    {selectedEvent.expenses.map((expense) => (
                      <Card key={expense.id} className="border">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">{expense.description}</p>
                              <p className="text-xs text-muted-foreground">{expense.category} • Submitted by {expense.submittedBy}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-[#122B5B]">${expense.amount.toLocaleString()}</p>
                              <Badge 
                                className={
                                  expense.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  expense.status === 'reimbursed' ? 'bg-blue-100 text-blue-800' :
                                  'bg-amber-100 text-amber-800'
                                }
                              >
                                {expense.status}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No expense requests yet</p>
                )}
              </div>

              <Separator />

              {/* Vendors */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Vendors & Sponsors ({selectedEvent.vendors.length})
                  </h4>
                  <Button 
                    size="sm"
                    onClick={() => setShowVendorModal(true)}
                    variant="outline"
                  >
                    <UserPlus className="h-3 w-3 mr-1" />
                    Invite Vendor
                  </Button>
                </div>
                {selectedEvent.vendors.length > 0 ? (
                  <div className="space-y-2">
                    {selectedEvent.vendors.map((vendor) => (
                      <Card key={vendor.id} className="border">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-sm">{vendor.name}</p>
                              <p className="text-xs text-muted-foreground">{vendor.category} • {vendor.email}</p>
                            </div>
                            <Badge 
                              className={
                                vendor.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                vendor.status === 'declined' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                              }
                            >
                              {vendor.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No vendors invited yet</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Receipt Upload Modal */}
      <Dialog open={showReceiptUpload} onOpenChange={setShowReceiptUpload}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Receipt</DialogTitle>
            <DialogDescription>Upload a receipt for {selectedEvent?.title}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="receiptName">Receipt Name *</Label>
              <Input 
                id="receiptName"
                placeholder="e.g., Venue Deposit" 
                value={receiptName}
                onChange={(e) => setReceiptName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="receiptAmount">Amount ($) *</Label>
              <Input 
                id="receiptAmount"
                type="number"
                placeholder="0.00" 
                value={receiptAmount}
                onChange={(e) => setReceiptAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="receiptCategory">Category</Label>
              <Input 
                id="receiptCategory"
                placeholder="e.g., Venue, Food, Entertainment" 
                value={receiptCategory}
                onChange={(e) => setReceiptCategory(e.target.value)}
              />
            </div>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload receipt image or PDF</p>
            </div>
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                onClick={handleAddReceipt}
              >
                Add Receipt
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setReceiptName('')
                  setReceiptAmount('')
                  setReceiptCategory('')
                  setShowReceiptUpload(false)
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Expense Modal */}
      <Dialog open={showExpenseModal} onOpenChange={setShowExpenseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Expense Request</DialogTitle>
            <DialogDescription>Request reimbursement for {selectedEvent?.title}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="expenseDescription">Description *</Label>
              <Input 
                id="expenseDescription"
                placeholder="e.g., Marketing Materials" 
                value={expenseDescription}
                onChange={(e) => setExpenseDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expenseAmount">Amount ($) *</Label>
              <Input 
                id="expenseAmount"
                type="number"
                placeholder="0.00" 
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expenseCategory">Category</Label>
              <Input 
                id="expenseCategory"
                placeholder="e.g., Marketing, Supplies" 
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expenseSubmittedBy">Submitted By *</Label>
              <Input 
                id="expenseSubmittedBy"
                placeholder="Your name" 
                value={expenseSubmittedBy}
                onChange={(e) => setExpenseSubmittedBy(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                onClick={handleAddExpense}
              >
                Submit Expense
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setExpenseDescription('')
                  setExpenseAmount('')
                  setExpenseCategory('')
                  setExpenseSubmittedBy('')
                  setShowExpenseModal(false)
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Vendor Modal */}
      <Dialog open={showVendorModal} onOpenChange={setShowVendorModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Vendor or Sponsor</DialogTitle>
            <DialogDescription>Send an invitation for {selectedEvent?.title}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="vendorName">Vendor/Sponsor Name *</Label>
              <Input 
                id="vendorName"
                placeholder="e.g., Elegant Events Catering" 
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendorEmail">Email *</Label>
              <Input 
                id="vendorEmail"
                type="email"
                placeholder="contact@example.com" 
                value={vendorEmail}
                onChange={(e) => setVendorEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendorCategory">Category</Label>
              <Input 
                id="vendorCategory"
                placeholder="e.g., Catering, Entertainment, Sponsorship" 
                value={vendorCategory}
                onChange={(e) => setVendorCategory(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                onClick={handleAddVendor}
              >
                Send Invitation
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setVendorName('')
                  setVendorEmail('')
                  setVendorCategory('')
                  setShowVendorModal(false)
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Event Check-In Modal */}
      <EventCheckInModal
        isOpen={showCheckInModal}
        onClose={() => {
          setShowCheckInModal(false)
          setCheckInEvent(null)
        }}
        event={checkInEvent}
      />

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
          canUpload={true}
        />
      )}
    </div>
  )
}
