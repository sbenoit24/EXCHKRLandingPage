import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { 
  Search, 
  Filter, 
  Download,
  Eye,
  Building2,
  Users,
  DollarSign,
  Calendar,
  ArrowUpDown,
  Plus
} from 'lucide-react'
import { AdminClubProfile } from './AdminClubProfile'

interface AdminClubsDirectoryProps {
  selectedOrg: string
}

export function AdminClubsDirectory({ selectedOrg }: AdminClubsDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterActivity, setFilterActivity] = useState('all')
  const [selectedClub, setSelectedClub] = useState<any>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table')

  const clubs = [
    {
      id: 1,
      name: 'Robotics Club',
      campus: 'Stanford University',
      category: 'STEM',
      status: 'Recognized',
      officers: 8,
      members: 145,
      balance: 12500,
      lastEvent: '2024-11-01',
      lastTransaction: '2024-11-05',
      activityLevel: 'high'
    },
    {
      id: 2,
      name: 'Student Government',
      campus: 'UC Berkeley',
      category: 'Governance',
      status: 'Recognized',
      officers: 12,
      members: 45,
      balance: 85000,
      lastEvent: '2024-11-08',
      lastTransaction: '2024-11-09',
      activityLevel: 'high'
    },
    {
      id: 3,
      name: 'Chess Club',
      campus: 'MIT',
      category: 'Recreation',
      status: 'Recognized',
      officers: 5,
      members: 78,
      balance: 3200,
      lastEvent: '2024-10-28',
      lastTransaction: '2024-10-30',
      activityLevel: 'medium'
    },
    {
      id: 4,
      name: 'Dance Team',
      campus: 'Harvard University',
      category: 'Arts',
      status: 'Pending',
      officers: 6,
      members: 92,
      balance: 5600,
      lastEvent: '2024-10-15',
      lastTransaction: '2024-10-20',
      activityLevel: 'medium'
    },
    {
      id: 5,
      name: 'Debate Society',
      campus: 'Stanford University',
      category: 'Academic',
      status: 'Recognized',
      officers: 7,
      members: 56,
      balance: 8900,
      lastEvent: '2024-09-12',
      lastTransaction: '2024-08-15',
      activityLevel: 'low'
    },
    {
      id: 6,
      name: 'Environmental Action',
      campus: 'UC Berkeley',
      category: 'Service',
      status: 'Recognized',
      officers: 9,
      members: 203,
      balance: 15400,
      lastEvent: '2024-11-06',
      lastTransaction: '2024-11-07',
      activityLevel: 'high'
    },
    {
      id: 7,
      name: 'Photography Club',
      campus: 'MIT',
      category: 'Arts',
      status: 'Inactive',
      officers: 3,
      members: 34,
      balance: 1200,
      lastEvent: '2024-06-20',
      lastTransaction: '2024-07-01',
      activityLevel: 'low'
    },
    {
      id: 8,
      name: 'Entrepreneurship Society',
      campus: 'Harvard University',
      category: 'Business',
      status: 'Recognized',
      officers: 10,
      members: 167,
      balance: 22000,
      lastEvent: '2024-11-03',
      lastTransaction: '2024-11-04',
      activityLevel: 'high'
    }
  ]

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.campus.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || club.category === filterCategory
    const matchesStatus = filterStatus === 'all' || club.status === filterStatus
    const matchesActivity = filterActivity === 'all' || club.activityLevel === filterActivity
    
    return matchesSearch && matchesCategory && matchesStatus && matchesActivity
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Recognized':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-amber-100 text-amber-800'
      case 'Inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getActivityBadge = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-amber-100 text-amber-800'
      case 'low':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (selectedClub) {
    return (
      <div>
        <Button 
          variant="ghost" 
          onClick={() => setSelectedClub(null)}
          className="mb-4"
        >
          ← Back to Clubs Directory
        </Button>
        <AdminClubProfile club={selectedClub} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Clubs Directory</h1>
          <p className="text-muted-foreground">
            Manage all clubs across your organization network
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Club
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Clubs</p>
            <p className="text-2xl">{clubs.length}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Recognized</p>
            <p className="text-2xl text-green-600">
              {clubs.filter(c => c.status === 'Recognized').length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Pending</p>
            <p className="text-2xl text-amber-600">
              {clubs.filter(c => c.status === 'Pending').length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Inactive</p>
            <p className="text-2xl text-red-600">
              {clubs.filter(c => c.status === 'Inactive').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Categories</option>
              <option value="STEM">STEM</option>
              <option value="Arts">Arts</option>
              <option value="Business">Business</option>
              <option value="Service">Service</option>
              <option value="Academic">Academic</option>
              <option value="Recreation">Recreation</option>
              <option value="Governance">Governance</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Status</option>
              <option value="Recognized">Recognized</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select
              value={filterActivity}
              onChange={(e) => setFilterActivity(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Activity Levels</option>
              <option value="high">High Activity</option>
              <option value="medium">Medium Activity</option>
              <option value="low">Low Activity</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Clubs Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Clubs ({filteredClubs.length})</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <ArrowUpDown className="h-4 w-4 mr-1" />
                Sort
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Club Name</TableHead>
                <TableHead>Campus</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Officers</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClubs.map((club) => (
                <TableRow key={club.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-[#B8DFFF]">
                        <Building2 className="h-4 w-4 text-[#122B5B]" />
                      </div>
                      <span className="font-medium">{club.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {club.campus}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {club.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(club.status)}>
                      {club.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{club.officers}</TableCell>
                  <TableCell className="text-sm">{club.members}</TableCell>
                  <TableCell className="text-sm font-medium text-[#c39a4e]">
                    ${club.balance.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={getActivityBadge(club.activityLevel)}>
                      {club.activityLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedClub(club)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
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
