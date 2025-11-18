import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { Upload, X, Download, Image as ImageIcon, Eye, Trash2 } from 'lucide-react'
import Masonry from 'react-responsive-masonry'

interface EventPhotosModalProps {
  isOpen: boolean
  onClose: () => void
  eventName: string
  eventDate: string
  canUpload?: boolean
}

interface Photo {
  id: string
  url: string
  uploadedBy: string
  uploadedAt: string
  caption?: string
}

export function EventPhotosModal({ 
  isOpen, 
  onClose, 
  eventName, 
  eventDate,
  canUpload = true 
}: EventPhotosModalProps) {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
      uploadedBy: 'John Smith',
      uploadedAt: '2024-11-09T14:30:00',
      caption: 'Great turnout at the workshop!'
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: '2024-11-09T15:45:00',
      caption: 'Team collaboration session'
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800',
      uploadedBy: 'Mike Chen',
      uploadedAt: '2024-11-09T16:20:00'
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      uploadedBy: 'Emily Davis',
      uploadedAt: '2024-11-09T17:00:00',
      caption: 'Amazing presentations!'
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800',
      uploadedBy: 'Alex Thompson',
      uploadedAt: '2024-11-09T17:30:00'
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
      uploadedBy: 'Lisa Anderson',
      uploadedAt: '2024-11-09T18:00:00',
      caption: 'Group photo with everyone'
    }
  ])
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newPhoto: Photo = {
            id: Date.now().toString() + Math.random(),
            url: e.target?.result as string,
            uploadedBy: 'Current User',
            uploadedAt: new Date().toISOString()
          }
          setPhotos(prev => [newPhoto, ...prev])
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleDelete = (photoId: string) => {
    setPhotos(prev => prev.filter(p => p.id !== photoId))
    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto(null)
    }
  }

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
  }

  return (
    <>
      {/* Main Gallery Modal */}
      <Dialog open={isOpen && !selectedPhoto} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl">{eventName} - Photos</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(eventDate).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  <ImageIcon className="h-3 w-3 mr-1" />
                  {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
                </Badge>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            {/* Upload Area */}
            {canUpload && (
              <div className="mb-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging
                      ? 'border-[#122B5B] bg-[#B8DFFF]/20'
                      : 'border-gray-300 hover:border-[#122B5B]'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm mb-2">
                    Drag and drop photos here, or{' '}
                    <label className="text-[#122B5B] hover:underline cursor-pointer">
                      browse
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e.target.files)}
                      />
                    </label>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports JPG, PNG, GIF up to 10MB
                  </p>
                </div>
              </div>
            )}

            {/* Photo Grid */}
            {photos.length > 0 ? (
              <Masonry columnsCount={3} gutter="16px">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative group rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <ImageWithFallback
                      src={photo.url}
                      alt={photo.caption || 'Event photo'}
                      className="w-full h-auto object-cover"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedPhoto(photo)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {canUpload && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(photo.id)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    {/* Photo info */}
                    {photo.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm">{photo.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </Masonry>
            ) : (
              <div className="text-center py-12">
                <ImageIcon className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p className="text-muted-foreground">No photos uploaded yet</p>
                {canUpload && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Be the first to share photos from this event!
                  </p>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Photo Detail View */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-5xl max-h-[95vh]">
          {selectedPhoto && (
            <div className="space-y-4">
              {/* Photo */}
              <div className="relative rounded-lg overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption || 'Event photo'}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>

              {/* Photo Details */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {selectedPhoto.caption && (
                    <p className="text-lg mb-2">{selectedPhoto.caption}</p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Uploaded by {selectedPhoto.uploadedBy}</span>
                    <span>•</span>
                    <span>
                      {new Date(selectedPhoto.uploadedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadImage(selectedPhoto.url, `event-photo-${selectedPhoto.id}.jpg`)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  {canUpload && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleDelete(selectedPhoto.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id)
                    if (currentIndex > 0) {
                      setSelectedPhoto(photos[currentIndex - 1])
                    }
                  }}
                  disabled={photos.findIndex(p => p.id === selectedPhoto.id) === 0}
                >
                  ← Previous
                </Button>
                
                <span className="text-sm text-muted-foreground">
                  {photos.findIndex(p => p.id === selectedPhoto.id) + 1} of {photos.length}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id)
                    if (currentIndex < photos.length - 1) {
                      setSelectedPhoto(photos[currentIndex + 1])
                    }
                  }}
                  disabled={photos.findIndex(p => p.id === selectedPhoto.id) === photos.length - 1}
                >
                  Next →
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
