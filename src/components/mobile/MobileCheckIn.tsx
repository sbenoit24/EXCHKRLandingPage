import { useState, useEffect, useRef } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { ScrollArea } from '../ui/scroll-area'
import { 
  QrCode, 
  UserCheck, 
  Users, 
  Search,
  Download,
  Share2,
  CheckCircle,
  Clock,
  X,
  UserPlus,
  Smartphone,
  ArrowLeft
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import QRCodeLib from 'qrcode'

interface MobileCheckInProps {
  isOpen: boolean
  onClose: () => void
  event: {
    id: number
    title: string
    date: string
    time: string
    attendees: number
    location: string
  }
}

interface Attendee {
  id: number
  name: string
  email: string
  checkedIn: boolean
  checkInTime?: string
  ticketType: 'member' | 'guest' | 'vip'
}

export function MobileCheckIn({ isOpen, onClose, event }: MobileCheckInProps) {
  const [activeTab, setActiveTab] = useState<'qr' | 'manual' | 'list'>('qr')
  const [searchTerm, setSearchTerm] = useState('')
  const [manualCheckInName, setManualCheckInName] = useState('')
  const [attendees, setAttendees] = useState<Attendee[]>([
    { id: 1, name: 'Luca', email: 'luca@email.com', checkedIn: true, checkInTime: '6:45 PM', ticketType: 'member' },
    { id: 2, name: 'Alex Rodriguez', email: 'alex@email.com', checkedIn: true, checkInTime: '6:52 PM', ticketType: 'member' },
    { id: 3, name: 'Jamie Park', email: 'jamie@email.com', checkedIn: true, checkInTime: '7:01 PM', ticketType: 'member' },
    { id: 4, name: 'Emily Davis', email: 'emily@email.com', checkedIn: false, ticketType: 'member' },
    { id: 5, name: 'Michael Brown', email: 'michael@email.com', checkedIn: false, ticketType: 'member' },
    { id: 6, name: 'Sarah Johnson', email: 'sarah@email.com', checkedIn: true, checkInTime: '7:15 PM', ticketType: 'guest' },
    { id: 7, name: 'David Lee', email: 'david@email.com', checkedIn: false, ticketType: 'vip' },
    { id: 8, name: 'Lisa Martinez', email: 'lisa@email.com', checkedIn: false, ticketType: 'guest' },
  ])

  const qrCanvasRef = useRef<HTMLCanvasElement>(null)
  const checkInUrl = `https://exchkr.app/checkin/${event.id}/${Date.now()}`

  const checkedInCount = attendees.filter(a => a.checkedIn).length
  const totalCount = attendees.length
  const checkInRate = Math.round((checkedInCount / totalCount) * 100)

  // Generate QR code
  useEffect(() => {
    if (qrCanvasRef.current && isOpen && activeTab === 'qr') {
      QRCodeLib.toCanvas(qrCanvasRef.current, checkInUrl, {
        width: 280,
        margin: 2,
        color: {
          dark: '#122B5B',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      }).catch(err => {
        console.error('Error generating QR code:', err)
      })
    }
  }, [checkInUrl, isOpen, activeTab])

  const handleCheckIn = (attendeeId: number) => {
    setAttendees(prev => prev.map(a => 
      a.id === attendeeId 
        ? { ...a, checkedIn: true, checkInTime: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) }
        : a
    ))
    toast.success('Attendee checked in!')
  }

  const handleCheckOut = (attendeeId: number) => {
    setAttendees(prev => prev.map(a => 
      a.id === attendeeId 
        ? { ...a, checkedIn: false, checkInTime: undefined }
        : a
    ))
    toast.success('Check-in removed')
  }

  const handleManualCheckIn = () => {
    if (!manualCheckInName.trim()) {
      toast.error('Please enter a name')
      return
    }

    const existingAttendee = attendees.find(a => 
      a.name.toLowerCase().includes(manualCheckInName.toLowerCase())
    )

    if (existingAttendee) {
      handleCheckIn(existingAttendee.id)
      setManualCheckInName('')
    } else {
      const newAttendee: Attendee = {
        id: Date.now(),
        name: manualCheckInName,
        email: '',
        checkedIn: true,
        checkInTime: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        ticketType: 'guest'
      }
      setAttendees(prev => [...prev, newAttendee])
      setManualCheckInName('')
      toast.success('Walk-in checked in!')
    }
  }

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check-in for ${event.title}`,
          text: `Scan to check in to ${event.title}`,
          url: checkInUrl
        })
        toast.success('Shared successfully!')
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(checkInUrl)
      toast.success('Link copied!')
    }
  }

  const downloadQRCode = () => {
    if (qrCanvasRef.current) {
      const url = qrCanvasRef.current.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `${event.title.replace(/\s+/g, '-')}-QR.png`
      link.href = url
      link.click()
      toast.success('QR code downloaded!')
    }
  }

  const filteredAttendees = attendees.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getTicketBadgeColor = (type: string) => {
    switch (type) {
      case 'vip': return 'bg-[#c39a4e] text-white'
      case 'member': return 'bg-[#122B5B] text-white'
      case 'guest': return 'bg-gray-200 text-gray-700'
      default: return 'bg-gray-200 text-gray-700'
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[95vh] rounded-t-3xl p-0">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b z-10 rounded-t-3xl">
          <SheetHeader className="p-4 pb-3">
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="p-2 -ml-2 active:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex-1">
                <SheetTitle className="text-lg">{event.title}</SheetTitle>
                <p className="text-sm text-muted-foreground">
                  {event.date} • {event.time}
                </p>
              </div>
            </div>
          </SheetHeader>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 px-4 pb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#122B5B]">{checkedInCount}</p>
              <p className="text-xs text-muted-foreground">Checked In</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{totalCount}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{checkInRate}%</p>
              <p className="text-xs text-muted-foreground">Rate</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-4 my-3">
            <TabsTrigger value="qr" className="text-xs">
              <QrCode className="h-4 w-4 mr-1.5" />
              QR Code
            </TabsTrigger>
            <TabsTrigger value="manual" className="text-xs">
              <UserPlus className="h-4 w-4 mr-1.5" />
              Manual
            </TabsTrigger>
            <TabsTrigger value="list" className="text-xs">
              <Users className="h-4 w-4 mr-1.5" />
              List
            </TabsTrigger>
          </TabsList>

          {/* QR Code Tab */}
          <TabsContent value="qr" className="px-4 pb-6">
            <Card className="border-2 border-[#122B5B]">
              <CardContent className="p-6 flex flex-col items-center">
                <h3 className="font-medium mb-4 text-center">Scan to Check In</h3>
                
                <div className="p-4 bg-white rounded-2xl border-4 border-[#122B5B] mb-4">
                  <canvas ref={qrCanvasRef} className="max-w-full h-auto" />
                </div>

                <div className="text-center mb-4 space-y-2">
                  <div className="flex items-center justify-center gap-2 text-[#122B5B]">
                    <Smartphone className="h-4 w-4" />
                    <p className="text-sm font-medium">No app required</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Works with any phone camera
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button onClick={shareQRCode} variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button onClick={downloadQRCode} variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manual Check-In Tab */}
          <TabsContent value="manual" className="px-4 pb-6 space-y-4">
            <Card>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-medium text-sm">Quick Check-In</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter name..."
                    value={manualCheckInName}
                    onChange={(e) => setManualCheckInName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleManualCheckIn()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleManualCheckIn}
                    className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                  >
                    <UserCheck className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div>
              <h3 className="font-medium text-sm mb-3 px-1">Recent Check-Ins</h3>
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {attendees
                    .filter(a => a.checkedIn)
                    .sort((a, b) => (b.checkInTime || '').localeCompare(a.checkInTime || ''))
                    .map(attendee => (
                      <Card key={attendee.id} className="border-0 shadow-sm">
                        <CardContent className="p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-green-600 text-white text-xs">
                                {attendee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{attendee.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {attendee.checkInTime}
                              </p>
                            </div>
                          </div>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          {/* Attendee List Tab */}
          <TabsContent value="list" className="px-4 pb-6 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search attendees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <ScrollArea className="h-[500px]">
              <div className="space-y-2">
                {filteredAttendees.map(attendee => (
                  <Card 
                    key={attendee.id} 
                    className={`border-0 shadow-sm ${attendee.checkedIn ? 'bg-green-50' : ''}`}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3 flex-1">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className={attendee.checkedIn ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'}>
                              {attendee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">{attendee.name}</p>
                              <Badge className={getTicketBadgeColor(attendee.ticketType) + ' text-xs py-0'}>
                                {attendee.ticketType}
                              </Badge>
                            </div>
                            {attendee.email && (
                              <p className="text-xs text-muted-foreground">{attendee.email}</p>
                            )}
                            {attendee.checkedIn && attendee.checkInTime && (
                              <p className="text-xs text-green-600 flex items-center gap-1 mt-0.5">
                                <Clock className="h-3 w-3" />
                                {attendee.checkInTime}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {attendee.checkedIn ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCheckOut(attendee.id)}
                          className="w-full border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Remove Check-In
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleCheckIn(attendee.id)}
                          className="w-full bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                        >
                          <UserCheck className="mr-2 h-4 w-4" />
                          Check In
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
