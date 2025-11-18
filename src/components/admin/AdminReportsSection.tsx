import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { FileText, Download, Calendar, TrendingUp, DollarSign, Users, Building2 } from 'lucide-react'

interface AdminReportsSectionProps {
  selectedOrg: string
}

export function AdminReportsSection({ selectedOrg }: AdminReportsSectionProps) {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  const prebuiltReports = [
    {
      id: 'financial-summary',
      name: 'Financial Summary Report',
      description: 'Comprehensive overview of all financial activity',
      icon: DollarSign,
      category: 'Finance',
      frequency: 'Monthly',
      lastGenerated: '2024-11-01'
    },
    {
      id: 'membership-growth',
      name: 'Membership Growth Report',
      description: 'Track member enrollment and retention trends',
      icon: TrendingUp,
      category: 'Members',
      frequency: 'Quarterly',
      lastGenerated: '2024-10-01'
    },
    {
      id: 'club-activity',
      name: 'Club Activity Report',
      description: 'Monitor club engagement and event participation',
      icon: Building2,
      category: 'Clubs',
      frequency: 'Monthly',
      lastGenerated: '2024-11-01'
    },
    {
      id: 'compliance-status',
      name: 'Compliance Status Report',
      description: 'Review training completion and filing status',
      icon: FileText,
      category: 'Compliance',
      frequency: 'Weekly',
      lastGenerated: '2024-11-08'
    },
    {
      id: 'event-attendance',
      name: 'Event Attendance Report',
      description: 'Analyze event attendance and engagement metrics',
      icon: Calendar,
      category: 'Events',
      frequency: 'Monthly',
      lastGenerated: '2024-11-01'
    },
    {
      id: 'officer-roster',
      name: 'Officer Roster Report',
      description: 'Complete list of all officers and their roles',
      icon: Users,
      category: 'Officers',
      frequency: 'Semester',
      lastGenerated: '2024-09-01'
    }
  ]

  const customReportFields = [
    { category: 'Clubs', fields: ['Club Name', 'Status', 'Member Count', 'Balance', 'Last Activity', 'Campus'] },
    { category: 'Members', fields: ['Name', 'Email', 'Dues Status', 'Join Date', 'Year', 'Major'] },
    { category: 'Finance', fields: ['Transaction Date', 'Amount', 'Type', 'Club', 'Description', 'Status'] },
    { category: 'Events', fields: ['Event Name', 'Date', 'Club', 'Attendees', 'Budget', 'Status'] },
    { category: 'Officers', fields: ['Name', 'Role', 'Club', 'Training Status', 'Contact Info'] }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Reports</h1>
          <p className="text-muted-foreground">
            Generate insights and export data across your organization
          </p>
        </div>
        <Button className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white">
          <FileText className="h-4 w-4 mr-2" />
          Custom Report Builder
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Available Reports</p>
            <p className="text-2xl">{prebuiltReports.length}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Generated This Month</p>
            <p className="text-2xl">24</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Scheduled Reports</p>
            <p className="text-2xl">8</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-1">Custom Reports</p>
            <p className="text-2xl">12</p>
          </CardContent>
        </Card>
      </div>

      {/* Prebuilt Reports */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Prebuilt Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prebuiltReports.map((report) => {
              const Icon = report.icon
              return (
                <div 
                  key={report.id}
                  className="p-4 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedReport(report.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-3 rounded-lg bg-[#B8DFFF]">
                      <Icon className="h-5 w-5 text-[#122B5B]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{report.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {report.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {report.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>Frequency: {report.frequency}</span>
                          <span>•</span>
                          <span>Last: {new Date(report.lastGenerated).toLocaleDateString()}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Generate
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Custom Report Builder Preview */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Custom Report Builder</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Create custom reports by selecting data fields and filters
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Data Categories */}
            <div>
              <h3 className="text-sm font-medium mb-3">Select Data Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {customReportFields.map((category) => (
                  <button
                    key={category.category}
                    className="p-4 rounded-lg border hover:bg-[#B8DFFF]/20 hover:border-[#122B5B] transition-all text-center"
                  >
                    <p className="text-sm font-medium">{category.category}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {category.fields.length} fields
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Available Fields */}
            <div>
              <h3 className="text-sm font-medium mb-3">Available Fields</h3>
              <div className="p-6 rounded-lg border-2 border-dashed border-gray-300 text-center">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p className="text-sm text-muted-foreground mb-4">
                  Select a data category to view available fields
                </p>
                <Button variant="outline" size="sm">
                  Start Building Report
                </Button>
              </div>
            </div>

            {/* Export Options */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="text-sm font-medium mb-1">Export Format</h3>
                <p className="text-xs text-muted-foreground">
                  Choose how you want to export your report
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  CSV
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Excel
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Scheduled Reports</CardTitle>
            <Button size="sm" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule New Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">Monthly Financial Summary</p>
                <p className="text-sm text-muted-foreground">Runs on the 1st of each month</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-100 text-green-800">Active</Badge>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">Weekly Compliance Check</p>
                <p className="text-sm text-muted-foreground">Runs every Monday at 9:00 AM</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-100 text-green-800">Active</Badge>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <p className="font-medium">Quarterly Member Growth</p>
                <p className="text-sm text-muted-foreground">Runs every 3 months</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-100 text-green-800">Active</Badge>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
