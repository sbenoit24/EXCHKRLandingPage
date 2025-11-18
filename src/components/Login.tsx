import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

interface LoginProps {
  onLogin: (user: any) => void
  onSignUp?: () => void
}

export function Login({ onLogin, onSignUp }: LoginProps) {
  const [email, setEmail] = useState('admin@exchequer.com')
  const [password, setPassword] = useState('password')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock authentication
    if (email === 'admin@exchequer.com' && password === 'password') {
      onLogin({
        id: '1',
        name: 'Luca',
        email: 'admin@exchequer.com',
        role: 'Treasurer',
        organization: 'Syracuse Film Club'
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[#122B5B]"></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>
      
      <Card className="w-full max-w-md relative z-10 border-0 shadow-2xl bg-white/90 backdrop-blur-xl">
        <CardHeader className="text-center pb-6 bg-[rgba(195,154,78,1)]">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-[#122B5B] rounded-2xl flex items-center justify-center text-[rgba(45,90,196,1)] text-2xl shadow-lg">
              🦬
            </div>
            <span className="ml-4 text-3xl text-[rgba(255,255,255,1)] font-bold">EXCHKR</span>
          </div>
          <CardTitle className="text-2xl text-[rgba(255,255,255,1)]">Welcome back! 👋</CardTitle>
          <CardDescription className="text-lg text-[rgba(255,255,255,1)]">Sign in to your organization's financial hub</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#122B5B] hover:bg-[#122B5B]/90 text-white shadow-lg transition-all duration-200 hover:scale-105">
              Sign In ✨
            </Button>
          </form>
          
          {onSignUp && (
            <div className="mt-4">
              <Button 
                onClick={onSignUp}
                variant="outline"
                className="w-full border-2 border-[#c39a4e] text-[#c39a4e] hover:bg-[#c39a4e]/10"
              >
                Sign Up
              </Button>
            </div>
          )}
          
          <div className="mt-4 p-3 bg-[#BBDFF]/10 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Demo Credentials:</strong><br />
              Email: admin@exchequer.com<br />
              Password: password
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}