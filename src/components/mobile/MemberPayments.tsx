import { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  DollarSign,
  CheckCircle,
  Clock,
  CreditCard,
  Heart,
  Receipt,
  Upload,
  ArrowRight,
  Calendar,
  Download
} from 'lucide-react'
import { ReceiptSubmissionModal } from './ReceiptSubmissionModal'
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

export function MemberPayments() {
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [showDuesPayment, setShowDuesPayment] = useState(false)
  const [showDonationSheet, setShowDonationSheet] = useState(false)
  const [donationAmount, setDonationAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')

  const currentDues: DuesRecord = {
    id: 1,
    period: 'Spring 2024',
    amount: 150,
    dueDate: 'Mar 1, 2024',
    status: 'paid',
    paidDate: 'Feb 28, 2024',
    method: 'Credit Card'
  }

  const upcomingDues: DuesRecord = {
    id: 4,
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
    setShowDonationSheet(false)
    setDonationAmount('')
    setCustomAmount('')
  }

  const suggestedAmounts = ['10', '25', '50', '100']

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="px-4 pt-12 pb-4">
            <h1 className="text-2xl mb-1">Payments</h1>
            <p className="text-sm text-muted-foreground">Dues, donations & receipts</p>
          </div>
        </div>

        <div className="p-4 space-y-6">
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

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Current Period</span>
                  <span className="font-medium">{currentDues.period}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Amount</span>
                  <span className="text-lg">${currentDues.amount}</span>
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
                  <p className="text-xs opacity-75">Next payment due: {upcomingDues.dueDate}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div>
            <h3 className="font-medium mb-3">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-3">
              {upcomingDues.status === 'pending' && (
                <Card 
                  className="border-0 shadow cursor-pointer active:scale-95 transition-transform"
                  onClick={() => setShowDuesPayment(true)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-[#122B5B] flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium">Pay Dues</h4>
                          <p className="text-sm text-muted-foreground">${upcomingDues.amount} • {upcomingDues.period}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card 
                className="border-0 shadow cursor-pointer active:scale-95 transition-transform"
                onClick={() => setShowDonationSheet(true)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-[#c39a4e] flex items-center justify-center">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">Make a Donation</h4>
                        <p className="text-sm text-muted-foreground">Support club activities</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="border-0 shadow cursor-pointer active:scale-95 transition-transform"
                onClick={() => setShowReceiptModal(true)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-[#B8DFFF] flex items-center justify-center">
                        <Receipt className="h-6 w-6 text-[#122B5B]" />
                      </div>
                      <div>
                        <h4 className="font-medium">Submit Receipt</h4>
                        <p className="text-sm text-muted-foreground">Get reimbursed</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <h3 className="font-medium mb-3">Recent Transactions</h3>
            <div className="space-y-3">
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
                          <Calendar className="h-3 w-3" />
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

          {/* Info Card */}
          <Card className="border-0 shadow bg-[#B8DFFF]/20">
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-2">💡 Payment Tips</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• All payments are processed securely via Stripe</li>
                <li>• Receipts are emailed automatically</li>
                <li>• Donations are tax-deductible</li>
                <li>• Reimbursements take 5-7 business days</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Receipt Submission Modal */}
      <ReceiptSubmissionModal 
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
      />

      {/* Dues Payment Sheet */}
      <Sheet open={showDuesPayment} onOpenChange={setShowDuesPayment}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
          <SheetHeader className="mb-6">
            <SheetTitle>Pay Dues</SheetTitle>
          </SheetHeader>

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
        </SheetContent>
      </Sheet>

      {/* Donation Sheet */}
      <Sheet open={showDonationSheet} onOpenChange={setShowDonationSheet}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
          <SheetHeader className="mb-6">
            <SheetTitle>Make a Donation</SheetTitle>
            <p className="text-sm text-muted-foreground">
              Support our club activities and events
            </p>
          </SheetHeader>

          <div className="space-y-6">
            {/* Suggested Amounts */}
            <div>
              <h4 className="font-medium mb-3">Select Amount</h4>
              <div className="grid grid-cols-2 gap-3">
                {suggestedAmounts.map((amount) => (
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
                  className="pl-10 h-14 text-xl"
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
        </SheetContent>
      </Sheet>
    </>
  )
}
