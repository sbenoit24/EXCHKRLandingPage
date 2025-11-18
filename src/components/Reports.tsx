import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Download, Filter, Calendar, DollarSign, TrendingUp, BarChart, Building2 } from 'lucide-react'

export function Reports() {
  const financialSummary = {
    totalRevenue: '$20,450.75',
    sponsorRevenue: '$15,000.00',
    totalExpenses: '$4,120.30',
    netIncome: '$16,330.45'
  }

  const recentTransactions = [
    { id: 1, date: '2024-10-01', description: 'TechCorp Solutions - Platinum Sponsorship', type: 'Income', amount: '+$5,000.00', category: 'Sponsorship' },
    { id: 2, date: '2024-10-01', description: 'Alex Rodriguez - Fall Dues', type: 'Income', amount: '+$150.00', category: 'Dues' },
    { id: 3, date: '2024-09-30', description: 'Social Event Supplies', type: 'Expense', amount: '-$85.50', category: 'Social' },
    { id: 4, date: '2024-09-28', description: 'DataFlow Analytics - Gold Sponsorship', type: 'Income', amount: '+$3,000.00', category: 'Sponsorship' },
    { id: 5, date: '2024-09-28', description: 'Conference Travel Reimbursement', type: 'Expense', amount: '-$200.00', category: 'Travel' },
    { id: 6, date: '2024-09-25', description: 'Jamie Park - Fall Dues', type: 'Income', amount: '+$150.00', category: 'Dues' },
    { id: 7, date: '2024-09-20', description: 'Office Supplies', type: 'Expense', amount: '-$35.00', category: 'Supplies' },
    { id: 8, date: '2024-09-18', description: 'Lisa Wang - Fall Dues', type: 'Income', amount: '+$150.00', category: 'Dues' }
  ]

  const expenseByCategory = [
    { category: 'Social', amount: '$1,250.00', percentage: 45 },
    { category: 'Travel', amount: '$800.00', percentage: 29 },
    { category: 'Supplies', amount: '$450.00', percentage: 16 },
    { category: 'Philanthropy', amount: '$280.00', percentage: 10 }
  ]

  const monthlyData = [
    { month: 'August', income: '$3,200', expenses: '$1,100', net: '$2,100' },
    { month: 'September', income: '$4,500', expenses: '$1,800', net: '$2,700' },
    { month: 'October', income: '$4,750', expenses: '$1,220', net: '$3,530' }
  ]

  const getTypeColor = (type: string) => {
    return type === 'Income' ? 'text-green-600' : 'text-red-600'
  }

  const getCategoryBadge = (category: string) => {
    const variants = {
      'Sponsorship': 'bg-purple-100 text-purple-800',
      'Dues': 'bg-green-100 text-green-800',
      'Social': 'bg-blue-100 text-blue-800',
      'Travel': 'bg-indigo-100 text-indigo-800',
      'Supplies': 'bg-orange-100 text-orange-800',
      'Philanthropy': 'bg-pink-100 text-pink-800'
    }
    return variants[category as keyof typeof variants] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl">Financial Reports</h1>
          <p className="text-muted-foreground mt-1">View comprehensive financial analytics and export data</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button className="bg-[#C39A46] hover:bg-[#C39A46]/90">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl">{financialSummary.totalRevenue}</div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl">{financialSummary.totalExpenses}</div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <BarChart className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl">{financialSummary.netIncome}</div>
                <p className="text-sm text-muted-foreground">Net Income</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Building2 className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl">{financialSummary.sponsorRevenue}</div>
                <p className="text-sm text-muted-foreground">Sponsor Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Income vs. Expenses breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Income</TableHead>
                  <TableHead>Expenses</TableHead>
                  <TableHead>Net</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyData.map((month, index) => (
                  <TableRow key={index}>
                    <TableCell className="">{month.month}</TableCell>
                    <TableCell className="text-green-600">{month.income}</TableCell>
                    <TableCell className="text-red-600">{month.expenses}</TableCell>
                    <TableCell className="">{month.net}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenseByCategory.map((expense, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="">{expense.category}</span>
                    <span className="">{expense.amount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#C39A46] h-2 rounded-full" 
                      style={{ width: `${expense.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {expense.percentage}% of total expenses
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Detailed transaction history for audit and reconciliation</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <span className={getTypeColor(transaction.type)}>
                      {transaction.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryBadge(transaction.category)}>
                      {transaction.category}
                    </Badge>
                  </TableCell>
                  <TableCell className={getTypeColor(transaction.type)}>
                    {transaction.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}