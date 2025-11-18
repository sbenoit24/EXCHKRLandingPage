import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Badge } from '../ui/badge'
import { Avatar } from '../ui/avatar'
import { 
  Search, 
  Send, 
  Plus, 
  Paperclip, 
  Image as ImageIcon,
  MoreVertical,
  Users,
  Building2,
  MessageSquare,
  Pin,
  Star,
  Archive
} from 'lucide-react'

interface AdminNetworkMessagesProps {
  selectedOrg: string
}

interface Conversation {
  id: string
  name: string
  type: 'club' | 'officer' | 'group'
  lastMessage: string
  lastMessageTime: string
  unread: number
  avatar: string
  campus?: string
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

export function AdminNetworkMessages({ selectedOrg }: AdminNetworkMessagesProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1')
  const [messageInput, setMessageInput] = useState('')

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Robotics Club Officers',
      type: 'group',
      lastMessage: 'Budget approved for the workshop',
      lastMessageTime: '10m ago',
      unread: 2,
      avatar: 'RC',
      campus: 'Stanford',
      online: true,
      pinned: true
    },
    {
      id: '2',
      name: 'John Smith',
      type: 'officer',
      lastMessage: 'Thanks for the approval!',
      lastMessageTime: '1h ago',
      unread: 0,
      avatar: 'JS',
      campus: 'Stanford',
      online: true
    },
    {
      id: '3',
      name: 'Student Government - Berkeley',
      type: 'group',
      lastMessage: 'Event funding request submitted',
      lastMessageTime: '2h ago',
      unread: 5,
      avatar: 'SG',
      campus: 'Berkeley',
      online: false
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      type: 'officer',
      lastMessage: 'Can we schedule a meeting?',
      lastMessageTime: '4h ago',
      unread: 1,
      avatar: 'SJ',
      campus: 'Berkeley',
      online: false
    },
    {
      id: '5',
      name: 'All Campus Presidents',
      type: 'group',
      lastMessage: 'New compliance requirements announced',
      lastMessageTime: '1d ago',
      unread: 0,
      avatar: 'AP',
      pinned: true
    },
    {
      id: '6',
      name: 'Dance Team',
      type: 'club',
      lastMessage: 'Reimbursement approved',
      lastMessageTime: '2d ago',
      unread: 0,
      avatar: 'DT',
      campus: 'Harvard'
    }
  ]

  const messages: { [key: string]: Message[] } = {
    '1': [
      {
        id: '1',
        sender: 'John Smith',
        senderRole: 'President, Robotics Club',
        content: 'Hi! We submitted our budget request for the Fall Workshop. Could you please review it when you have a chance?',
        timestamp: '2:30 PM',
        isCurrentUser: false,
        avatar: 'JS'
      },
      {
        id: '2',
        sender: 'You',
        senderRole: 'Network Admin',
        content: 'I\'ve reviewed your request. Everything looks good. The $500 budget for the workshop has been approved.',
        timestamp: '2:45 PM',
        isCurrentUser: true,
        avatar: 'SA'
      },
      {
        id: '3',
        sender: 'Mike Chen',
        senderRole: 'Treasurer, Robotics Club',
        content: 'That\'s great news! We\'ll start booking the venue this week.',
        timestamp: '2:50 PM',
        isCurrentUser: false,
        avatar: 'MC'
      }
    ],
    '2': [
      {
        id: '1',
        sender: 'John Smith',
        senderRole: 'President, Robotics Club',
        content: 'Thanks for approving our budget! We really appreciate your quick response.',
        timestamp: '1:15 PM',
        isCurrentUser: false,
        avatar: 'JS'
      },
      {
        id: '2',
        sender: 'You',
        senderRole: 'Network Admin',
        content: 'You\'re welcome! Looking forward to seeing the workshop come together.',
        timestamp: '1:20 PM',
        isCurrentUser: true,
        avatar: 'SA'
      }
    ]
  }

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.campus?.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with clubs, officers, and groups across your network
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        {/* Conversations List */}
        <Card className="shadow-lg overflow-hidden flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Conversations</CardTitle>
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
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white ${
                        conv.type === 'club' ? 'bg-[#122B5B]' :
                        conv.type === 'officer' ? 'bg-[#c39a4e]' :
                        'bg-purple-600'
                      }`}>
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
                      {conv.campus && (
                        <p className="text-xs text-muted-foreground mb-1">{conv.campus}</p>
                      )}
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
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${
                      currentConversation.type === 'club' ? 'bg-[#122B5B]' :
                      currentConversation.type === 'officer' ? 'bg-[#c39a4e]' :
                      'bg-purple-600'
                    }`}>
                      {currentConversation.avatar}
                    </div>
                    <div>
                      <h3 className="font-medium">{currentConversation.name}</h3>
                      {currentConversation.campus && (
                        <p className="text-xs text-muted-foreground">{currentConversation.campus}</p>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {currentConversation.type === 'club' ? (
                        <><Building2 className="h-3 w-3 mr-1" /> Club</>
                      ) : currentConversation.type === 'officer' ? (
                        <><Users className="h-3 w-3 mr-1" /> Officer</>
                      ) : (
                        <><MessageSquare className="h-3 w-3 mr-1" /> Group</>
                      )}
                    </Badge>
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
                      <div className="h-8 w-8 rounded-full bg-[#c39a4e] flex items-center justify-center text-white text-sm flex-shrink-0">
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
                      <div className="h-8 w-8 rounded-full bg-[#122B5B] flex items-center justify-center text-white text-sm flex-shrink-0">
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
