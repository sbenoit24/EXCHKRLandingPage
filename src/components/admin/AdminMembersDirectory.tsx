import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Search, Mail, Download, Users, Upload } from 'lucide-react'

interface AdminMembersDirectoryProps {
  selectedOrg: string
}

export function AdminMembersDirectory({ selectedOrg }: AdminMembersDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCampus, setFilterCampus] = useState('all')
  const [filterDuesStatus, setFilterDuesStatus] = useState('all')
  const [filterYear, setFilterYear] = useState('all')

  const members = [
    { id: 1, name: 'Alex Thompson', club: 'Robotics Club', campus: 'Stanford', year: 'Junior', major: 'Computer Science', duesStatus: 'Paid', joinDate: '2023-09-01' },
    { id: 2, name: 'Maria Garcia', club: 'Student Government', campus: 'Berkeley', year: 'Sophomore', major: 'Engineering', duesStatus: 'Paid', joinDate: '2023-09-05' },
    { id: 3, name: 'James Wilson', club: 'Chess Club', campus: 'MIT', year: 'Senior', major: 'Mathematics', duesStatus: 'Partial', joinDate: '2023-09-10' },
    { id: 4, name: 'Lisa Anderson', club: 'Dance Team', campus: 'Harvard', year: 'Freshman', major: 'Physics', duesStatus: 'Unpaid', joinDate: '2023-09-15' },
    { id: 5, name: 'Robert Brown', club: 'Debate Society', campus: 'Stanford', year: 'Senior', major: 'Political Science', duesStatus: 'Paid', joinDate: '2023-08-25' },
    { id: 6, name: 'Emma Davis', club: 'Environmental Action', campus: 'Berkeley', year: 'Junior', major: 'Biology', duesStatus: 'Paid', joinDate: '2023-09-08' },
    { id: 7, name: 'Michael Lee', club: 'Photography Club', campus: 'MIT', year: 'Sophomore', major: 'Media Arts', duesStatus: 'Unpaid', joinDate: '2023-09-12' },
    { id: 8, name: 'Sophia Martinez', club: 'Entrepreneurship Society', campus: 'Harvard', year: 'Junior', major: 'Business', duesStatus: 'Partial', joinDate: '2023-09-03' }
  ]

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.major.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCampus = filterCampus === 'all' || member.campus === filterCampus
    const matchesDuesStatus = filterDuesStatus === 'all' || member.duesStatus === filterDuesStatus
    const matchesYear = filterYear === 'all' || member.year === filterYear
    
    return matchesSearch && matchesCampus && matchesDuesStatus && matchesYear
  })

  const getDuesStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800'
      case 'Partial':
        return 'bg-amber-100 text-amber-800'
      case 'Unpaid':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Members Directory</h1>
          <p className="text-muted-foreground">
            View and manage all members across your network
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Members</p>
            <p className="text-2xl">{members.length}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Dues Paid</p>
            <p className="text-2xl text-green-600">
              {members.filter(m => m.duesStatus === 'Paid').length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Partial Payment</p>
            <p className="text-2xl text-amber-600">
              {members.filter(m => m.duesStatus === 'Partial').length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Unpaid</p>
            <p className="text-2xl text-red-600">
              {members.filter(m => m.duesStatus === 'Unpaid').length}
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
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={filterCampus}
              onChange={(e) => setFilterCampus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Campuses</option>
              <option value="Stanford">Stanford</option>
              <option value="Berkeley">Berkeley</option>
              <option value="MIT">MIT</option>
              <option value="Harvard">Harvard</option>
            </select>
            <select
              value={filterDuesStatus}
              onChange={(e) => setFilterDuesStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Dues Status</option>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Unpaid">Unpaid</option>
            </select>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Years</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Members ({filteredMembers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Club</TableHead>
                <TableHead>Campus</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Major</TableHead>
                <TableHead>Dues Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-[#B8DFFF]">
                        <Users className="h-4 w-4 text-[#122B5B]" />
                      </div>
                      <span className="font-medium">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{member.club}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {member.campus}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {member.year}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {member.major}
                  </TableCell>
                  <TableCell>
                    <Badge className={getDuesStatusBadge(member.duesStatus)}>
                      {member.duesStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(member.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      {member.duesStatus !== 'Paid' && (
                        <Button variant="outline" size="sm">
                          <Mail className="h-3 w-3 mr-1" />
                          Remind
                        </Button>
                      )}
                    </div>
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
