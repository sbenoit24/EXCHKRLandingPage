import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Progress } from '../ui/progress'
import {
  Building2,
  Users,
  DollarSign,
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle,
  Mail,
  Phone,
  Edit,
  Download,
  Upload,
  MessageSquare,
  Image
} from 'lucide-react'
import { EventPhotosModal } from '../EventPhotosModal'

interface AdminClubProfileProps {
  club: any
}

export function AdminClubProfile({ club }: AdminClubProfileProps) {
  const [activeTab, setActiveTab] = useState('summary')
  const [showPhotosModal, setShowPhotosModal] = useState(false)
  const [selectedEventForPhotos, setSelectedEventForPhotos] = useState<any>(null)

  const officers = [
    { id: 1, name: 'John Smith', role: 'President', email: 'john@email.com', phone: '(555) 123-4567', trained: true },
    { id: 2, name: 'Sarah Johnson', role: 'Vice President', email: 'sarah@email.com', phone: '(555) 234-5678', trained: true },
    { id: 3, name: 'Mike Chen', role: 'Treasurer', email: 'mike@email.com', phone: '(555) 345-6789', trained: true },
    { id: 4, name: 'Emily Davis', role: 'Secretary', email: 'emily@email.com', phone: '(555) 456-7890', trained: false }
  ]

  const members = [
    { id: 1, name: 'Alex Thompson', year: 'Junior', major: 'Computer Science', duesStatus: 'Paid', joinDate: '2023-09-01' },
    { id: 2, name: 'Maria Garcia', year: 'Sophomore', major: 'Engineering', duesStatus: 'Paid', joinDate: '2023-09-05' },
    { id: 3, name: 'James Wilson', year: 'Senior', major: 'Mathematics', duesStatus: 'Partial', joinDate: '2023-09-10' },
    { id: 4, name: 'Lisa Anderson', year: 'Freshman', major: 'Physics', duesStatus: 'Unpaid', joinDate: '2023-09-15' }
  ]

  const transactions = [
    { id: 1, date: '2024-11-05', description: 'Event Supplies', amount: -450, type: 'Expense', status: 'Completed' },
    { id: 2, date: '2024-11-01', description: 'Membership Dues', amount: 750, type: 'Income', status: 'Completed' },
    { id: 3, date: '2024-10-28', description: 'Workshop Materials', amount: -320, type: 'Expense', status: 'Completed' },
    { id: 4, date: '2024-10-25', description: 'Reimbursement Request', amount: -125, type: 'Pending', status: 'Pending' }
  ]

  const events = [
    { id: 1, name: 'Fall Workshop', date: '2024-11-15', attendees: 45, budget: 500, status: 'Upcoming', photoCount: 0 },
    { id: 2, name: 'Networking Night', date: '2024-11-01', attendees: 78, budget: 350, status: 'Completed', photoCount: 6 },
    { id: 3, name: 'Annual Conference', date: '2024-10-20', attendees: 120, budget: 1200, status: 'Completed', photoCount: 15 }
  ]

  const complianceItems = [
    { id: 1, item: 'Officer Training', status: 'complete', dueDate: '2024-09-15', completedDate: '2024-09-10' },
    { id: 2, item: 'Annual Report', status: 'complete', dueDate: '2024-10-01', completedDate: '2024-09-28' },
    { id: 3, item: 'Insurance Documentation', status: 'pending', dueDate: '2024-11-30', completedDate: null },
    { id: 4, item: 'Budget Approval', status: 'complete', dueDate: '2024-09-01', completedDate: '2024-08-25' }
  ]

  return (
    <div className="space-y-6">
      {/* Club Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-[#122B5B] to-[#122B5B]/90 text-white">
        <CardContent className="p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-lg bg-white/10 backdrop-blur">
                <Building2 className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl mb-2">{club.name}</h1>
                <div className="flex items-center gap-3 text-sm text-blue-100">
                  <span>{club.campus}</span>
                  <span>•</span>
                  <span>{club.category}</span>
                  <span>•</span>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {club.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{club.members} members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>${club.balance.toLocaleString()} balance</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="secondary">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="officers">Officers</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Activity Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
                    {club.activityLevel.toUpperCase()}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    Last event: {new Date(club.lastEvent).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Financial Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl text-[#c39a4e]">${club.balance.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    Last transaction: {new Date(club.lastTransaction).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">75% Complete</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-muted-foreground mb-1">Total Officers</p>
                  <p className="text-2xl">{club.officers}</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-muted-foreground mb-1">Active Members</p>
                  <p className="text-2xl">{club.members}</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-muted-foreground mb-1">Events This Year</p>
                  <p className="text-2xl">{events.length}</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-muted-foreground mb-1">Total Transactions</p>
                  <p className="text-2xl">{transactions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Officers Tab */}
        <TabsContent value="officers" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Officer Roster</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Email All
                  </Button>
                  <Button size="sm" className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white">
                    Add Officer
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Training</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {officers.map((officer) => (
                    <TableRow key={officer.id}>
                      <TableCell className="font-medium">{officer.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{officer.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
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
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Member List</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Major</TableHead>
                    <TableHead>Dues Status</TableHead>
                    <TableHead>Join Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.year}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{member.major}</TableCell>
                      <TableCell>
                        <Badge className={
                          member.duesStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                          member.duesStatus === 'Partial' ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {member.duesStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(member.joinDate).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Finance Tab */}
        <TabsContent value="finance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
                <p className="text-3xl text-[#c39a4e]">${club.balance.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="shadow">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Total Income</p>
                <p className="text-3xl text-green-600">$3,450</p>
              </CardContent>
            </Card>
            <Card className="shadow">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
                <p className="text-3xl text-red-600">$2,195</p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(txn.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{txn.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{txn.type}</Badge>
                      </TableCell>
                      <TableCell className={`font-medium ${txn.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {txn.amount > 0 ? '+' : ''}${Math.abs(txn.amount).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          txn.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }>
                          {txn.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Event History</CardTitle>
                <Button size="sm" className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white">
                  View Calendar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="p-4 rounded-lg border hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{event.name}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.attendees} attendees
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            ${event.budget} budget
                          </span>
                          {event.photoCount > 0 && (
                            <span className="flex items-center gap-1 text-[#122B5B]">
                              <Image className="h-4 w-4" />
                              {event.photoCount} photos
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={
                          event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }>
                          {event.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedEventForPhotos(event)
                            setShowPhotosModal(true)
                          }}
                          className={event.photoCount > 0 ? 'border-[#122B5B] text-[#122B5B]' : ''}
                        >
                          <Image className="h-4 w-4 mr-1" />
                          {event.photoCount > 0 ? 'View' : 'Add'} Photos
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Club Documents</CardTitle>
                <Button size="sm" className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No documents uploaded yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Compliance Checklist</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    75% complete - 1 item pending
                  </p>
                </div>
                <Progress value={75} className="w-32 h-2" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {complianceItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      {item.status === 'complete' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-amber-600" />
                      )}
                      <div>
                        <p className="font-medium">{item.item}</p>
                        <p className="text-xs text-muted-foreground">
                          Due: {new Date(item.dueDate).toLocaleDateString()}
                          {item.completedDate && ` • Completed: ${new Date(item.completedDate).toLocaleDateString()}`}
                        </p>
                      </div>
                    </div>
                    <Badge className={
                      item.status === 'complete' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }>
                      {item.status === 'complete' ? 'Complete' : 'Pending'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Event Photos Modal */}
      {selectedEventForPhotos && (
        <EventPhotosModal
          isOpen={showPhotosModal}
          onClose={() => {
            setShowPhotosModal(false)
            setSelectedEventForPhotos(null)
          }}
          eventName={selectedEventForPhotos.name}
          eventDate={selectedEventForPhotos.date}
          canUpload={true}
        />
      )}
    </div>
  )
}
