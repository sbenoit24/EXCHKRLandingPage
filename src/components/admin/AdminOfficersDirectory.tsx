import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Search, Mail, Download, UserCog, CheckCircle, AlertCircle, Phone } from 'lucide-react'

interface AdminOfficersDirectoryProps {
  selectedOrg: string
}

export function AdminOfficersDirectory({ selectedOrg }: AdminOfficersDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterTraining, setFilterTraining] = useState('all')
  const [filterCampus, setFilterCampus] = useState('all')

  const officers = [
    { id: 1, name: 'John Smith', club: 'Robotics Club', campus: 'Stanford', role: 'President', email: 'john@email.com', phone: '(555) 123-4567', trained: true, lastActive: '2024-11-08' },
    { id: 2, name: 'Sarah Johnson', club: 'Student Government', campus: 'Berkeley', role: 'Vice President', email: 'sarah@email.com', phone: '(555) 234-5678', trained: true, lastActive: '2024-11-09' },
    { id: 3, name: 'Mike Chen', club: 'Chess Club', campus: 'MIT', role: 'Treasurer', email: 'mike@email.com', phone: '(555) 345-6789', trained: true, lastActive: '2024-11-07' },
    { id: 4, name: 'Emily Davis', club: 'Dance Team', campus: 'Harvard', role: 'Secretary', email: 'emily@email.com', phone: '(555) 456-7890', trained: false, lastActive: '2024-11-05' },
    { id: 5, name: 'David Wilson', club: 'Debate Society', campus: 'Stanford', role: 'President', email: 'david@email.com', phone: '(555) 567-8901', trained: true, lastActive: '2024-11-06' },
    { id: 6, name: 'Lisa Anderson', club: 'Environmental Action', campus: 'Berkeley', role: 'Treasurer', email: 'lisa@email.com', phone: '(555) 678-9012', trained: false, lastActive: '2024-11-04' }
  ]

  const filteredOfficers = officers.filter(officer => {
    const matchesSearch = officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         officer.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         officer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || officer.role === filterRole
    const matchesTraining = filterTraining === 'all' || 
                           (filterTraining === 'trained' && officer.trained) ||
                           (filterTraining === 'untrained' && !officer.trained)
    const matchesCampus = filterCampus === 'all' || officer.campus === filterCampus
    
    return matchesSearch && matchesRole && matchesTraining && matchesCampus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Officers Directory</h1>
          <p className="text-muted-foreground">
            Manage all club officers across your network
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Email All
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
            <p className="text-sm text-muted-foreground mb-1">Total Officers</p>
            <p className="text-2xl">{officers.length}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Trained</p>
            <p className="text-2xl text-green-600">
              {officers.filter(o => o.trained).length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Pending Training</p>
            <p className="text-2xl text-amber-600">
              {officers.filter(o => !o.trained).length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Training Rate</p>
            <p className="text-2xl">
              {Math.round((officers.filter(o => o.trained).length / officers.length) * 100)}%
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
                placeholder="Search officers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Roles</option>
              <option value="President">President</option>
              <option value="Vice President">Vice President</option>
              <option value="Treasurer">Treasurer</option>
              <option value="Secretary">Secretary</option>
            </select>
            <select
              value={filterTraining}
              onChange={(e) => setFilterTraining(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Training Status</option>
              <option value="trained">Trained</option>
              <option value="untrained">Pending Training</option>
            </select>
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
          </div>
        </CardContent>
      </Card>

      {/* Officers Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Officers ({filteredOfficers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Club</TableHead>
                <TableHead>Campus</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Training Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOfficers.map((officer) => (
                <TableRow key={officer.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-[#B8DFFF]">
                        <UserCog className="h-4 w-4 text-[#122B5B]" />
                      </div>
                      <span className="font-medium">{officer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{officer.club}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {officer.campus}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {officer.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {officer.email}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {officer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {officer.trained ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Complete
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(officer.lastActive).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Mail className="h-3 w-3" />
                      </Button>
                      {!officer.trained && (
                        <Button variant="outline" size="sm">
                          Send Reminder
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
