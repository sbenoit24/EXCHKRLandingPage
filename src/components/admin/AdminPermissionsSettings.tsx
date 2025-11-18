import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Switch } from '../ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Shield, Users, Eye, Edit, DollarSign, Calendar, CheckCircle, XCircle } from 'lucide-react'

export function AdminPermissionsSettings() {
  const [activeTab, setActiveTab] = useState('roles')

  const roles = [
    {
      id: 'national-admin',
      name: 'National Admin',
      description: 'Full access to all universities and clubs',
      userCount: 3,
      scope: 'All Organizations',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'university-admin',
      name: 'University Admin',
      description: 'Manage all clubs within their university',
      userCount: 12,
      scope: 'University-wide',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'student-gov-admin',
      name: 'Student Government Admin',
      description: 'Oversee recognized student organizations',
      userCount: 8,
      scope: 'Campus-specific',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'read-only-auditor',
      name: 'Read-Only Auditor',
      description: 'View-only access for compliance and auditing',
      userCount: 5,
      scope: 'View-only',
      color: 'bg-gray-100 text-gray-800'
    }
  ]

  const permissions = [
    {
      category: 'Clubs Management',
      features: [
        { id: 'view-clubs', name: 'View Clubs', description: 'See club profiles and information' },
        { id: 'edit-clubs', name: 'Edit Clubs', description: 'Modify club details and settings' },
        { id: 'approve-clubs', name: 'Approve Recognition', description: 'Approve or reject club recognition' },
        { id: 'deactivate-clubs', name: 'Deactivate Clubs', description: 'Suspend or deactivate clubs' }
      ]
    },
    {
      category: 'Financial Management',
      features: [
        { id: 'view-finances', name: 'View Finances', description: 'Access financial data and reports' },
        { id: 'approve-reimbursements', name: 'Approve Reimbursements', description: 'Review and approve reimbursement requests' },
        { id: 'manage-budgets', name: 'Manage Budgets', description: 'Set and modify club budgets' },
        { id: 'export-financial-reports', name: 'Export Financial Reports', description: 'Download financial data' }
      ]
    },
    {
      category: 'Member Management',
      features: [
        { id: 'view-members', name: 'View Members', description: 'See member lists and profiles' },
        { id: 'edit-members', name: 'Edit Members', description: 'Modify member information' },
        { id: 'manage-dues', name: 'Manage Dues', description: 'Track and update dues payments' },
        { id: 'export-member-data', name: 'Export Member Data', description: 'Download member lists' }
      ]
    },
    {
      category: 'Events Management',
      features: [
        { id: 'view-events', name: 'View Events', description: 'See all events and calendars' },
        { id: 'approve-events', name: 'Approve Events', description: 'Review and approve event requests' },
        { id: 'manage-event-budgets', name: 'Manage Event Budgets', description: 'Set event spending limits' }
      ]
    },
    {
      category: 'Compliance & Reports',
      features: [
        { id: 'view-compliance', name: 'View Compliance', description: 'See compliance status' },
        { id: 'manage-compliance', name: 'Manage Compliance', description: 'Update compliance requirements' },
        { id: 'generate-reports', name: 'Generate Reports', description: 'Create and export reports' },
        { id: 'schedule-reports', name: 'Schedule Reports', description: 'Set up automated reports' }
      ]
    }
  ]

  // Default permissions for each role
  const defaultPermissions = {
    'national-admin': ['view-clubs', 'edit-clubs', 'approve-clubs', 'deactivate-clubs', 'view-finances', 'approve-reimbursements', 'manage-budgets', 'export-financial-reports', 'view-members', 'edit-members', 'manage-dues', 'export-member-data', 'view-events', 'approve-events', 'manage-event-budgets', 'view-compliance', 'manage-compliance', 'generate-reports', 'schedule-reports'],
    'university-admin': ['view-clubs', 'edit-clubs', 'approve-clubs', 'view-finances', 'approve-reimbursements', 'manage-budgets', 'view-members', 'edit-members', 'manage-dues', 'view-events', 'approve-events', 'view-compliance', 'generate-reports'],
    'student-gov-admin': ['view-clubs', 'view-finances', 'view-members', 'view-events', 'approve-events', 'view-compliance', 'generate-reports'],
    'read-only-auditor': ['view-clubs', 'view-finances', 'view-members', 'view-events', 'view-compliance']
  }

  const [selectedRole, setSelectedRole] = useState('national-admin')
  const [rolePermissions, setRolePermissions] = useState(defaultPermissions)

  const hasPermission = (roleId: string, permissionId: string) => {
    return rolePermissions[roleId]?.includes(permissionId) || false
  }

  const togglePermission = (roleId: string, permissionId: string) => {
    setRolePermissions(prev => {
      const current = prev[roleId] || []
      const updated = current.includes(permissionId)
        ? current.filter(p => p !== permissionId)
        : [...current, permissionId]
      return { ...prev, [roleId]: updated }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Permissions & Settings</h1>
        <p className="text-muted-foreground">
          Configure role-based access control and system settings
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="roles">Roles & Scopes</TabsTrigger>
          <TabsTrigger value="permissions">Permission Matrix</TabsTrigger>
        </TabsList>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Admin Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map((role) => (
                  <div key={role.id} className="p-6 rounded-lg border hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Shield className="h-5 w-5 text-[#122B5B]" />
                          <h3 className="text-lg font-medium">{role.name}</h3>
                          <Badge className={role.color}>
                            {role.scope}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {role.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {role.userCount} {role.userCount === 1 ? 'user' : 'users'}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedRole(role.id)
                              setActiveTab('permissions')
                            }}
                          >
                            Configure Permissions
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Role
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Scope Definitions */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Scope Definitions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-purple-600"></span>
                    All Organizations (National)
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Complete access to view and manage all universities, clubs, members, and finances across the entire network.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                    University-wide
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Access limited to clubs, members, and data within a specific university campus.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-600"></span>
                    Campus-specific
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Access to recognized student organizations within a student government's jurisdiction.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gray-600"></span>
                    View-only
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Read-only access for auditing and compliance review purposes. No editing or approval capabilities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions Matrix Tab */}
        <TabsContent value="permissions" className="space-y-6">
          {/* Role Selector */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Configure permissions for:</span>
                <div className="flex gap-2">
                  {roles.map((role) => (
                    <Button
                      key={role.id}
                      variant={selectedRole === role.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedRole(role.id)}
                      className={selectedRole === role.id ? 'bg-[#122B5B] hover:bg-[#122B5B]/90 text-white' : ''}
                    >
                      {role.name}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permissions Matrix */}
          {permissions.map((category) => (
            <Card key={category.category} className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.features.map((feature) => {
                    const enabled = hasPermission(selectedRole, feature.id)
                    return (
                      <div 
                        key={feature.id}
                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            {enabled ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-gray-400" />
                            )}
                            <h4 className="font-medium">{feature.name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground ml-8">
                            {feature.description}
                          </p>
                        </div>
                        <Switch
                          checked={enabled}
                          onCheckedChange={() => togglePermission(selectedRole, feature.id)}
                        />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Save Changes */}
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white">
              Save Changes
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
