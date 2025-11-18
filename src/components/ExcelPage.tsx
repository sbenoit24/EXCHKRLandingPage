import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { FileText, Download, Upload, ArrowLeft } from 'lucide-react'

interface ExcelPageProps {
  onBackToLogin: () => void
  waitlistData?: {
    name: string
    email: string
    clubName: string
    university: string
    role: string
    orgType: string
  }
}

export function ExcelPage({ onBackToLogin, waitlistData }: ExcelPageProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const formatOrgType = (orgType: string) => {
    const orgTypeMap: Record<string, string> = {
      'student-org': 'Student Organization',
      'greek': 'Greek Chapter',
      'sports': 'Sports Team',
      'student-gov': 'Student Government',
      'national': 'National Organization',
      'other': 'Other'
    }
    return orgTypeMap[orgType] || orgType
  }

  const handleDownloadTemplate = () => {
    // In production, this would download an Excel template
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      // Simulate download
      alert('Excel template download started!')
    }, 1000)
  }

  const handleUploadFile = () => {
    // In production, this would handle file upload
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      alert('File uploaded successfully!')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[#122B5B]/5"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <Card className="w-full max-w-2xl relative z-10 border-0 shadow-2xl bg-white/95 backdrop-blur-xl">
        <CardHeader className="text-center pb-6 bg-gradient-to-r from-[#122B5B] to-[#1e3a5f]">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <FileText className="w-8 h-8" />
            </div>
            <span className="ml-4 text-3xl text-white font-bold">Excel Integration</span>
          </div>
          <CardTitle className="text-2xl text-white">Manage Your Data</CardTitle>
          <CardDescription className="text-lg text-white/90">
            Import and export your organization data with Excel
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Success Message */}
            {waitlistData && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800 font-medium mb-2">
                  ✓ Welcome to the waitlist, {waitlistData.name}!
                </p>
                <p className="text-xs text-green-600">
                  Organization: {waitlistData.clubName} • {waitlistData.university}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Role: {waitlistData.role} • Type: {formatOrgType(waitlistData.orgType)}
                </p>
                <div className="mt-3 pt-3 border-t border-green-200">
                  <p className="text-xs text-green-700 font-medium">
                    📄 Excel file downloaded!
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Your waitlist registration has been saved to an Excel file. Check your Downloads folder or open it from your browser's download bar.
                  </p>
                </div>
              </div>
            )}

            {/* Download Template Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#122B5B] transition-colors">
              <div className="flex items-center justify-center mb-4">
                <Download className="w-12 h-12 text-[#122B5B]" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Download Excel Template</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Get a pre-formatted Excel template to organize your member data, financial records, and event information.
              </p>
              <Button 
                onClick={handleDownloadTemplate}
                disabled={isProcessing}
                className="w-full bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
              >
                {isProcessing ? 'Processing...' : 'Download Template'}
              </Button>
            </div>

            {/* Upload File Section */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#122B5B] transition-colors">
              <div className="flex items-center justify-center mb-4">
                <Upload className="w-12 h-12 text-[#122B5B]" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Upload Excel File</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Upload your Excel file to import members, expenses, events, and other organization data.
              </p>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file-upload">Select Excel File</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    className="mt-2"
                  />
                </div>
                <Button 
                  onClick={handleUploadFile}
                  disabled={isProcessing}
                  className="w-full bg-[#c39a4e] hover:bg-[#c39a4e]/90 text-white"
                >
                  {isProcessing ? 'Processing...' : 'Upload File'}
                </Button>
              </div>
            </div>

            {/* Features List */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold mb-3">Excel Integration Features:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Import member lists and contact information
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Export financial reports and transaction history
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Bulk update member data and dues
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Import event schedules and attendance records
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Generate comprehensive organization reports
                </li>
              </ul>
            </div>

            {/* Back Button */}
            <Button 
              onClick={onBackToLogin}
              variant="outline"
              className="w-full border-2 border-[#122B5B] text-[#122B5B] hover:bg-[#122B5B]/5"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

