import { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { 
  Search,
  Send,
  Plus,
  MoreVertical,
  Phone,
  Video,
  Info,
  Paperclip,
  Smile,
  Circle
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Separator } from './ui/separator'
import { toast } from 'sonner@2.0.3'

interface Message {
  id: number
  senderId: number
  content: string
  timestamp: Date
  read: boolean
}

interface Conversation {
  id: number
  userId: number
  userName: string
  userRole: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  online: boolean
}

interface User {
  id: number
  name: string
  role: string
  email: string
  online: boolean
}

export function MessagesView() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messageText, setMessageText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false)

  const currentUserId = 1 // Current logged in user

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      userId: 2,
      userName: 'Sarah Chen',
      userRole: 'Treasurer',
      lastMessage: 'The budget report is ready for review',
      lastMessageTime: new Date(2024, 10, 3, 14, 30),
      unreadCount: 2,
      online: true
    },
    {
      id: 2,
      userId: 3,
      userName: 'Marcus Johnson',
      userRole: 'Events Director',
      lastMessage: 'Can you help with the film festival setup?',
      lastMessageTime: new Date(2024, 10, 3, 12, 15),
      unreadCount: 0,
      online: true
    },
    {
      id: 3,
      userId: 4,
      userName: 'Emily Rodriguez',
      userRole: 'Member',
      lastMessage: 'Thanks for approving my reimbursement!',
      lastMessageTime: new Date(2024, 10, 2, 16, 45),
      unreadCount: 0,
      online: false
    },
    {
      id: 4,
      userId: 5,
      userName: 'Alex Thompson',
      userRole: 'VP Marketing',
      lastMessage: 'Updated the poster designs',
      lastMessageTime: new Date(2024, 10, 2, 9, 20),
      unreadCount: 1,
      online: true
    },
    {
      id: 5,
      userId: 6,
      userName: 'Jordan Lee',
      userRole: 'Member',
      lastMessage: 'When is the next workshop?',
      lastMessageTime: new Date(2024, 10, 1, 18, 10),
      unreadCount: 0,
      online: false
    }
  ])

  const [messages, setMessages] = useState<Record<number, Message[]>>({
    1: [
      { id: 1, senderId: 2, content: 'Hey! I finished the budget analysis for this quarter', timestamp: new Date(2024, 10, 3, 14, 15), read: true },
      { id: 2, senderId: 1, content: 'Great! Can you send it over?', timestamp: new Date(2024, 10, 3, 14, 20), read: true },
      { id: 3, senderId: 2, content: 'The budget report is ready for review', timestamp: new Date(2024, 10, 3, 14, 30), read: false },
      { id: 4, senderId: 2, content: 'Let me know if you need any changes', timestamp: new Date(2024, 10, 3, 14, 30), read: false }
    ],
    2: [
      { id: 1, senderId: 3, content: 'Planning is going well for the festival', timestamp: new Date(2024, 10, 3, 12, 10), read: true },
      { id: 2, senderId: 3, content: 'Can you help with the film festival setup?', timestamp: new Date(2024, 10, 3, 12, 15), read: true },
      { id: 3, senderId: 1, content: 'Of course! What do you need?', timestamp: new Date(2024, 10, 3, 12, 20), read: true }
    ],
    3: [
      { id: 1, senderId: 4, content: 'Hi! I submitted a receipt for the workshop supplies', timestamp: new Date(2024, 10, 2, 16, 30), read: true },
      { id: 2, senderId: 1, content: 'Approved! Processing now', timestamp: new Date(2024, 10, 2, 16, 40), read: true },
      { id: 3, senderId: 4, content: 'Thanks for approving my reimbursement!', timestamp: new Date(2024, 10, 2, 16, 45), read: true }
    ],
    4: [
      { id: 1, senderId: 5, content: 'Check out these new designs', timestamp: new Date(2024, 10, 2, 9, 15), read: true },
      { id: 2, senderId: 5, content: 'Updated the poster designs', timestamp: new Date(2024, 10, 2, 9, 20), read: false }
    ],
    5: [
      { id: 1, senderId: 6, content: 'When is the next workshop?', timestamp: new Date(2024, 10, 1, 18, 10), read: true }
    ]
  })

  const allUsers: User[] = [
    { id: 2, name: 'Sarah Chen', role: 'Treasurer', email: 'sarah.chen@university.edu', online: true },
    { id: 3, name: 'Marcus Johnson', role: 'Events Director', email: 'marcus.j@university.edu', online: true },
    { id: 4, name: 'Emily Rodriguez', role: 'Member', email: 'emily.r@university.edu', online: false },
    { id: 5, name: 'Alex Thompson', role: 'VP Marketing', email: 'alex.t@university.edu', online: true },
    { id: 6, name: 'Jordan Lee', role: 'Member', email: 'jordan.lee@university.edu', online: false },
    { id: 7, name: 'Taylor Kim', role: 'Member', email: 'taylor.k@university.edu', online: true },
    { id: 8, name: 'Sam Patel', role: 'Secretary', email: 'sam.patel@university.edu', online: false }
  ]

  const filteredConversations = conversations.filter(conv =>
    conv.userName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return

    const newMessage: Message = {
      id: Date.now(),
      senderId: currentUserId,
      content: messageText,
      timestamp: new Date(),
      read: true
    }

    setMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMessage]
    }))

    setConversations(prev => prev.map(conv =>
      conv.id === selectedConversation.id
        ? { ...conv, lastMessage: messageText, lastMessageTime: new Date() }
        : conv
    ))

    setMessageText('')
    toast.success('Message sent')
  }

  const handleStartConversation = (user: User) => {
    const existingConv = conversations.find(conv => conv.userId === user.id)
    
    if (existingConv) {
      setSelectedConversation(existingConv)
    } else {
      const newConv: Conversation = {
        id: Date.now(),
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        lastMessage: '',
        lastMessageTime: new Date(),
        unreadCount: 0,
        online: user.online
      }
      setConversations(prev => [newConv, ...prev])
      setSelectedConversation(newConv)
      setMessages(prev => ({ ...prev, [newConv.id]: [] }))
    }
    
    setShowNewMessageDialog(false)
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  return (
    <div className="h-[calc(100vh-140px)] flex">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r bg-white flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Messages</h2>
            <Button
              size="sm"
              onClick={() => setShowNewMessageDialog(true)}
              className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left ${
                  selectedConversation?.id === conv.id ? 'bg-[#B8DFFF]/30' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#122B5B] text-white">
                        {conv.userName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-green-500 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium truncate">{conv.userName}</h4>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {formatTime(conv.lastMessageTime)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {conv.userRole}
                      </Badge>
                      {conv.unreadCount > 0 && (
                        <Badge className="bg-[#122B5B] text-white text-xs">
                          {conv.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#122B5B] text-white">
                        {selectedConversation.userName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.online && (
                      <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-green-500 text-green-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedConversation.userName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.online ? 'Active now' : 'Offline'} • {selectedConversation.userRole}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {(messages[selectedConversation.id] || []).map((message, index) => {
                  const isOwn = message.senderId === currentUserId
                  const showAvatar = index === 0 || messages[selectedConversation.id][index - 1].senderId !== message.senderId

                  return (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="flex-shrink-0">
                        {showAvatar ? (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className={isOwn ? 'bg-[#c39a4e]' : 'bg-[#122B5B]'}>
                              {isOwn ? 'ME' : selectedConversation.userName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-8 w-8" />
                        )}
                      </div>
                      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-md`}>
                        <div
                          className={`px-4 py-2 rounded-2xl ${
                            isOwn
                              ? 'bg-[#122B5B] text-white'
                              : 'bg-white border'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">
                          {formatMessageTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="bg-white border-t p-4">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="flex-1"
                />
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-[#B8DFFF] flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-[#122B5B]" />
              </div>
              <h3 className="font-medium mb-2">Select a conversation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Choose from existing messages or start a new one
              </p>
              <Button
                onClick={() => setShowNewMessageDialog(true)}
                className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* New Message Dialog */}
      <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
            <DialogDescription>
              Select a member to start a conversation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {allUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleStartConversation(user)}
                className="w-full p-3 rounded-lg hover:bg-gray-50 transition-colors text-left border"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#122B5B] text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {user.online && (
                      <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-green-500 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{user.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <Badge variant="secondary" className="text-xs">
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
