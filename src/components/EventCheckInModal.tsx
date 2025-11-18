import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Avatar, AvatarFallback } from './ui/avatar'
import { ScrollArea } from './ui/scroll-area'
import { 
  QrCode, 
  UserCheck, 
  Users, 
  Search,
  Download,
  Share2,
  CheckCircle,
  Clock,
  TrendingUp,
  Smartphone,
  Ticket,
  X,
  UserPlus,
  RefreshCw
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import QRCodeLib from 'qrcode'

interface EventCheckInModalProps {
  isOpen: boolean
  onClose: () => void
  event: {
    id: number
    title: string
    date: Date
    time?: string
    attendees?: number
    location?: string
  } | null
}

interface Attendee {
  id: number
  name: string
  email: string
  checkedIn: boolean
  checkInTime?: string
  ticketType: 'member' | 'guest' | 'vip'
}

export function EventCheckInModal({ isOpen, onClose, event }: EventCheckInModalProps) {
  const [activeTab, setActiveTab] = useState<'qr' | 'manual' | 'attendees'>('qr')
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
  
  const [qrRefreshKey, setQrRefreshKey] = useState(0)
  const qrCanvasRef = useRef<HTMLCanvasElement>(null)

  // Generate unique QR code URL for the event
  const checkInUrl = event ? `https://exchkr.app/checkin/${event.id}/${Date.now() + qrRefreshKey}` : ''

  // Generate QR code when URL changes
  useEffect(() => {
    if (qrCanvasRef.current && checkInUrl && isOpen) {
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
  }, [checkInUrl, isOpen, qrRefreshKey])

  const checkedInCount = attendees.filter(a => a.checkedIn).length
  const totalCount = attendees.length
  const checkInRate = Math.round((checkedInCount / totalCount) * 100)

  const handleCheckIn = (attendeeId: number) => {
    setAttendees(prev => prev.map(a => 
      a.id === attendeeId 
        ? { ...a, checkedIn: true, checkInTime: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) }
        : a
    ))
    toast.success('Attendee checked in successfully!')
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

    // Check if attendee exists
    const existingAttendee = attendees.find(a => 
      a.name.toLowerCase().includes(manualCheckInName.toLowerCase())
    )

    if (existingAttendee) {
      handleCheckIn(existingAttendee.id)
      setManualCheckInName('')
    } else {
      // Add walk-in attendee
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
      toast.success('Walk-in attendee checked in!')
    }
  }

  const downloadQRCode = () => {
    if (qrCanvasRef.current) {
      const url = qrCanvasRef.current.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = `${event?.title.replace(/\s+/g, '-')}-QR.png`
      link.href = url
      link.click()
      toast.success('QR code downloaded!')
    }
  }

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check-in for ${event?.title}`,
          text: `Scan this QR code to check in to ${event?.title}`,
          url: checkInUrl
        })
        toast.success('Shared successfully!')
      } catch (err) {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(checkInUrl)
      toast.success('Check-in URL copied to clipboard!')
    }
  }

  const refreshQRCode = () => {
    setQrRefreshKey(prev => prev + 1)
    toast.success('QR code refreshed!')
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

  if (!event) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-[#122B5B]" />
            Event Check-In: {event.title}
          </DialogTitle>
          <DialogDescription>
            {event.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            {event.time && ` at ${event.time}`}
            {event.location && ` • ${event.location}`}
          </DialogDescription>
        </DialogHeader>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 py-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Checked In</p>
                  <p className="text-2xl font-bold text-[#122B5B]">{checkedInCount}</p>
                </div>
                <UserCheck className="h-8 w-8 text-[#122B5B] opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Expected</p>
                  <p className="text-2xl font-bold">{totalCount}</p>
                </div>
                <Users className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Attendance Rate</p>
                  <p className="text-2xl font-bold text-green-600">{checkInRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="qr" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              QR Code
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Manual Check-In
            </TabsTrigger>
            <TabsTrigger value="attendees" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Attendee List
            </TabsTrigger>
          </TabsList>

          {/* QR Code Tab */}
          <TabsContent value="qr" className="flex-1 overflow-auto mt-4">
            <div className="space-y-6">
              <Card className="border-2 border-[#122B5B]">
                <CardHeader>
                  <CardTitle className="text-center">Scan to Check In</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <div className="p-6 bg-white rounded-lg border-4 border-[#122B5B]">
                    <canvas 
                      ref={qrCanvasRef}
                      className="max-w-full h-auto"
                    />
                  </div>
                  
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Attendees can scan this code with their phone camera to check in
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <Smartphone className="h-4 w-4 text-[#122B5B]" />
                      <span className="text-sm font-medium text-[#122B5B]">
                        No app required - works with any camera
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Button 
                      onClick={downloadQRCode}
                      variant="outline"
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download QR
                    </Button>
                    <Button 
                      onClick={shareQRCode}
                      variant="outline"
                      className="flex-1"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button 
                      onClick={refreshQRCode}
                      variant="outline"
                      className="flex-1"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card className="bg-[#B8DFFF]/10 border-[#B8DFFF]">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Ticket className="h-4 w-4 text-[#122B5B]" />
                    How to Use QR Check-In
                  </h4>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="font-medium text-[#122B5B]">1.</span>
                      Display this QR code at the event entrance (print or screen)
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-[#122B5B]">2.</span>
                      Attendees scan with their phone camera - no app needed
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-[#122B5B]">3.</span>
                      They'll be automatically checked in and receive confirmation
                    </li>
                    <li className="flex gap-2">
                      <span className="font-medium text-[#122B5B]">4.</span>
                      Track real-time attendance in the Attendee List tab
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Manual Check-In Tab */}
          <TabsContent value="manual" className="flex-1 overflow-auto mt-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Check-In</CardTitle>
                  <DialogDescription>
                    Manually check in attendees or add walk-ins
                  </DialogDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter attendee name..."
                      value={manualCheckInName}
                      onChange={(e) => setManualCheckInName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleManualCheckIn()}
                    />
                    <Button 
                      onClick={handleManualCheckIn}
                      className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                    >
                      <UserCheck className="mr-2 h-4 w-4" />
                      Check In
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Check-Ins */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recent Check-Ins</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {attendees
                        .filter(a => a.checkedIn)
                        .sort((a, b) => (b.checkInTime || '').localeCompare(a.checkInTime || ''))
                        .map(attendee => (
                          <div key={attendee.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback className="bg-[#122B5B] text-white">
                                  {attendee.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{attendee.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  Checked in at {attendee.checkInTime}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getTicketBadgeColor(attendee.ticketType)}>
                                {attendee.ticketType}
                              </Badge>
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Attendee List Tab */}
          <TabsContent value="attendees" className="flex-1 overflow-auto mt-4">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search attendees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Attendee List */}
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {filteredAttendees.map(attendee => (
                    <Card key={attendee.id} className={attendee.checkedIn ? 'border-green-200 bg-green-50/30' : ''}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <Avatar>
                              <AvatarFallback className={attendee.checkedIn ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'}>
                                {attendee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-medium">{attendee.name}</p>
                                <Badge className={getTicketBadgeColor(attendee.ticketType)}>
                                  {attendee.ticketType}
                                </Badge>
                              </div>
                              {attendee.email && (
                                <p className="text-xs text-muted-foreground">{attendee.email}</p>
                              )}
                              {attendee.checkedIn && attendee.checkInTime && (
                                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                  <Clock className="h-3 w-3" />
                                  Checked in at {attendee.checkInTime}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          {attendee.checkedIn ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCheckOut(attendee.id)}
                              className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <X className="mr-2 h-4 w-4" />
                              Remove
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleCheckIn(attendee.id)}
                              className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              Check In
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {checkedInCount} of {totalCount} attendees checked in
          </p>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
