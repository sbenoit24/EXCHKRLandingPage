import { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { 
  Plus,
  Search,
  UserPlus,
  Mail,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter
} from 'lucide-react'

export function MobileMembers() {
  const [searchQuery, setSearchQuery] = useState('')

  const memberStats = {
    total: 48,
    active: 45,
    pending: 3,
    duesCollected: 14400
  }

  const members = [
    { id: 1, name: 'Luca', email: 'luca@email.com', status: 'active', dues: 'paid', joinDate: 'Sep 2023', role: 'Treasurer' },
    { id: 2, name: 'Alex Rodriguez', email: 'alex@email.com', status: 'active', dues: 'paid', joinDate: 'Sep 2023', role: 'Member' },
    { id: 3, name: 'Jamie Park', email: 'jamie@email.com', status: 'active', dues: 'paid', joinDate: 'Oct 2023', role: 'Member' },
    { id: 4, name: 'Emily Davis', email: 'emily@email.com', status: 'active', dues: 'pending', joinDate: 'Jan 2024', role: 'Member' },
    { id: 5, name: 'Michael Brown', email: 'michael@email.com', status: 'active', dues: 'paid', joinDate: 'Sep 2023', role: 'Vice President' },
    { id: 6, name: 'Sarah Johnson', email: 'sarah@email.com', status: 'active', dues: 'overdue', joinDate: 'Nov 2023', role: 'Member' },
    { id: 7, name: 'David Lee', email: 'david@email.com', status: 'pending', dues: 'pending', joinDate: 'Mar 2024', role: 'Member' },
    { id: 8, name: 'Lisa Martinez', email: 'lisa@email.com', status: 'active', dues: 'paid', joinDate: 'Dec 2023', role: 'Secretary' }
  ]

  const getDuesBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Paid' }
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-700', icon: Clock, text: 'Pending' }
      case 'overdue':
        return { color: 'bg-red-100 text-red-700', icon: AlertCircle, text: 'Overdue' }
      default:
        return { color: 'bg-gray-100 text-gray-700', icon: Clock, text: status }
    }
  }

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 pt-12 pb-4">
          <h1 className="text-2xl mb-4">Members</h1>
          
          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white h-11">
              <UserPlus className="mr-2 h-5 w-5" />
              Add Member
            </Button>
            <Button variant="outline" className="h-11">
              <Mail className="mr-2 h-5 w-5" />
              Send Invite
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Total Members</span>
              </div>
              <p className="text-3xl font-bold text-[#122B5B]">{memberStats.total}</p>
              <p className="text-xs text-green-600 mt-1">+3 this month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Dues Collected</span>
              </div>
              <p className="text-3xl font-bold text-green-600">${(memberStats.duesCollected / 1000).toFixed(1)}k</p>
              <p className="text-xs text-muted-foreground mt-1">This semester</p>
            </CardContent>
          </Card>
        </div>

        {/* Status Overview */}
        <Card className="border-0 shadow">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3 text-sm">Membership Status</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="h-12 w-12 mx-auto mb-2 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold">{memberStats.active}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
              <div>
                <div className="h-12 w-12 mx-auto mb-2 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <p className="text-2xl font-bold">{memberStats.pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
              <div>
                <div className="h-12 w-12 mx-auto mb-2 rounded-full bg-[#B8DFFF] flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-[#122B5B]" />
                </div>
                <p className="text-2xl font-bold">42</p>
                <p className="text-xs text-muted-foreground">Paid Dues</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Members List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">All Members ({filteredMembers.length})</h3>
            <button className="flex items-center gap-1 text-xs text-[#122B5B]">
              <Filter className="h-3 w-3" />
              Filter
            </button>
          </div>

          <div className="space-y-3">
            {filteredMembers.map((member) => {
              const duesBadge = getDuesBadge(member.dues)
              const DuesIcon = duesBadge.icon

              return (
                <Card key={member.id} className="border-0 shadow active:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-[#122B5B] text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm truncate">{member.name}</h4>
                            <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs">
                            {member.role}
                          </Badge>
                          <Badge className={duesBadge.color + ' text-xs'}>
                            <DuesIcon className="h-3 w-3 mr-1" />
                            {duesBadge.text}
                          </Badge>
                          {member.status === 'pending' && (
                            <Badge variant="outline" className="text-xs">
                              Pending Approval
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-xs text-muted-foreground mt-2">
                          Joined {member.joinDate}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow bg-[#B8DFFF]/20 border-[#B8DFFF]">
          <CardContent className="p-4">
            <h4 className="font-medium text-sm mb-2">Quick Actions</h4>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start h-10">
                <Mail className="mr-2 h-4 w-4" />
                Send Dues Reminder
              </Button>
              <Button variant="ghost" className="w-full justify-start h-10">
                <DollarSign className="mr-2 h-4 w-4" />
                Collect Payments
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
