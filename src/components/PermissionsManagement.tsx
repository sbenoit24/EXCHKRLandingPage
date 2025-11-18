import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback } from './ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { 
  Search, 
  Shield, 
  Settings, 
  Users, 
  DollarSign,
  Calendar,
  BarChart3,
  UserCog,
  Save,
  AlertCircle
} from 'lucide-react'
import { Alert, AlertDescription } from './ui/alert'

interface Permission {
  id: string
  label: string
  description: string
  icon: any
}

interface MemberPermissions {
  id: string
  name: string
  email: string
  role: string
  permissions: {
    viewFinances: boolean
    editFinances: boolean
    viewEvents: boolean
    editEvents: boolean
    viewMembers: boolean
    editMembers: boolean
    viewAnalytics: boolean
    managePermissions: boolean
  }
}

export function PermissionsManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [showSaveAlert, setShowSaveAlert] = useState(false)

  const permissions: Permission[] = [
    {
      id: 'viewFinances',
      label: 'View Finances',
      description: 'Can view financial data, transactions, and budgets',
      icon: DollarSign
    },
    {
      id: 'editFinances',
      label: 'Edit Finances',
      description: 'Can create transactions, manage budgets, and approve expenses',
      icon: DollarSign
    },
    {
      id: 'viewEvents',
      label: 'View Events',
      description: 'Can view all events including drafts',
      icon: Calendar
    },
    {
      id: 'editEvents',
      label: 'Edit Events',
      description: 'Can create, edit, publish, and delete events',
      icon: Calendar
    },
    {
      id: 'viewMembers',
      label: 'View Members',
      description: 'Can view member directory and profiles',
      icon: Users
    },
    {
      id: 'editMembers',
      label: 'Manage Members',
      description: 'Can add, edit, and remove members',
      icon: Users
    },
    {
      id: 'viewAnalytics',
      label: 'Access Analytics',
      description: 'Can view reports, charts, and analytics dashboards',
      icon: BarChart3
    },
    {
      id: 'managePermissions',
      label: 'Manage Permissions',
      description: 'Can modify permissions for other users (Admin only)',
      icon: Shield
    }
  ]

  const [members, setMembers] = useState<MemberPermissions[]>([
    {
      id: '1',
      name: 'Luca Martinez',
      email: 'luca@filmclub.edu',
      role: 'Admin',
      permissions: {
        viewFinances: true,
        editFinances: true,
        viewEvents: true,
        editEvents: true,
        viewMembers: true,
        editMembers: true,
        viewAnalytics: true,
        managePermissions: true
      }
    },
    {
      id: '2',
      name: 'Alex Rodriguez',
      email: 'alex.r@filmclub.edu',
      role: 'Treasurer',
      permissions: {
        viewFinances: true,
        editFinances: true,
        viewEvents: true,
        editEvents: false,
        viewMembers: true,
        editMembers: false,
        viewAnalytics: true,
        managePermissions: false
      }
    },
    {
      id: '3',
      name: 'Jamie Park',
      email: 'jamie.p@filmclub.edu',
      role: 'Event Coordinator',
      permissions: {
        viewFinances: false,
        editFinances: false,
        viewEvents: true,
        editEvents: true,
        viewMembers: true,
        editMembers: false,
        viewAnalytics: false,
        managePermissions: false
      }
    },
    {
      id: '4',
      name: 'Sarah Chen',
      email: 'sarah.c@filmclub.edu',
      role: 'Member',
      permissions: {
        viewFinances: false,
        editFinances: false,
        viewEvents: true,
        editEvents: false,
        viewMembers: true,
        editMembers: false,
        viewAnalytics: false,
        managePermissions: false
      }
    },
    {
      id: '5',
      name: 'Mike Johnson',
      email: 'mike.j@filmclub.edu',
      role: 'Officer',
      permissions: {
        viewFinances: true,
        editFinances: false,
        viewEvents: true,
        editEvents: true,
        viewMembers: true,
        editMembers: true,
        viewAnalytics: true,
        managePermissions: false
      }
    }
  ])

  const togglePermission = (memberId: string, permissionKey: string) => {
    setMembers(members.map(member => {
      if (member.id === memberId) {
        return {
          ...member,
          permissions: {
            ...member.permissions,
            [permissionKey]: !member.permissions[permissionKey as keyof typeof member.permissions]
          }
        }
      }
      return member
    }))
    setShowSaveAlert(true)
    setTimeout(() => setShowSaveAlert(false), 3000)
  }

  const updateMemberRole = (memberId: string, newRole: string) => {
    setMembers(members.map(member => {
      if (member.id === memberId) {
        // Auto-assign permissions based on role
        let newPermissions = { ...member.permissions }
        
        if (newRole === 'Admin') {
          newPermissions = {
            viewFinances: true,
            editFinances: true,
            viewEvents: true,
            editEvents: true,
            viewMembers: true,
            editMembers: true,
            viewAnalytics: true,
            managePermissions: true
          }
        } else if (newRole === 'Officer') {
          newPermissions = {
            viewFinances: true,
            editFinances: false,
            viewEvents: true,
            editEvents: true,
            viewMembers: true,
            editMembers: true,
            viewAnalytics: true,
            managePermissions: false
          }
        } else if (newRole === 'Treasurer') {
          newPermissions = {
            viewFinances: true,
            editFinances: true,
            viewEvents: true,
            editEvents: false,
            viewMembers: true,
            editMembers: false,
            viewAnalytics: true,
            managePermissions: false
          }
        } else if (newRole === 'Event Coordinator') {
          newPermissions = {
            viewFinances: false,
            editFinances: false,
            viewEvents: true,
            editEvents: true,
            viewMembers: true,
            editMembers: false,
            viewAnalytics: false,
            managePermissions: false
          }
        } else {
          // Member
          newPermissions = {
            viewFinances: false,
            editFinances: false,
            viewEvents: true,
            editEvents: false,
            viewMembers: true,
            editMembers: false,
            viewAnalytics: false,
            managePermissions: false
          }
        }
        
        return { ...member, role: newRole, permissions: newPermissions }
      }
      return member
    }))
    setShowSaveAlert(true)
    setTimeout(() => setShowSaveAlert(false), 3000)
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-[#122B5B] text-white'
      case 'Treasurer':
        return 'bg-[#c39a4e] text-white'
      case 'Officer':
        return 'bg-[#B8DFFF] text-black'
      case 'Event Coordinator':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === 'all' || member.role === filterRole
    return matchesSearch && matchesRole
  })

  const getActivePermissionsCount = (permissions: MemberPermissions['permissions']) => {
    return Object.values(permissions).filter(Boolean).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Access Control</h1>
          <p className="text-muted-foreground mt-1">
            Manage member permissions and access levels
          </p>
        </div>
        <Shield className="h-10 w-10 text-[#122B5B]" />
      </div>

      {/* Save Alert */}
      {showSaveAlert && (
        <Alert className="bg-green-50 border-green-200">
          <Save className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Permissions updated successfully
          </AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Officer">Officer</SelectItem>
                <SelectItem value="Treasurer">Treasurer</SelectItem>
                <SelectItem value="Event Coordinator">Event Coordinator</SelectItem>
                <SelectItem value="Member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Permissions Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Permission Types</CardTitle>
          <CardDescription>
            Available permissions that can be assigned to members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {permissions.map(permission => {
              const Icon = permission.icon
              return (
                <div key={permission.id} className="flex items-start gap-3 p-3 rounded-lg border bg-gray-50">
                  <div className="p-2 rounded-lg bg-white">
                    <Icon className="h-4 w-4 text-[#122B5B]" />
                  </div>
                  <div>
                    <p className="text-sm">{permission.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {permission.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Member Permissions</CardTitle>
          <CardDescription>
            {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Active Permissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map(member => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-[#B8DFFF]">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(member.role)}>
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-[#122B5B] h-2 rounded-full transition-all"
                          style={{ width: `${(getActivePermissionsCount(member.permissions) / 8) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {getActivePermissionsCount(member.permissions)}/8
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Manage Permissions - {member.name}</DialogTitle>
                          <DialogDescription>
                            Control what {member.name} can access and modify
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6 py-4">
                          {/* Role Selection */}
                          <div className="space-y-2">
                            <label className="text-sm">Role</label>
                            <Select 
                              value={member.role} 
                              onValueChange={(value) => updateMemberRole(member.id, value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Officer">Officer</SelectItem>
                                <SelectItem value="Treasurer">Treasurer</SelectItem>
                                <SelectItem value="Event Coordinator">Event Coordinator</SelectItem>
                                <SelectItem value="Member">Member</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">
                              Changing the role will automatically update permissions
                            </p>
                          </div>

                          {/* Financial Permissions */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-[#122B5B]" />
                              <h3 className="text-sm">Financial Access</h3>
                            </div>
                            <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm">View Finances</p>
                                  <p className="text-xs text-muted-foreground">
                                    Can view transactions, budgets, and balance
                                  </p>
                                </div>
                                <Switch
                                  checked={member.permissions.viewFinances}
                                  onCheckedChange={() => togglePermission(member.id, 'viewFinances')}
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm">Edit Finances</p>
                                  <p className="text-xs text-muted-foreground">
                                    Can create transactions and manage budgets
                                  </p>
                                </div>
                                <Switch
                                  checked={member.permissions.editFinances}
                                  onCheckedChange={() => togglePermission(member.id, 'editFinances')}
                                  disabled={!member.permissions.viewFinances}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Events Permissions */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-[#122B5B]" />
                              <h3 className="text-sm">Events Management</h3>
                            </div>
                            <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm">View Events</p>
                                  <p className="text-xs text-muted-foreground">
                                    Can view all events including drafts
                                  </p>
                                </div>
                                <Switch
                                  checked={member.permissions.viewEvents}
                                  onCheckedChange={() => togglePermission(member.id, 'viewEvents')}
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm">Edit Events</p>
                                  <p className="text-xs text-muted-foreground">
                                    Can create, edit, and publish events
                                  </p>
                                </div>
                                <Switch
                                  checked={member.permissions.editEvents}
                                  onCheckedChange={() => togglePermission(member.id, 'editEvents')}
                                  disabled={!member.permissions.viewEvents}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Member Management Permissions */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-[#122B5B]" />
                              <h3 className="text-sm">Member Management</h3>
                            </div>
                            <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm">View Members</p>
                                  <p className="text-xs text-muted-foreground">
                                    Can view member directory and profiles
                                  </p>
                                </div>
                                <Switch
                                  checked={member.permissions.viewMembers}
                                  onCheckedChange={() => togglePermission(member.id, 'viewMembers')}
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm">Manage Members</p>
                                  <p className="text-xs text-muted-foreground">
                                    Can add, edit, and remove members
                                  </p>
                                </div>
                                <Switch
                                  checked={member.permissions.editMembers}
                                  onCheckedChange={() => togglePermission(member.id, 'editMembers')}
                                  disabled={!member.permissions.viewMembers}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Analytics Permissions */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <BarChart3 className="h-4 w-4 text-[#122B5B]" />
                              <h3 className="text-sm">Analytics & Reports</h3>
                            </div>
                            <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm">Access Analytics</p>
                                  <p className="text-xs text-muted-foreground">
                                    Can view reports and analytics dashboards
                                  </p>
                                </div>
                                <Switch
                                  checked={member.permissions.viewAnalytics}
                                  onCheckedChange={() => togglePermission(member.id, 'viewAnalytics')}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Admin Permissions */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-[#122B5B]" />
                              <h3 className="text-sm">Administrative</h3>
                            </div>
                            <div className="space-y-3 pl-6 border-l-2 border-gray-200">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm">Manage Permissions</p>
                                  <p className="text-xs text-muted-foreground">
                                    Can modify permissions for other users (Admin only)
                                  </p>
                                </div>
                                <Switch
                                  checked={member.permissions.managePermissions}
                                  onCheckedChange={() => togglePermission(member.id, 'managePermissions')}
                                />
                              </div>
                            </div>
                          </div>

                          {member.role !== 'Admin' && member.permissions.managePermissions && (
                            <Alert>
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>
                                Only Admins should have permission management access. Consider changing this member's role to Admin or removing this permission.
                              </AlertDescription>
                            </Alert>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
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
