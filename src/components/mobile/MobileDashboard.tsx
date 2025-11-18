import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  QrCode,
  Bell,
  Search
} from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'

export function MobileDashboard() {
  const stats = {
    balance: 12450,
    income: 3200,
    expenses: 1850,
    members: 48
  }

  const recentTransactions = [
    { id: 1, name: 'Spring Formal Deposit', amount: -500, date: 'Today', type: 'expense' },
    { id: 2, name: 'Monthly Dues - March', amount: 1200, date: 'Yesterday', type: 'income' },
    { id: 3, name: 'Movie Screening Supplies', amount: -85, date: 'Mar 15', type: 'expense' },
    { id: 4, name: 'Sponsorship - Local Cinema', amount: 500, date: 'Mar 14', type: 'income' }
  ]

  const upcomingEvents = [
    { id: 1, title: 'Student Film Festival', date: 'Mar 20', time: '7:00 PM', attendees: 75 },
    { id: 2, title: 'Industry Mixer', date: 'Mar 25', time: '6:30 PM', attendees: 40 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#122B5B] text-white px-4 pt-12 pb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm opacity-90">Welcome back,</p>
            <h1 className="text-2xl mt-1">Luca</h1>
          </div>
          <div className="flex gap-3">
            <button className="p-2 rounded-full bg-white/10 active:bg-white/20">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full bg-white/10 active:bg-white/20 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="bg-white border-0">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Current Balance</p>
            <h2 className="text-3xl text-[#122B5B] mb-3">${stats.balance.toLocaleString()}</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Income</p>
                <p className="text-lg text-green-600 mt-0.5">+${stats.income.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Expenses</p>
                <p className="text-lg text-red-600 mt-0.5">-${stats.expenses.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-4 -mt-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <Button className="h-14 bg-[#c39a4e] hover:bg-[#c39a4e]/90 text-white shadow-lg">
            <QrCode className="mr-2 h-5 w-5" />
            Event Check-In
          </Button>
          <Button className="h-14 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white shadow-lg">
            <DollarSign className="mr-2 h-5 w-5" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Budget Used</span>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-2xl mb-2">68%</p>
              <Progress value={68} className="h-1.5" />
            </CardContent>
          </Card>

          <Card className="border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Members</span>
                <Users className="h-4 w-4 text-[#122B5B]" />
              </div>
              <p className="text-2xl mb-2">{stats.members}</p>
              <p className="text-xs text-green-600">+3 this month</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Upcoming Events</h3>
          <button className="text-xs text-[#122B5B]">View All</button>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map(event => (
            <Card key={event.id} className="border-0 shadow active:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{event.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {event.date}
                      </span>
                      <span>{event.time}</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.attendees}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <QrCode className="h-4 w-4 text-[#122B5B]" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Recent Transactions</h3>
          <button className="text-xs text-[#122B5B]">View All</button>
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
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <ArrowDownRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.name}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <p className={`font-medium ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
