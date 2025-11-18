import { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { 
  DollarSign,
  CheckCircle,
  Clock,
  CreditCard,
  Calendar,
  AlertCircle,
  Download,
  Receipt as ReceiptIcon
} from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { toast } from 'sonner@2.0.3'

interface DuesRecord {
  id: number
  period: string
  amount: number
  dueDate: string
  status: 'paid' | 'pending' | 'overdue'
  paidDate?: string
  method?: string
}

export function MemberDues() {
  const [showPaymentSheet, setShowPaymentSheet] = useState(false)
  const [selectedDues, setSelectedDues] = useState<DuesRecord | null>(null)

  const currentDues: DuesRecord = {
    id: 1,
    period: 'Spring 2024',
    amount: 150,
    dueDate: 'Mar 1, 2024',
    status: 'paid',
    paidDate: 'Feb 28, 2024',
    method: 'Credit Card'
  }

  const duesHistory: DuesRecord[] = [
    {
      id: 1,
      period: 'Spring 2024',
      amount: 150,
      dueDate: 'Mar 1, 2024',
      status: 'paid',
      paidDate: 'Feb 28, 2024',
      method: 'Credit Card'
    },
    {
      id: 2,
      period: 'Fall 2023',
      amount: 150,
      dueDate: 'Sep 15, 2023',
      status: 'paid',
      paidDate: 'Sep 10, 2023',
      method: 'Venmo'
    },
    {
      id: 3,
      period: 'Spring 2023',
      amount: 125,
      dueDate: 'Mar 1, 2023',
      status: 'paid',
      paidDate: 'Mar 5, 2023',
      method: 'Credit Card'
    }
  ]

  const upcomingDues: DuesRecord = {
    id: 4,
    period: 'Fall 2024',
    amount: 150,
    dueDate: 'Sep 15, 2024',
    status: 'pending'
  }

  const totalPaid = duesHistory.reduce((sum, dues) => 
    dues.status === 'paid' ? sum + dues.amount : sum, 0
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Paid' }
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-700', icon: Clock, text: 'Pending' }
      case 'overdue':
        return { color: 'bg-red-100 text-red-700', icon: AlertCircle, text: 'Overdue' }
      default:
        return { color: 'bg-gray-100 text-gray-700', icon: Clock, text: status }
    }
  }

  const handlePayment = (dues: DuesRecord) => {
    setSelectedDues(dues)
    setShowPaymentSheet(true)
  }

  const processPayment = (method: string) => {
    toast.success('Payment processed successfully!')
    setShowPaymentSheet(false)
  }

  const downloadReceipt = (dues: DuesRecord) => {
    toast.success('Receipt downloaded')
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="px-4 pt-12 pb-4">
            <h1 className="text-2xl mb-1">Dues</h1>
            <p className="text-sm text-muted-foreground">Manage your membership payments</p>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Current Status */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-[#122B5B] to-[#1a3d7a] text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                {currentDues.status === 'paid' ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <Clock className="h-6 w-6" />
                )}
                <h2 className="text-xl font-medium">
                  {currentDues.status === 'paid' ? 'Membership Active' : 'Payment Due'}
                </h2>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Current Period</span>
                  <span className="font-medium">{currentDues.period}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Amount</span>
                  <span className="font-medium text-lg">${currentDues.amount}</span>
                </div>
                {currentDues.status === 'paid' && currentDues.paidDate && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-90">Paid On</span>
                    <span className="font-medium">{currentDues.paidDate}</span>
                  </div>
                )}
              </div>

              {currentDues.status === 'paid' && (
                <div className="pt-4 border-t border-white/20">
                  <p className="text-xs opacity-75 mb-2">Next payment due: {upcomingDues.dueDate}</p>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => downloadReceipt(currentDues)}
                    className="w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Receipt
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-0 shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Total Paid</span>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">${totalPaid}</p>
                <p className="text-xs text-muted-foreground mt-1">All time</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Payments</span>
                  <CheckCircle className="h-4 w-4 text-[#122B5B]" />
                </div>
                <p className="text-2xl font-bold text-[#122B5B]">{duesHistory.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Completed</p>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Payment */}
          {upcomingDues && (
            <div>
              <h3 className="font-medium mb-3">Upcoming Payment</h3>
              <Card className="border-0 shadow border-l-4 border-l-yellow-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{upcomingDues.period}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>Due {upcomingDues.dueDate}</span>
                      </div>
                      <p className="text-2xl font-bold text-[#122B5B]">${upcomingDues.amount}</p>
                    </div>
                    <Badge className={getStatusBadge(upcomingDues.status).color}>
                      {getStatusBadge(upcomingDues.status).text}
                    </Badge>
                  </div>
                  <Button 
                    className="w-full bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                    onClick={() => handlePayment(upcomingDues)}
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Pay Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Payment History */}
          <div>
            <h3 className="font-medium mb-3">Payment History</h3>
            <div className="space-y-3">
              {duesHistory.map((dues) => {
                const badge = getStatusBadge(dues.status)
                const StatusIcon = badge.icon

                return (
                  <Card key={dues.id} className="border-0 shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{dues.period}</h4>
                            <Badge className={badge.color + ' text-xs'}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {badge.text}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            {dues.paidDate && (
                              <p>Paid on {dues.paidDate}</p>
                            )}
                            {dues.method && (
                              <p>via {dues.method}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">${dues.amount}</p>
                        </div>
                      </div>
                      {dues.status === 'paid' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => downloadReceipt(dues)}
                          className="w-full"
                        >
                          <ReceiptIcon className="mr-2 h-4 w-4" />
                          View Receipt
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Info Card */}
          <Card className="border-0 shadow bg-[#B8DFFF]/20">
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-2">Payment Information</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Dues are collected at the start of each semester</li>
                <li>• Payment methods: Credit/Debit, Venmo, Cash</li>
                <li>• All payments are non-refundable</li>
                <li>• Contact treasurer for payment plans</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Payment Sheet */}
      {selectedDues && (
        <Sheet open={showPaymentSheet} onOpenChange={setShowPaymentSheet}>
          <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
            <SheetHeader className="mb-6">
              <SheetTitle>Complete Payment</SheetTitle>
            </SheetHeader>

            <div className="space-y-6">
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Amount Due</span>
                    <span className="text-2xl font-bold">${selectedDues.amount}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Period</span>
                    <span className="font-medium">{selectedDues.period}</span>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h4 className="font-medium mb-3">Select Payment Method</h4>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full h-14 justify-start"
                    onClick={() => processPayment('Credit Card')}
                  >
                    <CreditCard className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Credit / Debit Card</p>
                      <p className="text-xs text-muted-foreground">Instant payment</p>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full h-14 justify-start"
                    onClick={() => processPayment('Venmo')}
                  >
                    <DollarSign className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Venmo</p>
                      <p className="text-xs text-muted-foreground">@SyracuseFilmClub</p>
                    </div>
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full h-14 justify-start"
                    onClick={() => {
                      toast.info('Please pay the treasurer in person')
                      setShowPaymentSheet(false)
                    }}
                  >
                    <DollarSign className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">Cash</p>
                      <p className="text-xs text-muted-foreground">Pay treasurer directly</p>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}
