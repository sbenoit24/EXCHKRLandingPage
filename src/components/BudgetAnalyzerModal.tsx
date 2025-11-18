import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Target,
  Lightbulb,
  FileText,
  X,
  Loader2,
  BarChart3
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface BudgetAnalyzerModalProps {
  isOpen: boolean
  onClose: () => void
}

interface BudgetInsight {
  type: 'success' | 'warning' | 'opportunity' | 'insight'
  title: string
  description: string
  icon: any
}

export function BudgetAnalyzerModal({ isOpen, onClose }: BudgetAnalyzerModalProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB')
        return
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file')
        return
      }
      
      setUploadedFile(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      
      toast.success('Budget screenshot uploaded successfully!')
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      const fakeEvent = {
        target: { files: [file] }
      } as any
      handleFileUpload(fakeEvent)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      toast.error('Please upload a budget screenshot first')
      return
    }

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Simulate AI analysis with progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate analysis time
    setTimeout(() => {
      clearInterval(progressInterval)
      setAnalysisProgress(100)
      setIsAnalyzing(false)
      setAnalysisComplete(true)
      toast.success('Budget analysis complete!')
    }, 2500)
  }

  const handleReset = () => {
    setUploadedFile(null)
    setImagePreview(null)
    setIsAnalyzing(false)
    setAnalysisComplete(false)
    setAnalysisProgress(0)
  }

  const handleClose = () => {
    handleReset()
    onClose()
  }

  // Mock AI insights - in production, these would come from actual AI analysis
  const insights: BudgetInsight[] = [
    {
      type: 'opportunity',
      title: 'Equipment Budget Optimization',
      description: 'You allocated 35% to equipment rental. Consider investing in owned equipment to reduce long-term costs by up to 60%.',
      icon: TrendingUp
    },
    {
      type: 'success',
      title: 'Strong Event Planning',
      description: 'Your film festival budget includes appropriate contingency funds (15%), which is ideal for events.',
      icon: CheckCircle
    },
    {
      type: 'warning',
      title: 'Marketing Underbudgeted',
      description: 'Only 8% allocated to marketing. Film clubs typically see better attendance with 15-20% marketing spend.',
      icon: AlertTriangle
    },
    {
      type: 'insight',
      title: 'Venue Cost Pattern',
      description: 'Historical data shows venue costs spike in November-December. Consider booking early or exploring alternative screening locations.',
      icon: Lightbulb
    },
    {
      type: 'opportunity',
      title: 'Revenue Opportunity',
      description: 'Based on your attendance numbers, ticket sales for premium screenings could offset 40% of event costs.',
      icon: DollarSign
    }
  ]

  const recommendations = [
    {
      category: 'Equipment',
      current: 35,
      recommended: 25,
      savings: '$850',
      action: 'Purchase key equipment instead of renting'
    },
    {
      category: 'Marketing',
      current: 8,
      recommended: 18,
      savings: '+$500 revenue',
      action: 'Increase social media and poster campaigns'
    },
    {
      category: 'Contingency',
      current: 15,
      recommended: 15,
      savings: 'Optimal',
      action: 'Maintain current allocation'
    },
    {
      category: 'Food & Beverages',
      current: 22,
      recommended: 18,
      savings: '$300',
      action: 'Negotiate bulk catering contracts'
    }
  ]

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200'
      case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200'
      case 'opportunity': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'insight': return 'text-purple-600 bg-purple-50 border-purple-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle
      case 'warning': return AlertTriangle
      case 'opportunity': return TrendingUp
      case 'insight': return Lightbulb
      default: return FileText
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#c39a4e]" />
            AI Budget Analyzer
          </DialogTitle>
          <DialogDescription>
            Upload a screenshot of your past budget and get AI-powered insights and recommendations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {!analysisComplete ? (
            <>
              {/* Upload Area */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#122B5B] transition-colors cursor-pointer"
              >
                <input
                  type="file"
                  id="budget-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                
                {!imagePreview ? (
                  <label htmlFor="budget-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Budget Screenshot</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports: JPG, PNG, PDF (Max 10MB)
                    </p>
                  </label>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Budget preview" 
                        className="max-h-64 mx-auto rounded-lg border"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleReset()
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <ImageIcon className="h-4 w-4" />
                      {uploadedFile?.name}
                    </div>
                  </div>
                )}
              </div>

              {/* Analysis Progress */}
              {isAnalyzing && (
                <Card className="border-2 border-[#B8DFFF] bg-[#B8DFFF]/10">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-[#122B5B]" />
                        <div className="flex-1">
                          <h4 className="font-medium">Analyzing your budget...</h4>
                          <p className="text-sm text-muted-foreground">
                            AI is reviewing spending patterns, category allocations, and historical trends
                          </p>
                        </div>
                      </div>
                      <Progress value={analysisProgress} className="h-2" />
                      <div className="text-sm text-muted-foreground text-center">
                        {analysisProgress}% complete
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={handleAnalyze}
                  disabled={!uploadedFile || isAnalyzing}
                  className="flex-1 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Analyze Budget
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Analysis Results */}
              <div className="space-y-6">
                {/* Summary Card */}
                <Card className="border-2 border-[#c39a4e] bg-gradient-to-r from-[#c39a4e]/10 to-[#B8DFFF]/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-[#c39a4e]" />
                      Analysis Complete
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#122B5B]">5</div>
                        <div className="text-sm text-muted-foreground">Key Insights</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">$1,450</div>
                        <div className="text-sm text-muted-foreground">Potential Savings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">85%</div>
                        <div className="text-sm text-muted-foreground">Budget Health</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Insights */}
                <div className="space-y-3">
                  <h3 className="font-medium flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-[#c39a4e]" />
                    AI-Powered Insights
                  </h3>
                  {insights.map((insight, index) => {
                    const Icon = getInsightIcon(insight.type)
                    return (
                      <Card key={index} className={`border ${getInsightColor(insight.type)}`}>
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <div className="mt-0.5">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium mb-1">{insight.title}</h4>
                              <p className="text-sm opacity-90">{insight.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {/* Recommendations */}
                <div className="space-y-3">
                  <h3 className="font-medium flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-[#122B5B]" />
                    Budget Recommendations
                  </h3>
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {recommendations.map((rec, index) => (
                          <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-medium">{rec.category}</h4>
                                <p className="text-sm text-muted-foreground">{rec.action}</p>
                              </div>
                              <Badge 
                                variant={rec.current === rec.recommended ? 'secondary' : 'default'}
                                className={rec.current === rec.recommended ? 'bg-green-100 text-green-700' : ''}
                              >
                                {rec.savings}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                  <span className="text-muted-foreground">Current: {rec.current}%</span>
                                  <span className="font-medium text-[#122B5B]">Recommended: {rec.recommended}%</span>
                                </div>
                                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="absolute h-full bg-gray-400 rounded-full transition-all"
                                    style={{ width: `${rec.current}%` }}
                                  />
                                  <div 
                                    className="absolute h-full bg-[#122B5B] rounded-full transition-all opacity-50"
                                    style={{ width: `${rec.recommended}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Next Steps */}
                <Card className="border-2 border-[#B8DFFF]">
                  <CardHeader>
                    <CardTitle className="text-base">Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <p className="text-sm">Review recommended budget adjustments</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <p className="text-sm">Implement high-impact savings opportunities</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <p className="text-sm">Set up budget tracking for next semester</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="flex-1"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Analyze Another Budget
                  </Button>
                  <Button
                    onClick={handleClose}
                    className="flex-1 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                  >
                    Apply Recommendations
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Info Footer */}
        {!analysisComplete && (
          <div className="text-center pt-2 border-t">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI-powered analysis using historical budget data and industry best practices
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
