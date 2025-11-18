import { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { Badge } from '../ui/badge'
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  Receipt,
  Calendar
} from 'lucide-react'

export function MobileFinance() {
  const budgetCategories = [
    { name: 'Social Events', budget: 5000, spent: 3400, color: '#122B5B' },
    { name: 'Educational', budget: 2000, spent: 1200, color: '#c39a4e' },
    { name: 'Philanthropy', budget: 1500, spent: 800, color: '#B8DFFF' },
    { name: 'Operations', budget: 1000, spent: 750, color: '#000000' }
  ]

  const recentTransactions = [
    { id: 1, name: 'Spring Formal Deposit', amount: -500, date: 'Today', category: 'Social Events' },
    { id: 2, name: 'Monthly Dues - March', amount: 1200, date: 'Yesterday', category: 'Income' },
    { id: 3, name: 'Movie Screening Supplies', amount: -85, date: 'Mar 15', category: 'Educational' },
    { id: 4, name: 'Sponsorship - Local Cinema', amount: 500, date: 'Mar 14', category: 'Income' },
    { id: 5, name: 'Workshop Materials', amount: -120, date: 'Mar 13', category: 'Educational' },
    { id: 6, name: 'Charity Event Supplies', amount: -200, date: 'Mar 12', category: 'Philanthropy' }
  ]

  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.budget, 0)
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0)
  const remaining = totalBudget - totalSpent

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 pt-12 pb-4">
          <h1 className="text-2xl mb-4">Finance</h1>
          <div className="flex gap-2">
            <Button className="flex-1 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white h-11">
              <Plus className="mr-2 h-5 w-5" />
              Add Expense
            </Button>
            <Button variant="outline" className="h-11">
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Budget Overview Card */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-[#122B5B] to-[#1a3d7a] text-white">
          <CardContent className="p-6">
            <p className="text-sm opacity-90 mb-1">Total Budget</p>
            <h2 className="text-4xl mb-6">${totalBudget.toLocaleString()}</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs opacity-75 mb-1">Spent</p>
                <p className="text-xl">${totalSpent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs opacity-75 mb-1">Remaining</p>
                <p className="text-xl">${remaining.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs mb-1">
                <span>Budget Used</span>
                <span>{Math.round((totalSpent / totalBudget) * 100)}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white"
                  style={{ width: `${(totalSpent / totalBudget) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget Categories */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Budget by Category</h3>
            <button className="text-xs text-[#122B5B]">View All</button>
          </div>
          
          <div className="space-y-3">
            {budgetCategories.map((category, index) => {
              const percentage = (category.spent / category.budget) * 100
              const isOverBudget = percentage > 100
              
              return (
                <Card key={index} className="border-0 shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div 
                            className="h-3 w-3 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          />
                          <h4 className="font-medium text-sm">{category.name}</h4>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>${category.spent.toLocaleString()}</span>
                          <span>/</span>
                          <span>${category.budget.toLocaleString()}</span>
                        </div>
                      </div>
                      <Badge 
                        variant={isOverBudget ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {Math.round(percentage)}%
                      </Badge>
                    </div>
                    
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className="h-2"
                    />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">This Month</span>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-2xl mb-1">$3,200</p>
              <p className="text-xs text-green-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Expenses</span>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </div>
              <p className="text-2xl mb-1">$1,850</p>
              <p className="text-xs text-red-600">+8% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Recent Transactions</h3>
            <button className="flex items-center gap-1 text-xs text-[#122B5B]">
              <Filter className="h-3 w-3" />
              Filter
            </button>
          </div>

          <Card className="border-0 shadow">
            <CardContent className="p-0">
              {recentTransactions.map((transaction, index) => (
                <div 
                  key={transaction.id}
                  className={`flex items-center justify-between p-4 ${
                    index !== recentTransactions.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.amount > 0 ? (
                        <ArrowDownRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{transaction.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{transaction.date}</span>
                        <span>•</span>
                        <span>{transaction.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Bills */}
        <div>
          <h3 className="font-medium mb-3">Upcoming Bills</h3>
          <Card className="border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-orange-100">
                    <Receipt className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Venue Deposit</p>
                    <p className="text-xs text-muted-foreground">Due in 3 days</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">$1,500</p>
                  <Badge variant="secondary" className="text-xs mt-1">Pending</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
