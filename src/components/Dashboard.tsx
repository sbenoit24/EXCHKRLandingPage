import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { DollarSign, Users, Calendar, TrendingUp, AlertCircle, Plus, Receipt, ArrowUpRight, ArrowDownRight, Send, CreditCard, FileText, Sparkles } from 'lucide-react'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { PaymentModal } from './PaymentModal'
import { BillingModal } from './BillingModal'
import { BudgetAnalyzerModal } from './BudgetAnalyzerModal'

interface DashboardProps {
  user: any
  onOpenExpenseModal: () => void
  onNavigateToFinances?: () => void
  onNavigateToMembers?: () => void
  onNavigateToEvents?: () => void
}

export function Dashboard({ user, onOpenExpenseModal, onNavigateToFinances, onNavigateToMembers, onNavigateToEvents }: DashboardProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showBillingModal, setShowBillingModal] = useState(false)
  const [showBudgetAnalyzer, setShowBudgetAnalyzer] = useState(false)
  const [paymentMode, setPaymentMode] = useState<'send' | 'receive'>('receive')

  const kpiData = [
    {
      title: 'Current Balance',
      value: '$8,450.75',
      change: '+12.5% from last month',
      icon: DollarSign,
      trend: 'up',
      color: 'bg-gray-500',
      onClick: onNavigateToFinances
    },
    {
      title: 'Dues Collected',
      value: '$7,500',
      change: '50 of 67 members paid',
      icon: TrendingUp,
      trend: 'up',
      color: 'bg-[#c39a4e]',
      progress: 75,
      onClick: onNavigateToFinances
    },
    {
      title: 'Active Members',
      value: '67',
      change: '+3 this month',
      icon: Users,
      trend: 'up',
      color: 'bg-[#B8DFFF]',
      onClick: onNavigateToMembers
    },
    {
      title: 'Upcoming Events',
      value: '5',
      change: '2 this week',
      icon: Calendar,
      trend: 'neutral',
      color: 'bg-[#122B5B]',
      onClick: onNavigateToEvents
    }
  ]

  const recentActivity = [
    { type: 'payment', user: 'Alex Rodriguez', action: 'paid Fall dues', amount: '+$150', time: '2 hours ago', status: 'completed' },
    { type: 'expense', user: 'Luca', action: 'submitted expense for Film Festival', amount: '-$450', time: '4 hours ago', status: 'pending' },
    { type: 'payment', user: 'Jamie Park', action: 'paid partial dues', amount: '+$75', time: '1 day ago', status: 'completed' },
    { type: 'expense', user: 'Mike Johnson', action: 'reimbursement approved', amount: '-$200', time: '2 days ago', status: 'completed' },
    { type: 'payment', user: 'Emily Davis', action: 'paid Fall dues', amount: '+$150', time: '3 days ago', status: 'completed' }
  ]

  const upcomingEvents = [
    { name: 'Fall Formal', date: 'Nov 15', budget: '$8,500', spent: '$7,250', status: 'in-progress' },
    { name: 'Charity 5K Run', date: 'Nov 22', budget: '$3,500', spent: '$2,100', status: 'in-progress' },
    { name: 'AI Workshop', date: 'Nov 25', budget: '$2,500', spent: '$1,850', status: 'planning' }
  ]

  const pendingActions = [
    { title: '17 members need dues reminder', action: 'Send Reminder', type: 'members' },
    { title: '3 expense requests awaiting approval', action: 'Review', type: 'finances' },
    { title: 'Fall Formal budget at 85%', action: 'View Details', type: 'events' }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-[#122B5B] text-white p-8">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h1 className="text-4xl mb-2">Welcome back, {user.name}! 👋</h1>
            <p className="text-blue-100 text-lg">
              {user.organization} • {user.role}
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowBillingModal(true)}
              className="bg-white text-[#122B5B] hover:bg-white/90"
            >
              <FileText className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
            <Button 
              onClick={() => {
                setPaymentMode('receive')
                setShowPaymentModal(true)
              }} 
              className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Collect Payment
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon
          return (
            <Card 
              key={index} 
              className="relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={kpi.onClick}
            >
              <div className={`absolute inset-0 ${kpi.color} opacity-10`}></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm text-muted-foreground">{kpi.title}</CardTitle>
                  <div className={`p-2 rounded-full ${kpi.color}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl mb-2">{kpi.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    {kpi.trend === 'up' && <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />}
                    {kpi.trend === 'down' && <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />}
                    {kpi.change}
                  </p>
                  {kpi.progress && (
                    <Progress value={kpi.progress} className="h-2 mt-3" />
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Pending Actions */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-[#c39a4e]" />
                Pending Actions
              </CardTitle>
              <CardDescription>Tasks that need your attention</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingActions.map((action, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#c39a4e] rounded-full"></div>
                  <span className="font-medium">{action.title}</span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    if (action.type === 'members') onNavigateToMembers?.()
                    if (action.type === 'finances') onNavigateToFinances?.()
                    if (action.type === 'events') onNavigateToEvents?.()
                  }}
                >
                  {action.action}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Budget Analyzer CTA */}
      <Card className="border-2 border-[#c39a4e] bg-gradient-to-r from-[#c39a4e]/10 via-[#B8DFFF]/10 to-[#122B5B]/10 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#c39a4e] rounded-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-medium mb-1 flex items-center gap-2">
                  AI Budget Analyzer
                  <Badge className="bg-[#c39a4e] text-white">New</Badge>
                </h3>
                <p className="text-muted-foreground mb-3">
                  Upload a screenshot of your past budget and get AI-powered insights, recommendations, and optimization strategies
                </p>
                <div className="flex gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Identify savings
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Smart suggestions
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Receipt className="h-3 w-3" />
                    Best practices
                  </span>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setShowBudgetAnalyzer(true)}
              className="bg-[#c39a4e] hover:bg-[#c39a4e]/90 text-white whitespace-nowrap"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Try AI Analyzer
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-[#122B5B]" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest transactions and updates</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={onNavigateToFinances}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${activity.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {activity.amount}
                    </p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#122B5B]" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>Events and their budget status</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={onNavigateToEvents}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => {
                const budgetNum = parseFloat(event.budget.replace('$', '').replace(',', ''))
                const spentNum = parseFloat(event.spent.replace('$', '').replace(',', ''))
                const percentage = (spentNum / budgetNum) * 100
                
                return (
                  <div key={index} className="p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{event.name}</h4>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                      <Badge className={
                        event.status === 'in-progress' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Budget Usage</span>
                        <span className={percentage > 90 ? 'text-red-600' : 'text-[#122B5B]'}>
                          {event.spent} / {event.budget}
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        mode={paymentMode}
        defaultAmount={paymentMode === 'receive' ? 150 : undefined}
        purpose={paymentMode === 'receive' ? 'Fall 2024 Dues' : 'Reimbursement'}
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
