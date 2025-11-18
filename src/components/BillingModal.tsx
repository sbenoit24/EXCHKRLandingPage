import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Checkbox } from './ui/checkbox'
import { 
  DollarSign, 
  Send, 
  Plus,
  X,
  Users,
  Calendar,
  FileText,
  CheckCircle,
  Loader2
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface BillingModalProps {
  isOpen: boolean
  onClose: () => void
  members?: any[]
  preselectedMembers?: number[]
}

interface LineItem {
  id: string
  description: string
  amount: string
}

export function BillingModal({ 
  isOpen, 
  onClose,
  members = [],
  preselectedMembers = []
}: BillingModalProps) {
  const [selectedMembers, setSelectedMembers] = useState<number[]>(preselectedMembers)
  const [invoiceTitle, setInvoiceTitle] = useState('')
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', amount: '' }
  ])
  const [dueDate, setDueDate] = useState('')
  const [notes, setNotes] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sendStep, setSendStep] = useState<'details' | 'sending' | 'success'>('details')

  // Default members if none provided
  const defaultMembers = members.length > 0 ? members : [
    { id: 1, name: 'Luca', email: 'luca@email.com', duesStatus: 'Paid' },
    { id: 2, name: 'Alex Rodriguez', email: 'alex@email.com', duesStatus: 'Paid' },
    { id: 3, name: 'Jamie Park', email: 'jamie@email.com', duesStatus: 'Partial' },
    { id: 4, name: 'Mike Johnson', email: 'mike@email.com', duesStatus: 'Unpaid' },
    { id: 5, name: 'Lisa Wang', email: 'lisa@email.com', duesStatus: 'Paid' },
    { id: 6, name: 'David Kim', email: 'david@email.com', duesStatus: 'Unpaid' },
    { id: 7, name: 'Emma Wilson', email: 'emma@email.com', duesStatus: 'Partial' },
    { id: 8, name: 'Ryan Foster', email: 'ryan@email.com', duesStatus: 'Paid' }
  ]

  const totalAmount = lineItems.reduce((sum, item) => {
    const amount = parseFloat(item.amount) || 0
    return sum + amount
  }, 0)

  const handleAddLineItem = () => {
    const newId = (Math.max(...lineItems.map(item => parseInt(item.id)), 0) + 1).toString()
    setLineItems([...lineItems, { id: newId, description: '', amount: '' }])
  }

  const handleRemoveLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id))
    }
  }

  const handleUpdateLineItem = (id: string, field: 'description' | 'amount', value: string) => {
    setLineItems(lineItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const handleToggleMember = (memberId: number) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId))
    } else {
      setSelectedMembers([...selectedMembers, memberId])
    }
  }

  const handleToggleAll = () => {
    if (selectedMembers.length === defaultMembers.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(defaultMembers.map(m => m.id))
    }
  }

  const handleSendInvoices = async () => {
    if (selectedMembers.length === 0) {
      toast.error('Please select at least one member')
      return
    }

    if (!invoiceTitle.trim()) {
      toast.error('Please enter an invoice title')
      return
    }

    if (totalAmount === 0) {
      toast.error('Please add at least one line item with an amount')
      return
    }

    if (!dueDate) {
      toast.error('Please select a due date')
      return
    }

    setIsSending(true)
    setSendStep('sending')

    // Simulate sending invoices
    setTimeout(() => {
      setSendStep('success')
      setIsSending(false)
      
      toast.success(`${selectedMembers.length} invoice(s) sent successfully!`)

      // Close modal after success
      setTimeout(() => {
        handleClose()
      }, 2000)
    }, 2000)
  }

  const handleClose = () => {
    setSelectedMembers(preselectedMembers)
    setInvoiceTitle('')
    setLineItems([{ id: '1', description: '', amount: '' }])
    setDueDate('')
    setNotes('')
    setSendStep('details')
    onClose()
  }

  const selectedMembersList = defaultMembers.filter(m => selectedMembers.includes(m.id))

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#122B5B]" />
            Create Invoice
          </DialogTitle>
          <DialogDescription>
            Send payment requests to members for events, merchandise, or other charges
          </DialogDescription>
        </DialogHeader>

        {sendStep === 'details' && (
          <div className="space-y-6 py-4">
            {/* Invoice Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Invoice Title *</Label>
              <Input 
                id="title"
                placeholder="e.g., Spring Formal Ticket, Club Merchandise, etc." 
                value={invoiceTitle}
                onChange={(e) => setInvoiceTitle(e.target.value)}
              />
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Line Items *</Label>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleAddLineItem}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Item
                </Button>
              </div>
              
              <div className="space-y-2">
                {lineItems.map((item, index) => (
                  <div key={item.id} className="flex gap-2">
                    <Input 
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => handleUpdateLineItem(item.id, 'description', e.target.value)}
                      className="flex-1"
                    />
                    <div className="relative w-32">
                      <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="number"
                        placeholder="0.00"
                        value={item.amount}
                        onChange={(e) => handleUpdateLineItem(item.id, 'amount', e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    {lineItems.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveLineItem(item.id)}
                        className="px-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Total */}
              <Card className="border bg-gray-50">
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Amount</span>
                    <span className="text-2xl font-medium text-[#122B5B]">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="pl-9"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea 
                id="notes"
                placeholder="Add any additional information or payment instructions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            {/* Member Selection */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Send To *</Label>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleToggleAll}
                >
                  {selectedMembers.length === defaultMembers.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>

              <Card className="border max-h-64 overflow-y-auto">
                <CardContent className="p-0">
                  {defaultMembers.map((member) => (
                    <div 
                      key={member.id}
                      className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleToggleMember(member.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          checked={selectedMembers.includes(member.id)}
                          onCheckedChange={() => handleToggleMember(member.id)}
                        />
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {selectedMembers.length > 0 && (
                <Card className="border-2 border-[#B8DFFF] bg-[#B8DFFF]/10">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#122B5B]" />
                      <span className="text-sm font-medium">
                        {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
                      </span>
                      <span className="text-sm text-muted-foreground">
                        • Total to collect: ${(totalAmount * selectedMembers.length).toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Invoice Preview */}
            <Card className="border-2 border-[#122B5B] bg-white">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Invoice Preview
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Title:</span>
                    <span className="font-medium">{invoiceTitle || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Amount:</span>
                    <span className="font-medium">${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className="font-medium">
                      {dueDate ? new Date(dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recipients:</span>
                    <span className="font-medium">{selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button 
                className="flex-1 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                onClick={handleSendInvoices}
              >
                <Send className="h-4 w-4 mr-2" />
                Send {selectedMembers.length} Invoice{selectedMembers.length !== 1 ? 's' : ''}
              </Button>
              <Button 
                variant="outline"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>

            {/* Info */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Members will receive an email with a secure payment link powered by Stripe
              </p>
            </div>
          </div>
        )}

        {sendStep === 'sending' && (
          <div className="py-12 text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-[#122B5B] mb-4" />
            <h3 className="text-lg font-medium mb-2">Sending invoices...</h3>
            <p className="text-sm text-muted-foreground">
              Creating and sending {selectedMembers.length} invoice{selectedMembers.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {sendStep === 'success' && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Invoices Sent!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Successfully sent {selectedMembers.length} invoice{selectedMembers.length !== 1 ? 's' : ''} for ${totalAmount.toFixed(2)} each
            </p>
            <div className="space-y-2">
              {selectedMembersList.slice(0, 3).map(member => (
                <div key={member.id} className="text-sm text-muted-foreground">
                  ✓ {member.name}
                </div>
              ))}
              {selectedMembersList.length > 3 && (
                <div className="text-sm text-muted-foreground">
                  + {selectedMembersList.length - 3} more
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
