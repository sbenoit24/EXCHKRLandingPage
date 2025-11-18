import { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { 
  Search,
  Mail,
  Linkedin,
  GraduationCap,
  Briefcase,
  MapPin,
  Phone,
  Filter
} from 'lucide-react'

interface Member {
  id: number
  name: string
  email: string
  phone?: string
  major: string
  year: string
  role: string
  linkedin?: string
  location?: string
  status: 'active' | 'alumni'
  gradYear?: string
  occupation?: string
  company?: string
}

export function MemberDirectory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'alumni'>('all')

  const members: Member[] = [
    { 
      id: 1, 
      name: 'Luca', 
      email: 'luca@email.com',
      phone: '(315) 555-0100',
      major: 'Film & Media Studies', 
      year: 'Senior',
      role: 'Treasurer',
      linkedin: 'linkedin.com/in/luca',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Alex Rodriguez', 
      email: 'alex@email.com',
      major: 'Television, Radio & Film', 
      year: 'Junior',
      role: 'Member',
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Jamie Park', 
      email: 'jamie@email.com',
      major: 'Film Production', 
      year: 'Sophomore',
      role: 'Member',
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Emily Davis', 
      email: 'emily@email.com',
      phone: '(315) 555-0103',
      major: 'Communications', 
      year: 'Junior',
      role: 'Vice President',
      linkedin: 'linkedin.com/in/emilydavis',
      status: 'active'
    },
    { 
      id: 5, 
      name: 'Michael Chen', 
      email: 'michael@email.com',
      major: 'Film Production',
      role: 'Alumni',
      status: 'alumni',
      gradYear: '2022',
      occupation: 'Production Assistant',
      company: 'HBO',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/michaelchen'
    },
    { 
      id: 6, 
      name: 'Sarah Johnson', 
      email: 'sarah@email.com',
      major: 'Documentary Film',
      role: 'Alumni',
      status: 'alumni',
      gradYear: '2021',
      occupation: 'Documentary Filmmaker',
      company: 'Freelance',
      location: 'Los Angeles, CA',
      linkedin: 'linkedin.com/in/sarahjohnson'
    },
    { 
      id: 7, 
      name: 'David Lee', 
      email: 'david@email.com',
      major: 'Cinematography', 
      year: 'Senior',
      role: 'President',
      phone: '(315) 555-0106',
      linkedin: 'linkedin.com/in/davidlee',
      status: 'active'
    },
    { 
      id: 8, 
      name: 'Lisa Martinez', 
      email: 'lisa@email.com',
      major: 'Film Studies',
      role: 'Alumni',
      status: 'alumni',
      gradYear: '2020',
      occupation: 'Film Critic',
      company: 'The Village Voice',
      location: 'New York, NY',
      linkedin: 'linkedin.com/in/lisamartinez'
    }
  ]

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.major.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.company?.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilter = 
      activeFilter === 'all' || 
      member.status === activeFilter

    return matchesSearch && matchesFilter
  })

  const activeMembers = filteredMembers.filter(m => m.status === 'active')
  const alumni = filteredMembers.filter(m => m.status === 'alumni')

  const MemberCard = ({ member }: { member: Member }) => (
    <Card className="border-0 shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className={member.status === 'active' ? 'bg-[#122B5B] text-white' : 'bg-[#c39a4e] text-white'}>
              {member.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{member.name}</h4>
            <p className="text-xs text-muted-foreground truncate">{member.major}</p>
            {member.status === 'active' ? (
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {member.year}
                </Badge>
                {member.role !== 'Member' && (
                  <Badge className="bg-[#122B5B] text-white text-xs">
                    {member.role}
                  </Badge>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-[#c39a4e] text-white text-xs">
                  Alumni '{member.gradYear?.slice(-2)}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {member.status === 'alumni' && member.occupation && (
          <div className="mb-3 pb-3 border-b">
            <div className="flex items-start gap-2 text-sm mb-1">
              <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">{member.occupation}</p>
                {member.company && (
                  <p className="text-xs text-muted-foreground">{member.company}</p>
                )}
              </div>
            </div>
            {member.location && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <MapPin className="h-3 w-3" />
                <span>{member.location}</span>
              </div>
            )}
          </div>
        )}

        <div className="space-y-2 text-xs">
          <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-[#122B5B] hover:underline">
            <Mail className="h-3 w-3" />
            <span className="truncate">{member.email}</span>
          </a>
          {member.phone && (
            <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-[#122B5B] hover:underline">
              <Phone className="h-3 w-3" />
              <span>{member.phone}</span>
            </a>
          )}
          {member.linkedin && (
            <a href={`https://${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#122B5B] hover:underline">
              <Linkedin className="h-3 w-3" />
              <span className="truncate">LinkedIn Profile</span>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 pt-12 pb-4">
          <h1 className="text-2xl mb-4">Directory</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[#122B5B]">{members.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[#122B5B]">{activeMembers.length}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[#c39a4e]">{alumni.length}</p>
              <p className="text-xs text-muted-foreground">Alumni</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeFilter} onValueChange={(v) => setActiveFilter(v as any)} className="px-4">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all" className="text-xs">
            All ({filteredMembers.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="text-xs">
            Active ({activeMembers.length})
          </TabsTrigger>
          <TabsTrigger value="alumni" className="text-xs">
            Alumni ({alumni.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 pb-6">
          {activeMembers.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-muted-foreground mb-3 px-1">ACTIVE MEMBERS</h3>
              {activeMembers.map(member => (
                <div key={member.id} className="mb-3">
                  <MemberCard member={member} />
                </div>
              ))}
            </div>
          )}
          
          {alumni.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-muted-foreground mb-3 px-1">ALUMNI</h3>
              {alumni.map(member => (
                <div key={member.id} className="mb-3">
                  <MemberCard member={member} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-3 pb-6">
          {activeMembers.map(member => (
            <MemberCard key={member.id} member={member} />
          ))}
        </TabsContent>

        <TabsContent value="alumni" className="space-y-3 pb-6">
          {alumni.map(member => (
            <MemberCard key={member.id} member={member} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
