import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Card, CardContent } from '../ui/card'
import { 
  Upload,
  X,
  Camera,
  Image as ImageIcon,
  DollarSign,
  Calendar,
  FileText,
  CheckCircle,
  ArrowLeft
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface ReceiptSubmissionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ReceiptSubmissionModal({ isOpen, onClose }: ReceiptSubmissionModalProps) {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const categories = [
    'Event Supplies',
    'Food & Beverages',
    'Equipment',
    'Transportation',
    'Marketing Materials',
    'Other'
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      toast.success('Receipt uploaded')
    }
  }

  const handleSubmit = () => {
    if (!amount || !description || !date || !category) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!uploadedFile) {
      toast.error('Please upload a receipt image')
      return
    }

    // Submit receipt
    toast.success('Receipt submitted for approval!')
    
    // Reset form
    setAmount('')
    setDescription('')
    setDate('')
    setCategory('')
    setUploadedFile(null)
    
    onClose()
  }

  const removeFile = () => {
    setUploadedFile(null)
    toast.info('Receipt removed')
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0">
        <div className="sticky top-0 bg-white border-b z-10 rounded-t-3xl">
          <SheetHeader className="p-4">
            <div className="flex items-center gap-3">
              <button onClick={onClose} className="p-2 -ml-2 active:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <SheetTitle>Submit Receipt</SheetTitle>
            </div>
          </SheetHeader>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto h-full pb-32">
          {/* Upload Section */}
          <div>
            <Label className="mb-3 block">Receipt Image *</Label>
            {uploadedFile ? (
              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-green-600">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{uploadedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(uploadedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={removeFile}
                      className="p-2 hover:bg-red-100 rounded-full"
                    >
                      <X className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                <label htmlFor="receipt-photo" className="block">
                  <Card className="border-2 border-dashed border-gray-300 hover:border-[#122B5B] cursor-pointer transition-colors">
                    <CardContent className="p-6 text-center">
                      <Camera className="h-10 w-10 mx-auto mb-3 text-[#122B5B]" />
                      <p className="font-medium mb-1">Take Photo</p>
                      <p className="text-xs text-muted-foreground">Use your camera</p>
                    </CardContent>
                  </Card>
                  <input
                    id="receipt-photo"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>

                <label htmlFor="receipt-upload" className="block">
                  <Card className="border-2 border-dashed border-gray-300 hover:border-[#122B5B] cursor-pointer transition-colors">
                    <CardContent className="p-6 text-center">
                      <ImageIcon className="h-10 w-10 mx-auto mb-3 text-[#122B5B]" />
                      <p className="font-medium mb-1">Upload from Gallery</p>
                      <p className="text-xs text-muted-foreground">Choose existing image</p>
                    </CardContent>
                  </Card>
                  <input
                    id="receipt-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Amount */}
          <div>
            <Label htmlFor="amount" className="mb-2 block">
              Amount *
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <Label htmlFor="date" className="mb-2 block">
              Date of Purchase *
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="mb-2 block">
              Category *
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                    category === cat
                      ? 'border-[#122B5B] bg-[#122B5B] text-white'
                      : 'border-gray-200 hover:border-[#122B5B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="mb-2 block">
              Description *
            </Label>
            <Textarea
              id="description"
              placeholder="What was this purchase for? (e.g., Snacks for workshop attendees)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-24"
            />
          </div>

          {/* Info Card */}
          <Card className="bg-[#B8DFFF]/20 border-[#B8DFFF]">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <FileText className="h-5 w-5 text-[#122B5B] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm mb-1">Reimbursement Policy</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Receipts must be submitted within 30 days</li>
                    <li>• Pre-approved purchases only</li>
                    <li>• Processing takes 5-7 business days</li>
                    <li>• Keep original receipts until reimbursed</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fixed Bottom Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
          <Button 
            onClick={handleSubmit}
            className="w-full h-12 bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
            disabled={!amount || !description || !date || !category || !uploadedFile}
          >
            <Upload className="mr-2 h-5 w-5" />
            Submit for Approval
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
