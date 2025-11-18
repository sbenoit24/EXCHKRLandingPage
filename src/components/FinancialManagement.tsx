import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Input } from './ui/input'
import { Progress } from './ui/progress'
import { PaymentModal } from './PaymentModal'
import { BillingModal } from './BillingModal'
import { BudgetAnalyzerModal } from './BudgetAnalyzerModal'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { 
  DollarSign, 
  TrendingUp, 
  Receipt, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Plus,
  Check,
  X,
  Download,
  Filter,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Link as LinkIcon,
  Send,
  FileText,
  Sparkles
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface FinancialManagementProps {
  onOpenExpenseModal: () => void
}

export function FinancialManagement({ onOpenExpenseModal }: FinancialManagementProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showBillingModal, setShowBillingModal] = useState(false)
  const [showBudgetAnalyzer, setShowBudgetAnalyzer] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<any>(null)

  const financialOverview = {
    currentBalance: 8450.75,
    totalIncome: 20450.75,
    totalExpenses: 12000.00,
    duesRevenue: 7500.00,
    pendingDues: 2550.00,
    pendingExpenses: 3,
    budgetUtilization: 68
  }

  const transactions = [
    { id: 1, date: '2024-10-24', description: 'Alex Rodriguez - Fall Dues', type: 'Income', amount: 150.00, category: 'Dues', status: 'completed' },
    { id: 2, date: '2024-10-23', description: 'Film Festival Venue Deposit', type: 'Expense', amount: -3500.00, category: 'Events', status: 'completed' },
    { id: 3, date: '2024-10-23', description: 'Luca - Fall Dues', type: 'Income', amount: 150.00, category: 'Dues', status: 'completed' },
    { id: 4, date: '2024-10-22', description: 'Film Licensing for Documentary Screening', type: 'Expense', amount: -1500.00, category: 'Philanthropy', status: 'completed' },
    { id: 5, date: '2024-10-21', description: 'Jamie Park - Partial Dues', type: 'Income', amount: 75.00, category: 'Dues', status: 'completed' },
    { id: 6, date: '2024-10-20', description: 'Cinematography Workshop Guest Speaker', type: 'Expense', amount: -1000.00, category: 'Events', status: 'completed' },
    { id: 7, date: '2024-10-19', description: 'Emily Davis - Fall Dues', type: 'Income', amount: 150.00, category: 'Dues', status: 'completed' },
    { id: 8, date: '2024-10-18', description: 'Camera Equipment Storage', type: 'Expense', amount: -85.00, category: 'Supplies', status: 'completed' },
    { id: 9, date: '2024-10-17', description: 'Michael Brown - Fall Dues', type: 'Income', amount: 150.00, category: 'Dues', status: 'completed' },
    { id: 10, date: '2024-10-16', description: 'Film Festival Posters', type: 'Expense', amount: -200.00, category: 'Marketing', status: 'completed' }
  ]

  const pendingExpenses = [
    { id: 1, description: 'Film Festival Projector Rental', amount: 450.00, category: 'Events', submittedBy: 'Luca', date: '2024-10-23', receipt: true },
    { id: 2, description: 'Screening Room Refreshments', amount: 250.00, category: 'Events', submittedBy: 'Mike Johnson', date: '2024-10-22', receipt: true },
    { id: 3, description: 'Social Media Ads', amount: 150.00, category: 'Marketing', submittedBy: 'Emily Davis', date: '2024-10-21', receipt: false }
  ]

  const categoryBreakdown = [
    { name: 'Events', value: 8600, color: '#122B5B' },
    { name: 'Philanthropy', value: 2100, color: '#B8DFFF' },
    { name: 'Marketing', value: 540, color: '#c39a4e' },
    { name: 'Supplies', value: 450, color: '#92B4D4' },
    { name: 'Other', value: 310, color: '#DCC594' }
  ]

  const monthlySpending = [
    { month: 'Jul', amount: 2400 },
    { month: 'Aug', amount: 1800 },
    { month: 'Sep', amount: 3200 },
    { month: 'Oct', amount: 4600 }
  ]

  const budgetCategories = [
    { name: 'Social Events', budgeted: 12000, spent: 8600, remaining: 3400 },
    { name: 'Educational Events', budgeted: 5000, spent: 1850, remaining: 3150 },
    { name: 'Philanthropy', budgeted: 4000, spent: 2100, remaining: 1900 },
    { name: 'Networking Events', budgeted: 4500, spent: 0, remaining: 4500 },
    { name: 'Marketing', budgeted: 1000, spent: 540, remaining: 460 },
    { name: 'Supplies', budgeted: 1500, spent: 450, remaining: 1050 }
  ]

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === 'all' || transaction.category === filterCategory
    return matchesSearch && matchesFilter
  })

  const handleApproveExpense = (expense: any) => {
    setSelectedExpense(expense)
    setShowPaymentModal(true)
  }

  const handleRejectExpense = (id: number) => {
    // Handle expense rejection
    console.log('Reject expense:', id)
    toast.error('Expense request rejected')
  }

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-[#122B5B] text-white p-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h1 className="text-4xl mb-2">Finance Dashboard 💰</h1>
            <p className="text-blue-100 text-lg">Real-time view of your organization's financial health</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowBudgetAnalyzer(true)}
              className="bg-[#c39a4e] hover:bg-[#c39a4e]/90 text-white"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              AI Analyzer
            </Button>
            <Button 
              onClick={() => setShowBillingModal(true)}
              className="bg-white text-[#122B5B] hover:bg-white/90"
            >
              <FileText className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
            <Button onClick={onOpenExpenseModal} className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
            <Button className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white">
              <LinkIcon className="mr-2 h-4 w-4" />
              Connect Bank
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card 
          className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
          onClick={() => setActiveTab('overview')}
        >
          <div className="absolute inset-0 bg-[#122B5B] opacity-10"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <CardTitle className="text-sm text-muted-foreground">Current Balance</CardTitle>
              <div className="p-2 rounded-full bg-[#122B5B]">
                <Wallet className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="text-3xl mb-1">${financialOverview.currentBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card 
          className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
          onClick={() => setActiveTab('transactions')}
        >
          <div className="absolute inset-0 bg-green-500 opacity-10"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <CardTitle className="text-sm text-muted-foreground">Total Income</CardTitle>
              <div className="p-2 rounded-full bg-green-500">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="text-3xl mb-1">${financialOverview.totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card 
          className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
          onClick={() => setActiveTab('transactions')}
        >
          <div className="absolute inset-0 bg-red-500 opacity-10"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <CardTitle className="text-sm text-muted-foreground">Total Expenses</CardTitle>
              <div className="p-2 rounded-full bg-red-500">
                <TrendingDown className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="text-3xl mb-1">${financialOverview.totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card 
          className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
          onClick={() => setActiveTab('expenses')}
        >
          <div className="absolute inset-0 bg-[#c39a4e] opacity-10"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between mb-3">
              <CardTitle className="text-sm text-muted-foreground">Pending Expenses</CardTitle>
              <div className="p-2 rounded-full bg-[#c39a4e]">
                <Clock className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="text-3xl mb-1">{financialOverview.pendingExpenses}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="expenses">Pending Expenses</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Spending by Category */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
                <CardDescription>Distribution of expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Spending Trend */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Monthly Spending Trend</CardTitle>
                <CardDescription>Last 4 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlySpending}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#122B5B" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Budget Categories */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Budget Categories</CardTitle>
              <CardDescription>Track spending against budgeted amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetCategories.map((category, index) => {
                  const percentage = (category.spent / category.budgeted) * 100
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ${category.spent.toLocaleString()} / ${category.budgeted.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{percentage.toFixed(1)}% used</span>
                        <span>${category.remaining.toLocaleString()} remaining</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>All income and expenses</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                  <select
                    className="border rounded-md px-3 py-2 text-sm"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="Dues">Dues</option>
                    <option value="Events">Events</option>
                    <option value="Philanthropy">Philanthropy</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Supplies">Supplies</option>
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
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{transaction.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={transaction.type === 'Income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell className={`text-right font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budget Tab */}
        <TabsContent value="budget" className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Budget Overview</CardTitle>
              <CardDescription>Manage your organization's budget categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {budgetCategories.map((category, index) => {
                  const percentage = (category.spent / category.budgeted) * 100
                  return (
                    <Card key={index} className="border">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{category.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              ${category.spent.toLocaleString()} spent of ${category.budgeted.toLocaleString()} budgeted
                            </p>
                          </div>
                          <Badge className={percentage > 90 ? 'bg-red-100 text-red-800' : percentage > 70 ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}>
                            {percentage.toFixed(0)}% used
                          </Badge>
                        </div>
                        <Progress value={Math.min(percentage, 100)} className="h-3 mb-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">${category.remaining.toLocaleString()} remaining</span>
                          {percentage > 90 && (
                            <span className="text-red-600 flex items-center">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Near budget limit
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Expenses Tab */}
        <TabsContent value="expenses" className="space-y-6">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Pending Expense Requests</CardTitle>
              <CardDescription>Review and approve expense reimbursements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingExpenses.map((expense) => (
                  <Card key={expense.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{expense.description}</h4>
                            {expense.receipt && (
                              <Badge variant="outline" className="text-xs">
                                <Receipt className="h-3 w-3 mr-1" />
                                Receipt attached
                              </Badge>
                            )}
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>Submitted by {expense.submittedBy}</p>
                            <p>Category: {expense.category}</p>
                            <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-2xl font-medium mb-3">${expense.amount.toLocaleString()}</p>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleApproveExpense(expense)}
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Approve & Pay
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => handleRejectExpense(expense.id)}
                            >
                              <X className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bank Connection Callout */}
      <Card className="border-2 border-[#122B5B] bg-[#B8DFFF]/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-[#122B5B]">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-1">Connect Your Bank Account</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Securely link your organization's bank account to automatically sync transactions and maintain accurate records.
              </p>
              <Button className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white">
                <LinkIcon className="h-4 w-4 mr-2" />
                Connect with Plaid
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Modal for Reimbursements */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false)
          setSelectedExpense(null)
        }}
        mode="send"
        recipientName={selectedExpense?.submittedBy}
        recipientEmail={`${selectedExpense?.submittedBy?.toLowerCase().replace(' ', '.')}@email.com`}
        defaultAmount={selectedExpense?.amount}
        purpose={selectedExpense?.description}
      />

      {/* Billing Modal */}
      <BillingModal
        isOpen={showBillingModal}
        onClose={() => setShowBillingModal(false)}
      />

      {/* Budget Analyzer Modal */}
      <BudgetAnalyzerModal
        isOpen={showBudgetAnalyzer}
        onClose={() => setShowBudgetAnalyzer(false)}
      />
    </div>
  )
}
