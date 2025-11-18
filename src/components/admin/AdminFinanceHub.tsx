import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { DollarSign, TrendingUp, TrendingDown, Clock, Download, CheckCircle, AlertCircle } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface AdminFinanceHubProps {
  selectedOrg: string
}

export function AdminFinanceHub({ selectedOrg }: AdminFinanceHubProps) {
  const transactions = [
    { id: 1, club: 'Robotics Club', campus: 'Stanford', date: '2024-11-09', description: 'Equipment Purchase', amount: -2500, type: 'Expense', status: 'Completed' },
    { id: 2, club: 'Student Government', campus: 'Berkeley', date: '2024-11-08', description: 'Budget Allocation', amount: 15000, type: 'Income', status: 'Completed' },
    { id: 3, club: 'Chess Club', campus: 'MIT', date: '2024-11-07', description: 'Tournament Fees', amount: -450, type: 'Expense', status: 'Completed' },
    { id: 4, club: 'Dance Team', campus: 'Harvard', date: '2024-11-06', description: 'Costume Reimbursement', amount: -890, type: 'Pending', status: 'Pending' },
    { id: 5, club: 'Debate Society', campus: 'Stanford', date: '2024-11-05', description: 'Membership Dues', amount: 1200, type: 'Income', status: 'Completed' }
  ]

  const pendingReimbursements = [
    { id: 1, club: 'Dance Team', campus: 'Harvard', submitter: 'Emily Davis', amount: 890, description: 'Costume Reimbursement', submittedDate: '2024-11-06' },
    { id: 2, club: 'Photography Club', campus: 'MIT', submitter: 'Michael Lee', amount: 350, description: 'Camera Equipment', submittedDate: '2024-11-04' },
    { id: 3, club: 'Environmental Action', campus: 'Berkeley', submitter: 'Emma Davis', amount: 275, description: 'Event Supplies', submittedDate: '2024-11-03' }
  ]

  const campusFinancials = [
    { campus: 'Stanford', totalBalance: 785000, monthlyIncome: 45000, monthlyExpenses: 32000, clubs: 89 },
    { campus: 'Berkeley', totalBalance: 920000, monthlyIncome: 58000, monthlyExpenses: 41000, clubs: 102 },
    { campus: 'MIT', totalBalance: 560000, monthlyIncome: 35000, monthlyExpenses: 28000, clubs: 76 },
    { campus: 'Harvard', totalBalance: 580000, monthlyIncome: 38000, monthlyExpenses: 30000, clubs: 80 }
  ]

  const monthlyData = [
    { month: 'Jun', income: 145000, expenses: 112000 },
    { month: 'Jul', income: 158000, expenses: 125000 },
    { month: 'Aug', income: 172000, expenses: 138000 },
    { month: 'Sep', income: 195000, expenses: 155000 },
    { month: 'Oct', income: 185000, expenses: 148000 },
    { month: 'Nov', income: 176000, expenses: 131000 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Finance Hub</h1>
          <p className="text-muted-foreground">
            Monitor financial activity across all clubs and campuses
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Total Balance</p>
              <div className="p-2 rounded-full bg-[#c39a4e]/10">
                <DollarSign className="h-5 w-5 text-[#c39a4e]" />
              </div>
            </div>
            <p className="text-3xl mb-1">$2.85M</p>
            <div className="flex items-center gap-1 text-green-600 text-xs">
              <TrendingUp className="h-3 w-3" />
              <span>+5.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Monthly Income</p>
              <div className="p-2 rounded-full bg-green-500/10">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-3xl mb-1">$176K</p>
            <p className="text-xs text-muted-foreground">November 2024</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Monthly Expenses</p>
              <div className="p-2 rounded-full bg-red-500/10">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <p className="text-3xl mb-1">$131K</p>
            <p className="text-xs text-muted-foreground">November 2024</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Pending Approvals</p>
              <div className="p-2 rounded-full bg-amber-500/10">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <p className="text-3xl mb-1">{pendingReimbursements.length}</p>
            <p className="text-xs text-muted-foreground">${pendingReimbursements.reduce((sum, r) => sum + r.amount, 0).toLocaleString()} total</p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Trend Chart */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Income vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#10b981" name="Income" radius={[8, 8, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabs for Different Views */}
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">All Transactions</TabsTrigger>
          <TabsTrigger value="reimbursements">Pending Reimbursements</TabsTrigger>
          <TabsTrigger value="campus">Campus Breakdown</TabsTrigger>
        </TabsList>

        {/* All Transactions */}
        <TabsContent value="transactions">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Club</TableHead>
                    <TableHead>Campus</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((txn) => (
                    <TableRow key={txn.id} className="hover:bg-gray-50">
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(txn.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">{txn.club}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {txn.campus}
                      </TableCell>
                      <TableCell className="text-sm">{txn.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{txn.type}</Badge>
                      </TableCell>
                      <TableCell className={`font-medium ${txn.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {txn.amount > 0 ? '+' : ''}${Math.abs(txn.amount).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          txn.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }>
                          {txn.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Reimbursements */}
        <TabsContent value="reimbursements">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pending Reimbursements ({pendingReimbursements.length})</CardTitle>
                <Button size="sm" className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white">
                  Approve All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReimbursements.map((reimbursement) => (
                  <div key={reimbursement.id} className="p-4 rounded-lg border hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium">{reimbursement.club}</span>
                          <Badge variant="outline" className="text-xs">{reimbursement.campus}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{reimbursement.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Submitted by {reimbursement.submitter}</span>
                          <span>•</span>
                          <span>{new Date(reimbursement.submittedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-medium text-[#c39a4e]">
                            ${reimbursement.amount}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                            Reject
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campus Breakdown */}
        <TabsContent value="campus">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Campus Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campusFinancials.map((campus) => (
                  <div key={campus.campus} className="p-6 rounded-lg border bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium">{campus.campus}</h3>
                        <p className="text-sm text-muted-foreground">{campus.clubs} clubs</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Total Balance</p>
                        <p className="text-xl text-[#c39a4e]">${(campus.totalBalance / 1000).toLocaleString()}K</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Monthly Income</p>
                        <p className="text-xl text-green-600">${(campus.monthlyIncome / 1000).toLocaleString()}K</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Monthly Expenses</p>
                        <p className="text-xl text-red-600">${(campus.monthlyExpenses / 1000).toLocaleString()}K</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
