import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Progress } from '../ui/progress'
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  FileText
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface AdminOverviewProps {
  selectedOrg: string
}

export function AdminOverview({ selectedOrg }: AdminOverviewProps) {
  const kpiData = {
    totalClubs: 347,
    activeClubs: 312,
    totalMembers: 28450,
    recognizedClubs: 298,
    treasuryBalance: 2845000,
    recentTransactions: 1247,
    inactiveClubs: 35,
    overdueFilings: 12,
    missingOfficers: 8
  }

  const membershipGrowthData = [
    { month: 'Sep', members: 24500 },
    { month: 'Oct', members: 25800 },
    { month: 'Nov', members: 27200 },
    { month: 'Dec', members: 26800 },
    { month: 'Jan', members: 28100 },
    { month: 'Feb', members: 28450 }
  ]

  const transactionVolumeData = [
    { month: 'Sep', volume: 185000 },
    { month: 'Oct', volume: 220000 },
    { month: 'Nov', volume: 195000 },
    { month: 'Dec', volume: 275000 },
    { month: 'Jan', volume: 240000 },
    { month: 'Feb', volume: 290000 }
  ]

  const recentActivity = [
    { id: 1, club: 'Robotics Club', campus: 'Stanford', action: 'Submitted reimbursement request', amount: 450, time: '10m ago' },
    { id: 2, club: 'Student Government', campus: 'Berkeley', action: 'Updated officer roster', time: '23m ago' },
    { id: 3, club: 'Chess Club', campus: 'MIT', action: 'Received recognition approval', time: '1h ago' },
    { id: 4, club: 'Dance Team', campus: 'Harvard', action: 'Completed compliance training', time: '2h ago' },
    { id: 5, club: 'Debate Society', campus: 'Stanford', action: 'Submitted annual report', time: '3h ago' }
  ]

  const alerts = [
    { id: 1, type: 'error', message: '35 inactive clubs for over 90 days', count: 35 },
    { id: 2, type: 'warning', message: 'Overdue compliance filings', count: 12 },
    { id: 3, type: 'info', message: 'Missing officer updates', count: 8 }
  ]

  const campusBreakdown = [
    { campus: 'Stanford University', clubs: 89, members: 7850, balance: 785000 },
    { campus: 'UC Berkeley', clubs: 102, members: 9200, balance: 920000 },
    { campus: 'MIT', clubs: 76, members: 5600, balance: 560000 },
    { campus: 'Harvard University', clubs: 80, members: 5800, balance: 580000 }
  ]

  const getOrgTitle = () => {
    if (selectedOrg === 'all') return 'Network Overview'
    const org = campusBreakdown.find(c => c.campus.toLowerCase().includes(selectedOrg))
    return org ? org.campus : 'Organization Overview'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">{getOrgTitle()}</h1>
        <p className="text-muted-foreground">
          Monitor all clubs, members, and financial activity across your network
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Total Clubs</p>
              <div className="p-2 rounded-full bg-[#122B5B]/10">
                <Building2 className="h-5 w-5 text-[#122B5B]" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl">{kpiData.totalClubs}</p>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12 this month
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Active Clubs</p>
              <div className="p-2 rounded-full bg-green-500/10">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl">{kpiData.activeClubs}</p>
              <div className="flex items-center gap-2">
                <Progress value={(kpiData.activeClubs / kpiData.totalClubs) * 100} className="h-2 flex-1" />
                <span className="text-xs text-muted-foreground">90%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Total Members</p>
              <div className="p-2 rounded-full bg-[#B8DFFF]/50">
                <Users className="h-5 w-5 text-[#122B5B]" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl">{kpiData.totalMembers.toLocaleString()}</p>
              <div className="flex items-center gap-1 text-green-600 text-xs">
                <ArrowUpRight className="h-3 w-3" />
                <span>+8.5% from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Treasury Balance</p>
              <div className="p-2 rounded-full bg-[#c39a4e]/10">
                <DollarSign className="h-5 w-5 text-[#c39a4e]" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-3xl">${(kpiData.treasuryBalance / 1000000).toFixed(2)}M</p>
              <p className="text-xs text-muted-foreground">{kpiData.recentTransactions} recent transactions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <Card className="border-l-4 border-l-red-500 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      alert.type === 'error' ? 'bg-red-100' : alert.type === 'warning' ? 'bg-amber-100' : 'bg-blue-100'
                    }`}>
                      {alert.type === 'error' && <AlertCircle className="h-4 w-4 text-red-600" />}
                      {alert.type === 'warning' && <Clock className="h-4 w-4 text-amber-600" />}
                      {alert.type === 'info' && <FileText className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div>
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.count} items need attention</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Membership Growth */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Membership Growth</span>
              <Badge variant="outline" className="text-xs">Last 6 months</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={membershipGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="members" 
                  stroke="#122B5B" 
                  strokeWidth={3}
                  dot={{ fill: '#122B5B', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transaction Volume */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Transaction Volume</span>
              <Badge variant="outline" className="text-xs">Last 6 months</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={transactionVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="volume" fill="#c39a4e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Campus Breakdown Table */}
      {selectedOrg === 'all' && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Campus Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campusBreakdown.map((campus) => (
                <div key={campus.campus} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium">{campus.campus}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {campus.clubs} clubs
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {campus.members.toLocaleString()} members
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        ${(campus.balance / 1000).toLocaleString()}K
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="p-2 rounded-full bg-[#B8DFFF] mt-1">
                  <Building2 className="h-4 w-4 text-[#122B5B]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{activity.club}</p>
                    <Badge variant="outline" className="text-xs">{activity.campus}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                  {activity.amount && (
                    <p className="text-sm text-[#c39a4e] mt-1">${activity.amount}</p>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
