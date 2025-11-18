import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Input } from './ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { PaymentModal } from './PaymentModal'
import { BillingModal } from './BillingModal'
import { 
  Search, 
  Mail, 
  Plus, 
  UserPlus, 
  Users, 
  DollarSign, 
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  Upload,
  CreditCard,
  Filter,
  FileText
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

export function MemberManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [showDuesReminderModal, setShowDuesReminderModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showBillingModal, setShowBillingModal] = useState(false)
  const [paymentMode, setPaymentMode] = useState<'send' | 'receive'>('receive')
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('members')
  const [filterStatus, setFilterStatus] = useState('all')
  
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'Member'
  })

  const members = [
    { 
      id: 1, 
      name: 'Luca', 
      email: 'luca@email.com', 
      role: 'Treasurer', 
      status: 'Active', 
      duesStatus: 'Paid',
      duesPaid: 150,
      duesOwed: 150,
      lastPayment: '2024-09-12',
      joinDate: '2023-08-15',
      installmentPlan: null
    },
    { 
      id: 2, 
      name: 'Alex Rodriguez', 
      email: 'alex@email.com', 
      role: 'President', 
      status: 'Active', 
      duesStatus: 'Paid',
      duesPaid: 150,
      duesOwed: 150,
      lastPayment: '2024-09-10',
      joinDate: '2023-08-15',
      installmentPlan: null
    },
    { 
      id: 3, 
      name: 'Jamie Park', 
      email: 'jamie@email.com', 
      role: 'Vice President', 
      status: 'Active', 
      duesStatus: 'Partial',
      duesPaid: 75,
      duesOwed: 150,
      lastPayment: '2024-09-08',
      joinDate: '2023-08-20',
      installmentPlan: {
        totalInstallments: 3,
        installmentsPaid: 1,
        installmentAmount: 50,
        nextDueDate: '2024-11-15'
      }
    },
    { 
      id: 4, 
      name: 'Mike Johnson', 
      email: 'mike@email.com', 
      role: 'Secretary', 
      status: 'Active', 
      duesStatus: 'Unpaid',
      duesPaid: 0,
      duesOwed: 150,
      lastPayment: null,
      joinDate: '2023-09-01',
      installmentPlan: null
    },
    { 
      id: 5, 
      name: 'Lisa Wang', 
      email: 'lisa@email.com', 
      role: 'Member', 
      status: 'Active', 
      duesStatus: 'Paid',
      duesPaid: 150,
      duesOwed: 150,
      lastPayment: '2024-09-14',
      joinDate: '2023-09-10',
      installmentPlan: null
    },
    { 
      id: 6, 
      name: 'David Kim', 
      email: 'david@email.com', 
      role: 'Member', 
      status: 'Active', 
      duesStatus: 'Unpaid',
      duesPaid: 0,
      duesOwed: 150,
      lastPayment: null,
      joinDate: '2023-09-15',
      installmentPlan: null
    },
    { 
      id: 7, 
      name: 'Emma Wilson', 
      email: 'emma@email.com', 
      role: 'Member', 
      status: 'Active', 
      duesStatus: 'Partial',
      duesPaid: 100,
      duesOwed: 150,
      lastPayment: '2024-09-05',
      joinDate: '2023-09-20',
      installmentPlan: {
        totalInstallments: 2,
        installmentsPaid: 1,
        installmentAmount: 75,
        nextDueDate: '2024-11-20'
      }
    },
    { 
      id: 8, 
      name: 'Ryan Foster', 
      email: 'ryan@email.com', 
      role: 'Member', 
      status: 'Active', 
      duesStatus: 'Paid',
      duesPaid: 150,
      duesOwed: 150,
      lastPayment: '2024-09-11',
      joinDate: '2023-08-25',
      installmentPlan: null
    }
  ]

  const duesStats = {
    totalMembers: members.length,
    paidInFull: members.filter(m => m.duesStatus === 'Paid').length,
    partiallyPaid: members.filter(m => m.duesStatus === 'Partial').length,
    unpaid: members.filter(m => m.duesStatus === 'Unpaid').length,
    totalCollected: members.reduce((sum, m) => sum + m.duesPaid, 0),
    totalOwed: members.reduce((sum, m) => sum + m.duesOwed, 0)
  }

  const collectionRate = (duesStats.totalCollected / duesStats.totalOwed) * 100

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || member.duesStatus === filterStatus
    return matchesSearch && matchesFilter
  })

  const unpaidMembers = members.filter(m => m.duesStatus === 'Unpaid' || m.duesStatus === 'Partial')

  const getRoleBadge = (role: string) => {
    const variants = {
      'President': 'bg-purple-100 text-purple-800',
      'Vice President': 'bg-blue-100 text-blue-800',
      'Treasurer': 'bg-green-100 text-green-800',
      'Secretary': 'bg-orange-100 text-orange-800',
      'Member': 'bg-gray-100 text-gray-800'
    }
    return variants[role as keyof typeof variants] || 'bg-gray-100 text-gray-800'
  }

  const getDuesStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800'
      case 'Partial':
        return 'bg-amber-100 text-amber-800'
      case 'Unpaid':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast.error('Please fill in all fields')
      return
    }
    
    toast.success('Member added successfully!')
    setNewMember({ name: '', email: '', role: 'Member' })
    setShowAddMemberModal(false)
  }

  const handleSendReminder = (memberId: number) => {
    toast.success('Dues reminder sent!')
  }

  const handleSendBulkReminder = () => {
    toast.success(`Dues reminder sent to ${unpaidMembers.length} members!`)
    setShowDuesReminderModal(false)
  }

  const handleMarkAsPaid = (memberId: number) => {
    toast.success('Member marked as paid!')
  }

  const handlePayDues = (member: any) => {
    setSelectedMember(member)
    setPaymentMode('receive')
    setShowPaymentModal(true)
  }

  const handleSendMoney = (member: any) => {
    setSelectedMember(member)
    setPaymentMode('send')
    setShowPaymentModal(true)
  }

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-[#122B5B] text-white p-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl mb-2">Member Management 👥</h1>
            <p className="text-blue-100 text-lg">Track members and manage dues collection</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowAddMemberModal(true)}
              className="bg-white text-[#122B5B] hover:bg-white/90"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
            <Button 
              onClick={() => setShowBillingModal(true)}
              className="bg-[#c39a4e] hover:bg-[#c39a4e]/90 text-white"
            >
              <FileText className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
            <Button 
              className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white"
              onClick={() => setShowDuesReminderModal(true)}
            >
              <Mail className="mr-2 h-4 w-4" />
              Send Reminders
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>

      {/* Dues Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card 
          className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
          onClick={() => setActiveTab('members')}
        >
          <div className="absolute inset-0 bg-[#122B5B] opacity-10"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <CardTitle className="text-sm text-muted-foreground">Total Members</CardTitle>
              <div className="p-2 rounded-full bg-[#122B5B]">
                <Users className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="text-3xl mb-1">{duesStats.totalMembers}</div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>

        <Card 
          className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
          onClick={() => setActiveTab('dues')}
        >
          <div className="absolute inset-0 bg-green-500 opacity-10"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <CardTitle className="text-sm text-muted-foreground">Dues Collected</CardTitle>
              <div className="p-2 rounded-full bg-green-500">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="text-3xl mb-1">${duesStats.totalCollected.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{collectionRate.toFixed(0)}% collection rate</p>
            <Progress value={collectionRate} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card 
          className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
          onClick={() => {
            setActiveTab('dues')
            setFilterStatus('Paid')
          }}
        >
          <div className="absolute inset-0 bg-[#c39a4e] opacity-10"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <CardTitle className="text-sm text-muted-foreground">Paid in Full</CardTitle>
              <div className="p-2 rounded-full bg-[#c39a4e]">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="text-3xl mb-1">{duesStats.paidInFull}</div>
            <p className="text-xs text-muted-foreground">members</p>
          </CardContent>
        </Card>

        <Card 
          className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
          onClick={() => {
            setActiveTab('dues')
            setFilterStatus('all')
            // Optionally scroll to unpaid/partial members or show filtered view
          }}
        >
          <div className="absolute inset-0 bg-red-500 opacity-10"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <CardTitle className="text-sm text-muted-foreground">Need Reminder</CardTitle>
              <div className="p-2 rounded-full bg-red-500">
                <AlertCircle className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="text-3xl mb-1">{duesStats.unpaid + duesStats.partiallyPaid}</div>
            <p className="text-xs text-muted-foreground">unpaid or partial</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="members">All Members</TabsTrigger>
          <TabsTrigger value="dues">Dues Tracking</TabsTrigger>
        </TabsList>

        {/* All Members Tab */}
        <TabsContent value="members" className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Member List</CardTitle>
                  <CardDescription>Manage your organization members</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Import CSV
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>
                        <Badge className={getRoleBadge(member.role)}>
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(member.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSendMoney(member)}
                          >
                            <Send className="h-3 w-3 mr-1" />
                            Send $
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dues Tracking Tab */}
        <TabsContent value="dues" className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Dues Payment Status</CardTitle>
                  <CardDescription>Track and manage member dues payments</CardDescription>
                </div>
                <div className="flex gap-2">
                  <select
                    className="border rounded-md px-3 py-2 text-sm"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partial</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Payment Progress</TableHead>
                    <TableHead>Amount Paid</TableHead>
                    <TableHead>Amount Owed</TableHead>
                    <TableHead>Last Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => {
                    const paymentProgress = (member.duesPaid / member.duesOwed) * 100
                    return (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                          <Badge className={getDuesStatusBadge(member.duesStatus)}>
                            {member.duesStatus === 'Paid' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {member.duesStatus === 'Partial' && <Clock className="h-3 w-3 mr-1" />}
                            {member.duesStatus === 'Unpaid' && <AlertCircle className="h-3 w-3 mr-1" />}
                            {member.duesStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 min-w-[180px]">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>${member.duesPaid} / ${member.duesOwed}</span>
                              <span>{paymentProgress.toFixed(0)}%</span>
                            </div>
                            <Progress 
                              value={paymentProgress} 
                              className="h-2"
                            />
                            {member.installmentPlan && (
                              <div className="text-xs text-muted-foreground mt-1">
                                Installment {member.installmentPlan.installmentsPaid} of {member.installmentPlan.totalInstallments}
                                <span className="text-[#c39a4e] ml-1">
                                  • Next: {new Date(member.installmentPlan.nextDueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-green-600 font-medium">${member.duesPaid}</TableCell>
                        <TableCell className="font-medium">${member.duesOwed}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {member.lastPayment 
                            ? new Date(member.lastPayment).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                            : 'Never'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {member.duesStatus !== 'Paid' && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleSendReminder(member.id)}
                                >
                                  <Mail className="h-3 w-3 mr-1" />
                                  Remind
                                </Button>
                                <Button 
                                  size="sm"
                                  className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                                  onClick={() => handlePayDues(member)}
                                >
                                  <CreditCard className="h-3 w-3 mr-1" />
                                  Pay
                                </Button>
                              </>
                            )}
                            {member.duesStatus === 'Paid' && (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Complete
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Stripe Integration Callout */}
          <Card className="border-2 border-[#122B5B] bg-[#B8DFFF]/10">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-[#122B5B]">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Enable Online Dues Payment</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Set up Stripe to allow members to pay dues online with credit cards, debit cards, or ACH transfers.
                  </p>
                  <Button className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Connect Stripe
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Member Modal */}
      <Dialog open={showAddMemberModal} onOpenChange={setShowAddMemberModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
            <DialogDescription>Add a new member to your organization</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input 
                id="name"
                placeholder="John Doe" 
                value={newMember.name}
                onChange={(e) => setNewMember({...newMember, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input 
                id="email"
                type="email"
                placeholder="john@example.com" 
                value={newMember.email}
                onChange={(e) => setNewMember({...newMember, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                className="w-full border rounded-md px-3 py-2"
                value={newMember.role}
                onChange={(e) => setNewMember({...newMember, role: e.target.value})}
              >
                <option value="Member">Member</option>
                <option value="President">President</option>
                <option value="Vice President">Vice President</option>
                <option value="Treasurer">Treasurer</option>
                <option value="Secretary">Secretary</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <Button 
                className="flex-1 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                onClick={handleAddMember}
              >
                Add Member
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setNewMember({ name: '', email: '', role: 'Member' })
                  setShowAddMemberModal(false)
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dues Reminder Modal */}
      <Dialog open={showDuesReminderModal} onOpenChange={setShowDuesReminderModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Dues Reminders</DialogTitle>
            <DialogDescription>
              Send email reminders to {unpaidMembers.length} members with unpaid or partial dues
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Card className="border">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Recipients ({unpaidMembers.length})</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {unpaidMembers.map(member => (
                    <div key={member.id} className="flex justify-between items-center text-sm">
                      <span>{member.name}</span>
                      <Badge className={getDuesStatusBadge(member.duesStatus)}>
                        ${member.duesOwed - member.duesPaid} owed
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                onClick={handleSendBulkReminder}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Reminders
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowDuesReminderModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false)
          setSelectedMember(null)
        }}
        mode={paymentMode}
        recipientName={selectedMember?.name}
        recipientEmail={selectedMember?.email}
        defaultAmount={paymentMode === 'receive' ? (selectedMember?.duesOwed - selectedMember?.duesPaid) : undefined}
        purpose={paymentMode === 'receive' ? 'Fall 2024 Dues' : 'Reimbursement'}
      />

      {/* Billing Modal */}
      <BillingModal
        isOpen={showBillingModal}
        onClose={() => setShowBillingModal(false)}
        members={members}
      />
    </div>
  )
}
