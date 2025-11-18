import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { Input } from '../ui/input'
import { CheckCircle, AlertCircle, Clock, Mail, Search, Download, Filter } from 'lucide-react'

interface AdminComplianceCenterProps {
  selectedOrg: string
}

export function AdminComplianceCenter({ selectedOrg }: AdminComplianceCenterProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')

  const complianceItems = [
    { 
      club: 'Robotics Club', 
      campus: 'Stanford', 
      items: [
        { name: 'Officer Training', status: 'complete', dueDate: '2024-09-15', type: 'training' },
        { name: 'Annual Report', status: 'complete', dueDate: '2024-10-01', type: 'filing' },
        { name: 'Insurance Documentation', status: 'complete', dueDate: '2024-11-30', type: 'document' },
        { name: 'Budget Approval', status: 'complete', dueDate: '2024-09-01', type: 'filing' }
      ]
    },
    {
      club: 'Dance Team',
      campus: 'Harvard',
      items: [
        { name: 'Officer Training', status: 'pending', dueDate: '2024-09-15', type: 'training' },
        { name: 'Annual Report', status: 'complete', dueDate: '2024-10-01', type: 'filing' },
        { name: 'Insurance Documentation', status: 'overdue', dueDate: '2024-10-30', type: 'document' },
        { name: 'Budget Approval', status: 'complete', dueDate: '2024-09-01', type: 'filing' }
      ]
    },
    {
      club: 'Photography Club',
      campus: 'MIT',
      items: [
        { name: 'Officer Training', status: 'pending', dueDate: '2024-09-15', type: 'training' },
        { name: 'Annual Report', status: 'pending', dueDate: '2024-11-15', type: 'filing' },
        { name: 'Insurance Documentation', status: 'pending', dueDate: '2024-11-30', type: 'document' },
        { name: 'Budget Approval', status: 'complete', dueDate: '2024-09-01', type: 'filing' }
      ]
    },
    {
      club: 'Environmental Action',
      campus: 'Berkeley',
      items: [
        { name: 'Officer Training', status: 'complete', dueDate: '2024-09-15', type: 'training' },
        { name: 'Annual Report', status: 'complete', dueDate: '2024-10-01', type: 'filing' },
        { name: 'Insurance Documentation', status: 'pending', dueDate: '2024-11-30', type: 'document' },
        { name: 'Budget Approval', status: 'complete', dueDate: '2024-09-01', type: 'filing' }
      ]
    }
  ]

  const calculateComplianceRate = (items: any[]) => {
    const completed = items.filter(i => i.status === 'complete').length
    return Math.round((completed / items.length) * 100)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'complete':
        return { className: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Complete' }
      case 'pending':
        return { className: 'bg-amber-100 text-amber-800', icon: Clock, label: 'Pending' }
      case 'overdue':
        return { className: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'Overdue' }
      default:
        return { className: 'bg-gray-100 text-gray-800', icon: Clock, label: 'Unknown' }
    }
  }

  const totalItems = complianceItems.reduce((sum, club) => sum + club.items.length, 0)
  const completedItems = complianceItems.reduce((sum, club) => 
    sum + club.items.filter(i => i.status === 'complete').length, 0)
  const pendingItems = complianceItems.reduce((sum, club) => 
    sum + club.items.filter(i => i.status === 'pending').length, 0)
  const overdueItems = complianceItems.reduce((sum, club) => 
    sum + club.items.filter(i => i.status === 'overdue').length, 0)

  const filteredClubs = complianceItems.filter(club => {
    const matchesSearch = club.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.campus.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filterStatus !== 'all') {
      const hasStatus = club.items.some(item => item.status === filterStatus)
      if (!hasStatus) return false
    }
    
    if (filterType !== 'all') {
      const hasType = club.items.some(item => item.type === filterType)
      if (!hasType) return false
    }
    
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Compliance Center</h1>
          <p className="text-muted-foreground">
            Monitor compliance status for all clubs and organizations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Bulk Reminder
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Total Items</p>
              <div className="p-2 rounded-full bg-[#122B5B]/10">
                <CheckCircle className="h-5 w-5 text-[#122B5B]" />
              </div>
            </div>
            <p className="text-3xl mb-1">{totalItems}</p>
            <Progress value={(completedItems / totalItems) * 100} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round((completedItems / totalItems) * 100)}% complete
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Completed</p>
              <div className="p-2 rounded-full bg-green-500/10">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <p className="text-3xl mb-1 text-green-600">{completedItems}</p>
            <p className="text-xs text-muted-foreground">Items completed</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Pending</p>
              <div className="p-2 rounded-full bg-amber-500/10">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <p className="text-3xl mb-1 text-amber-600">{pendingItems}</p>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground">Overdue</p>
              <div className="p-2 rounded-full bg-red-500/10">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <p className="text-3xl mb-1 text-red-600">{overdueItems}</p>
            <p className="text-xs text-muted-foreground">Past due date</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clubs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Status</option>
              <option value="complete">Complete</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Types</option>
              <option value="training">Training</option>
              <option value="filing">Filings</option>
              <option value="document">Documents</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Compliance List */}
      <div className="space-y-4">
        {filteredClubs.map((club, idx) => {
          const complianceRate = calculateComplianceRate(club.items)
          const hasOverdue = club.items.some(i => i.status === 'overdue')
          const hasPending = club.items.some(i => i.status === 'pending')
          
          return (
            <Card 
              key={idx} 
              className={`shadow-lg ${hasOverdue ? 'border-l-4 border-l-red-500' : hasPending ? 'border-l-4 border-l-amber-500' : 'border-l-4 border-l-green-500'}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      <span>{club.club}</span>
                      <Badge variant="outline" className="text-xs">{club.campus}</Badge>
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-muted-foreground">
                        {club.items.filter(i => i.status === 'complete').length} of {club.items.length} complete
                      </span>
                      <Progress value={complianceRate} className="w-32 h-2" />
                      <span className="text-sm font-medium">{complianceRate}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {(hasPending || hasOverdue) && (
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Reminder
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {club.items.map((item, itemIdx) => {
                    const statusInfo = getStatusBadge(item.status)
                    const StatusIcon = statusInfo.icon
                    const isPastDue = item.status === 'overdue' || 
                      (item.status === 'pending' && new Date(item.dueDate) < new Date())
                    
                    return (
                      <div 
                        key={itemIdx} 
                        className={`p-3 rounded-lg border ${
                          item.status === 'complete' ? 'bg-green-50/50' : 
                          item.status === 'overdue' ? 'bg-red-50' : 
                          'bg-amber-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <StatusIcon className={`h-4 w-4 ${
                                item.status === 'complete' ? 'text-green-600' :
                                item.status === 'overdue' ? 'text-red-600' :
                                'text-amber-600'
                              }`} />
                              <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Badge variant="outline" className="text-xs capitalize">
                                {item.type}
                              </Badge>
                              <span>•</span>
                              <span className={isPastDue ? 'text-red-600' : ''}>
                                Due: {new Date(item.dueDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <Badge className={statusInfo.className}>
                            {statusInfo.label}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
