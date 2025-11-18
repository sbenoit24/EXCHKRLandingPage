import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Toaster } from './ui/sonner'
import { toast } from 'sonner'
import { DollarSign, Calendar, MessageCircle, Image, CheckCircle, Receipt, Bell, FolderOpen, Shield, Users, Menu, X, Download } from 'lucide-react'
import { supabase, fetchAllWaitlistEntries } from '../lib/supabaseClient'
import { generateWaitlistExcel, type WaitlistEntry } from '../lib/waitlistExcel'
import logo from '../assets/5244fc61f9eba54056e7f8844e763b6489610b49.png'

interface WaitlistData {
  name: string
  email: string
  clubName: string
  university: string
  role: string
  orgType: string
}

interface LandingPageProps {
  onEnter: () => void
  onJoinWaitlist?: (data: WaitlistData) => void
}

export function LandingPage({ onEnter, onJoinWaitlist }: LandingPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    clubName: '',
    university: '',
    role: '',
    orgType: ''
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const persistWaitlistEntry = async (data: WaitlistData) => {
    const payload = {
      name: data.name,
      email: data.email,
      club_name: data.clubName,
      university: data.university,
      role: data.role,
      org_type: data.orgType,
    }

    const { error } = await supabase.from('waitlist_entries').insert([payload])
    if (error) {
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.clubName || !formData.university || !formData.role || !formData.orgType) {
      toast.error('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    try {
      // Save to database
      await persistWaitlistEntry(formData)
      toast.success('You have been added to the waitlist!')
      setFormData({
        name: '',
        email: '',
        clubName: '',
        university: '',
        role: '',
        orgType: '',
      })
      if (onJoinWaitlist) {
        onJoinWaitlist(formData)
      }
    } catch (error) {
      console.error('Error saving waitlist entry:', error)
      toast.error('Unable to save your waitlist entry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDownloadWaitlist = async () => {
    setIsExporting(true)
    try {
      // Fetch ALL entries using pagination to ensure we get every single one
      const data = await fetchAllWaitlistEntries()

      if (!data || data.length === 0) {
        toast.info('No waitlist entries yet.')
        return
      }

      // Normalize all entries for Excel
      const normalizedData: WaitlistEntry[] = data.map((entry) => ({
        name: entry.name ?? '',
        email: entry.email ?? '',
        clubName: entry.club_name ?? '',
        university: entry.university ?? '',
        role: entry.role ?? '',
        orgType: entry.org_type ?? '',
        created_at: entry.created_at,
      }))

      // Generate Excel with ALL entries - every single one will be included
      generateWaitlistExcel(normalizedData)
      toast.success(`Excel downloaded with ALL ${normalizedData.length} waitlist entries!`)
    } catch (error) {
      console.error('Error generating waitlist Excel:', error)
      toast.error('Unable to download the waitlist. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img src={logo} alt="EXCHKR" className="h-8 w-8 object-contain" />
              <span className="text-xl font-bold text-[#122B5B]">EXCHKR</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Join Waitlist
              </Button>
              <Button 
                onClick={onEnter}
                className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
              >
                Sign In
              </Button>
            </div>
            <button 
              className="sm:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="sm:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col gap-3">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
                    setIsMenuOpen(false)
                  }}
                  className="w-full justify-start"
                >
                  Join Waitlist
                </Button>
                <Button 
                  onClick={() => {
                    onEnter()
                    setIsMenuOpen(false)
                  }}
                  className="w-full bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                >
                  Sign In
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#122B5B] text-white">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
                <img src={logo} alt="EXCHKR" className="h-12 w-12 object-contain" />
                <span className="text-3xl">EXCHKR</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6">
                The platform that keeps your organization in sync.
              </h1>
              <p className="text-xl sm:text-2xl text-[#B8DFFF] mb-10 max-w-2xl mx-auto lg:mx-0">
                EXCHKR helps any club, team, or community manage finances, members, events, and communication in one place.
              </p>
              <Button 
                size="lg" 
                onClick={scrollToWaitlist}
                className="bg-[#c39a4e] hover:bg-[#c39a4e]/90 text-white h-16 px-10 text-lg"
              >
                Join the Waitlist
              </Button>
            </div>

            {/* Abstract Network Illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full h-96 flex items-center justify-center">
                {/* Just the logo */}
                <img src={logo} alt="EXCHKR" className="h-80 w-80 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Promise Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl sm:text-2xl text-gray-700">
            EXCHKR empowers any type of club, team, or organization manage finances, members, and events in one place.
          </p>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <Card className="border-2 border-[#122B5B]/10 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#122B5B] rounded-2xl flex items-center justify-center mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-4">Stay Connected</h3>
                <p className="text-gray-600 text-lg">
                  Built-in chat keeps officers and members aligned — from quick reminders to budget approvals — without leaving the platform.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 border-[#122B5B]/10 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#122B5B] rounded-2xl flex items-center justify-center mb-6">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-4">Plan and Sync Events</h3>
                <p className="text-gray-600 text-lg">
                  Smart calendar automatically links payments, attendance, and reminders so events run smoothly from start to finish.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 border-[#122B5B]/10 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#122B5B] rounded-2xl flex items-center justify-center mb-6">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-4">Control Your Finances</h3>
                <p className="text-gray-600 text-lg">
                  Collect dues, track expenses, and approve reimbursements with clarity and accountability.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-2 border-[#122B5B]/10 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#122B5B] rounded-2xl flex items-center justify-center mb-6">
                  <Image className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-4">Share Your Story</h3>
                <p className="text-gray-600 text-lg">
                  Upload and organize photos from meetings, events, and fundraisers so your organization's memories live in one place.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <p className="text-2xl text-gray-700">
              Finance, communication, and culture — finally connected.
            </p>
          </div>
        </div>
      </section>

      {/* For Every Type of Organization */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl text-center mb-12">For Every Type of Organization</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#B8DFFF]/20 hover:bg-[#B8DFFF]/30 transition-colors">
              <div className="w-12 h-12 bg-[#122B5B] rounded-full flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm">Greek Chapters</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#B8DFFF]/20 hover:bg-[#B8DFFF]/30 transition-colors">
              <div className="w-12 h-12 bg-[#122B5B] rounded-full flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm">Sports Teams</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#B8DFFF]/20 hover:bg-[#B8DFFF]/30 transition-colors">
              <div className="w-12 h-12 bg-[#122B5B] rounded-full flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm">Student Organizations</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#B8DFFF]/20 hover:bg-[#B8DFFF]/30 transition-colors">
              <div className="w-12 h-12 bg-[#122B5B] rounded-full flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm">Student Governments</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#B8DFFF]/20 hover:bg-[#B8DFFF]/30 transition-colors">
              <div className="w-12 h-12 bg-[#122B5B] rounded-full flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm">National Organizations</p>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-8 text-lg">
            EXCHKR adapts to any group, from 10 members to 10,000.
          </p>
        </div>
      </section>

      {/* Built for Real People */}
      <section className="py-20 bg-[#122B5B] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl text-center mb-8">Built for Real People</h2>
          <p className="text-xl text-[#B8DFFF] text-center leading-relaxed">
            EXCHKR was created by students who've lived the chaos of managing clubs, chapters, and teams. We built it to bring structure and simplicity to every organization — a place where your members stay informed, your finances stay clear, and your story stays together.
          </p>
        </div>
      </section>

      {/* Expanded Features Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#c39a4e] rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="mb-2">Approvals and Permissions</h4>
                <p className="text-sm text-gray-600">
                  Decide who can view finances, edit events, or approve reimbursements.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#c39a4e] rounded-lg flex items-center justify-center flex-shrink-0">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="mb-2">Instant Reimbursements</h4>
                <p className="text-sm text-gray-600">
                  Submit receipts and get approvals in minutes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#c39a4e] rounded-lg flex items-center justify-center flex-shrink-0">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="mb-2">Smart Notifications</h4>
                <p className="text-sm text-gray-600">
                  Keep everyone updated automatically.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#c39a4e] rounded-lg flex items-center justify-center flex-shrink-0">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="mb-2">Shared Files</h4>
                <p className="text-sm text-gray-600">
                  Store documents, photos, and forms securely.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-gray-700">
              Everything your organization needs — together, transparent, and trusted.
            </p>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-24 bg-gray-50">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-10 sm:p-14">
              <div className="text-center mb-8">
                <h2 className="text-4xl mb-3">Be the first to bring structure to your organization.</h2>
                <p className="text-gray-600">
                  Join our waitlist for early access to EXCHKR.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="clubName">Club Name</Label>
                  <Input
                    id="clubName"
                    value={formData.clubName}
                    onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                    placeholder="Your club or organization name"
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="university">University</Label>
                  <Input
                    id="university"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    placeholder="Your university"
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="role">Your Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., President, Treasurer"
                    className="mt-2 h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="orgType">Organization Type</Label>
                  <Select value={formData.orgType} onValueChange={(value) => setFormData({ ...formData, orgType: value })}>
                    <SelectTrigger className="mt-2 h-12">
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student-org">Student Organization</SelectItem>
                      <SelectItem value="greek">Greek Chapter</SelectItem>
                      <SelectItem value="sports">Sports Team</SelectItem>
                      <SelectItem value="student-gov">Student Government</SelectItem>
                      <SelectItem value="national">National Organization</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit"
                  className="w-full h-14 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Join the Waitlist'}
                </Button>

                <p className="text-xs text-gray-500 text-center pt-2">
                  We'll only contact you with launch updates.
                </p>
              </form>

              {/* Download All Entries Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDownloadWaitlist}
                  disabled={isExporting}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isExporting ? 'Preparing Excel...' : 'Download All Waitlist Entries (Excel)'}
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Download the complete waitlist with all submissions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#122B5B] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-3">
              <img src={logo} alt="EXCHKR" className="h-8 w-8 object-contain" />
              <span className="text-xl">EXCHKR</span>
            </div>

            <p className="text-sm text-[#B8DFFF]">Powering organized communities.</p>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-[#B8DFFF]">
              <a href="mailto:team@exchkr.com" className="hover:text-white transition-colors">
                team@exchkr.com
              </a>
              <span className="hidden sm:inline">•</span>
              <p>© 2025 EXCHKR</p>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  )
}