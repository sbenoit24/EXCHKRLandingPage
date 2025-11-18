import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { 
  Search, 
  Send, 
  Plus, 
  Paperclip, 
  Image as ImageIcon,
  MoreVertical,
  Users,
  MessageSquare,
  Pin,
  Circle
} from 'lucide-react'

interface Conversation {
  id: string
  name: string
  role: string
  lastMessage: string
  lastMessageTime: string
  unread: number
  avatar: string
  online?: boolean
  pinned?: boolean
}

interface Message {
  id: string
  sender: string
  senderRole: string
  content: string
  timestamp: string
  isCurrentUser: boolean
  avatar: string
}

export function MemberMessagesView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1')
  const [messageInput, setMessageInput] = useState('')

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Treasurer',
      lastMessage: 'Your reimbursement has been approved',
      lastMessageTime: '10m ago',
      unread: 2,
      avatar: 'SC',
      online: true,
      pinned: true
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      role: 'Events Director',
      lastMessage: 'Can you help with setup tomorrow?',
      lastMessageTime: '1h ago',
      unread: 0,
      avatar: 'MJ',
      online: true
    },
    {
      id: '3',
      name: 'Film Club Officers',
      role: 'Group Chat',
      lastMessage: 'Meeting notes uploaded',
      lastMessageTime: '2h ago',
      unread: 5,
      avatar: 'FC',
      online: false
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      role: 'Member',
      lastMessage: 'See you at the screening!',
      lastMessageTime: '4h ago',
      unread: 0,
      avatar: 'ER',
      online: false
    },
    {
      id: '5',
      name: 'Alex Thompson',
      role: 'VP Marketing',
      lastMessage: 'New poster designs are ready',
      lastMessageTime: '1d ago',
      unread: 1,
      avatar: 'AT',
      online: true
    }
  ]

  const messages: { [key: string]: Message[] } = {
    '1': [
      {
        id: '1',
        sender: 'Sarah Chen',
        senderRole: 'Treasurer',
        content: 'Hi! I received your reimbursement request for the workshop supplies.',
        timestamp: '2:30 PM',
        isCurrentUser: false,
        avatar: 'SC'
      },
      {
        id: '2',
        sender: 'You',
        senderRole: 'Member',
        content: 'Thanks! I uploaded all the receipts. Let me know if you need anything else.',
        timestamp: '2:45 PM',
        isCurrentUser: true,
        avatar: 'ME'
      },
      {
        id: '3',
        sender: 'Sarah Chen',
        senderRole: 'Treasurer',
        content: 'Everything looks good. Your reimbursement has been approved and will be processed this week!',
        timestamp: '2:50 PM',
        isCurrentUser: false,
        avatar: 'SC'
      }
    ],
    '2': [
      {
        id: '1',
        sender: 'Marcus Johnson',
        senderRole: 'Events Director',
        content: 'Hey! Are you available to help with the film festival setup tomorrow?',
        timestamp: '1:15 PM',
        isCurrentUser: false,
        avatar: 'MJ'
      },
      {
        id: '2',
        sender: 'You',
        senderRole: 'Member',
        content: 'Yes, I can be there! What time should I arrive?',
        timestamp: '1:20 PM',
        isCurrentUser: true,
        avatar: 'ME'
      },
      {
        id: '3',
        sender: 'Marcus Johnson',
        senderRole: 'Events Director',
        content: 'Perfect! Setup starts at 5 PM. We\'ll need help with the projector and seating.',
        timestamp: '1:25 PM',
        isCurrentUser: false,
        avatar: 'MJ'
      }
    ],
    '3': [
      {
        id: '1',
        sender: 'Alex Thompson',
        senderRole: 'VP Marketing',
        content: 'Quick reminder: Officer meeting tomorrow at 3 PM',
        timestamp: '11:00 AM',
        isCurrentUser: false,
        avatar: 'AT'
      },
      {
        id: '2',
        sender: 'Sarah Chen',
        senderRole: 'Treasurer',
        content: 'I\'ve uploaded the meeting notes from last week to our shared drive.',
        timestamp: '11:30 AM',
        isCurrentUser: false,
        avatar: 'SC'
      }
    ]
  }

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentMessages = selectedConversation ? messages[selectedConversation] || [] : []
  const currentConversation = conversations.find(c => c.id === selectedConversation)

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedConversation) {
      // In a real app, send message to backend
      setMessageInput('')
    }
  }

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="shadow-lg overflow-hidden flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Messages</CardTitle>
              <Button size="sm" className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-y-auto">
            <div className="divide-y">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    selectedConversation === conv.id ? 'bg-[#B8DFFF]/20 border-l-4 border-l-[#122B5B]' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full bg-[#122B5B] flex items-center justify-center text-white">
                        {conv.avatar}
                      </div>
                      {conv.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm truncate">{conv.name}</p>
                          {conv.pinned && <Pin className="h-3 w-3 text-[#122B5B]" />}
                        </div>
                        <span className="text-xs text-muted-foreground">{conv.lastMessageTime}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{conv.role}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <Badge className="bg-[#122B5B] text-white ml-2 h-5 min-w-5 px-1.5">
                            {conv.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-2 shadow-lg overflow-hidden flex flex-col">
          {selectedConversation && currentConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#122B5B] flex items-center justify-center text-white">
                      {currentConversation.avatar}
                    </div>
                    <div>
                      <h3 className="font-medium">{currentConversation.name}</h3>
                      <p className="text-xs text-muted-foreground">{currentConversation.role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isCurrentUser && (
                      <div className="h-8 w-8 rounded-full bg-[#122B5B] flex items-center justify-center text-white text-sm flex-shrink-0">
                        {message.avatar}
                      </div>
                    )}
                    <div className={`max-w-[70%] ${message.isCurrentUser ? 'text-right' : ''}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{message.sender}</span>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{message.senderRole}</p>
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.isCurrentUser
                          ? 'bg-[#122B5B] text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                    {message.isCurrentUser && (
                      <div className="h-8 w-8 rounded-full bg-[#c39a4e] flex items-center justify-center text-white text-sm flex-shrink-0">
                        {message.avatar}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-end gap-2">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="flex-1 min-h-[44px] max-h-32 resize-none"
                    rows={1}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="bg-[#122B5B] hover:bg-[#122B5B]/90 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
