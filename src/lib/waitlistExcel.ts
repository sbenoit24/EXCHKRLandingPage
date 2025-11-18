import * as XLSX from 'xlsx'

export interface WaitlistEntry {
  name: string
  email: string
  clubName: string
  university: string
  role: string
  orgType: string
  created_at?: string | null
}

export const formatOrgType = (orgType: string) => {
  const orgTypeMap: Record<string, string> = {
    'student-org': 'Student Organization',
    greek: 'Greek Chapter',
    sports: 'Sports Team',
    'student-gov': 'Student Government',
    national: 'National Organization',
    other: 'Other',
  }

  return orgTypeMap[orgType] || orgType
}

/**
 * Generates a single Excel file called "UserWaitlist.xlsx" with ALL waitlist entries.
 * Every entry in the entries array will be included in the Excel file.
 * 
 * @param entries - Array of ALL waitlist entries to include in the Excel file
 */
export const generateSharedWaitlistExcel = (entries: WaitlistEntry[]) => {
  const workbook = XLSX.utils.book_new()
  
  // Header section with metadata
  const headerRows = [
    ['EXCHKR Waitlist'],
    ['Generated At', new Date().toLocaleString()],
    ['Total Registrations', entries.length.toString()],
    [''],
    ['Name', 'Email', 'Club / Organization', 'University', 'Role', 'Organization Type', 'Joined At'],
  ]

  // Convert ALL entries to rows - every entry will be included
  const recordRows = entries.map((entry) => [
    entry.name,
    entry.email,
    entry.clubName,
    entry.university,
    entry.role,
    formatOrgType(entry.orgType),
    entry.created_at ? new Date(entry.created_at).toLocaleString() : '',
  ])

  // Combine headers with ALL entry rows into one worksheet
  const worksheet = XLSX.utils.aoa_to_sheet([...headerRows, ...recordRows])
  worksheet['!cols'] = [
    { wch: 28 },
    { wch: 32 },
    { wch: 32 },
    { wch: 28 },
    { wch: 24 },
    { wch: 28 },
    { wch: 30 },
  ]

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Waitlist')
  
  // Use consistent filename: UserWaitlist.xlsx
  const fileName = 'UserWaitlist.xlsx'
  XLSX.writeFile(workbook, fileName)
  
  return fileName
}

