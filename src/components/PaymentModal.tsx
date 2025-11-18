import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { 
  CreditCard, 
  DollarSign, 
  Send, 
  AlertCircle,
  CheckCircle,
  Loader2,
  Building2,
  User
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'send' | 'receive'
  recipientName?: string
  recipientEmail?: string
  defaultAmount?: number
  purpose?: string
}

export function PaymentModal({ 
  isOpen, 
  onClose, 
  mode,
  recipientName,
  recipientEmail,
  defaultAmount,
  purpose = 'dues'
}: PaymentModalProps) {
  const [amount, setAmount] = useState(defaultAmount?.toString() || '')
  const [description, setDescription] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ach' | 'instant'>('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStep, setPaymentStep] = useState<'details' | 'processing' | 'success'>('details')

  // Mock Stripe card input fields
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')

  // For sending money (reimbursements)
  const [recipientAccount, setRecipientAccount] = useState('')
  const [recipientRouting, setRecipientRouting] = useState('')

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    if (mode === 'receive' && paymentMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCvc) {
        toast.error('Please fill in all card details')
        return
      }
    }

    if (mode === 'send') {
      if (!recipientAccount || !recipientRouting) {
        toast.error('Please enter bank account details')
        return
      }
    }

    setIsProcessing(true)
    setPaymentStep('processing')

    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('success')
      setIsProcessing(false)
      
      if (mode === 'receive') {
        toast.success(`Payment of $${amount} received successfully!`)
      } else {
        toast.success(`Payment of $${amount} sent to ${recipientName}!`)
      }

      // Close modal after success
      setTimeout(() => {
        handleClose()
      }, 2000)
    }, 2000)
  }

  const handleClose = () => {
    setAmount(defaultAmount?.toString() || '')
    setDescription('')
    setPaymentStep('details')
    setCardNumber('')
    setCardExpiry('')
    setCardCvc('')
    setRecipientAccount('')
    setRecipientRouting('')
    onClose()
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4)
    }
    return v
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === 'receive' ? (
              <>
                <CreditCard className="h-5 w-5 text-[#122B5B]" />
                Collect Payment
              </>
            ) : (
              <>
                <Send className="h-5 w-5 text-[#122B5B]" />
                Send Payment
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {mode === 'receive' 
              ? 'Process a payment from a member'
              : `Send money to ${recipientName || 'member'}`
            }
          </DialogDescription>
        </DialogHeader>

        {paymentStep === 'details' && (
          <div className="space-y-6 py-4">
            {/* Recipient Info (for send mode) */}
            {mode === 'send' && (
              <Card className="border-2 border-[#B8DFFF] bg-[#B8DFFF]/10">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-[#122B5B]">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{recipientName}</p>
                      <p className="text-sm text-muted-foreground">{recipientEmail}</p>
                      {purpose && (
                        <Badge variant="outline" className="mt-2">
                          {purpose}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="amount"
                  type="number"
                  placeholder="0.00" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea 
                id="description"
                placeholder={mode === 'receive' ? 'Fall 2024 dues payment' : 'Reimbursement for event expenses'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </div>

            {/* Payment Method Selection (for receive mode) */}
            {mode === 'receive' && (
              <div className="space-y-3">
                <Label>Payment Method</Label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg text-center transition-all hover:border-[#122B5B] ${
                      paymentMethod === 'card' ? 'border-[#122B5B] bg-[#B8DFFF]/10' : 'border-gray-200'
                    }`}
                  >
                    <CreditCard className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">Card</p>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('ach')}
                    className={`p-4 border-2 rounded-lg text-center transition-all hover:border-[#122B5B] ${
                      paymentMethod === 'ach' ? 'border-[#122B5B] bg-[#B8DFFF]/10' : 'border-gray-200'
                    }`}
                  >
                    <Building2 className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">ACH</p>
                    <p className="text-xs text-muted-foreground">Lower fees</p>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('instant')}
                    className={`p-4 border-2 rounded-lg text-center transition-all hover:border-[#122B5B] ${
                      paymentMethod === 'instant' ? 'border-[#122B5B] bg-[#B8DFFF]/10' : 'border-gray-200'
                    }`}
                  >
                    <Send className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">Instant</p>
                    <p className="text-xs text-muted-foreground">Same day</p>
                  </button>
                </div>
              </div>
            )}

            {/* Card Details (for receive mode with card) */}
            {mode === 'receive' && paymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input 
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date *</Label>
                    <Input 
                      id="expiry"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC *</Label>
                    <Input 
                      id="cvc"
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bank Account Details (for send mode) */}
            {mode === 'send' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Bank Account Number *</Label>
                  <Input 
                    id="accountNumber"
                    placeholder="1234567890"
                    value={recipientAccount}
                    onChange={(e) => setRecipientAccount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="routingNumber">Routing Number *</Label>
                  <Input 
                    id="routingNumber"
                    placeholder="021000021"
                    value={recipientRouting}
                    onChange={(e) => setRecipientRouting(e.target.value)}
                    maxLength={9}
                  />
                </div>
              </div>
            )}

            {/* Processing Fee Info */}
            {mode === 'receive' && amount && (
              <Card className="border bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Payment amount</span>
                    <span className="font-medium">${parseFloat(amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Processing fee ({paymentMethod === 'ach' ? '0.8%' : '2.9% + $0.30'})</span>
                    <span className="font-medium">
                      ${paymentMethod === 'ach' 
                        ? (parseFloat(amount) * 0.008).toFixed(2)
                        : (parseFloat(amount) * 0.029 + 0.30).toFixed(2)
                      }
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between">
                    <span className="font-medium">You receive</span>
                    <span className="font-medium text-[#122B5B]">
                      ${paymentMethod === 'ach'
                        ? (parseFloat(amount) * 0.992).toFixed(2)
                        : (parseFloat(amount) * 0.971 - 0.30).toFixed(2)
                      }
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Transfer Time Info */}
            {mode === 'send' && amount && (
              <Card className="border bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-[#122B5B] mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">Transfer will arrive in 1-3 business days</p>
                      <p className="text-muted-foreground">
                        The recipient will receive ${parseFloat(amount).toFixed(2)} via ACH bank transfer.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button 
                className="flex-1 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                onClick={handleSubmit}
              >
                {mode === 'receive' ? 'Process Payment' : 'Send Payment'}
              </Button>
              <Button 
                variant="outline"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>

            {/* Powered by Stripe */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Powered by <span className="font-medium">Stripe</span> • Secure & Encrypted
              </p>
            </div>
          </div>
        )}

        {paymentStep === 'processing' && (
          <div className="py-12 text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-[#122B5B] mb-4" />
            <h3 className="text-lg font-medium mb-2">Processing payment...</h3>
            <p className="text-sm text-muted-foreground">
              Please wait while we securely process your {mode === 'receive' ? 'payment' : 'transfer'}
            </p>
          </div>
        )}

        {paymentStep === 'success' && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              {mode === 'receive' ? 'Payment Received!' : 'Payment Sent!'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {mode === 'receive' 
                ? `Successfully processed payment of $${amount}`
                : `Successfully sent $${amount} to ${recipientName}`
              }
            </p>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
