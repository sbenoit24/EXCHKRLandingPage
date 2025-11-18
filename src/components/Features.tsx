import { CreditCard, Users, MessageSquare, BarChart3, UserCheck, Building2 } from 'lucide-react'
import { Card, CardContent } from './ui/card'

const features = [
  {
    icon: CreditCard,
    title: "Hosted Checkouts",
    description: "Stripe-powered payment processing with one-click hosted checkouts for dues and event registration"
  },
  {
    icon: BarChart3,
    title: "Real-time Reconciliation",
    description: "Live financial ledgers and automated reconciliation keep your books accurate and up-to-date"
  },
  {
    icon: Users,
    title: "Dynamic Rosters",
    description: "Manage membership with dynamic rosters that update automatically as members join and pay dues"
  },
  {
    icon: MessageSquare,
    title: "Built-in Messaging",
    description: "Communicate with members directly through the platform, no more group chat chaos"
  },
  {
    icon: UserCheck,
    title: "Alumni Portal",
    description: "Engage alumni with dedicated portals for ongoing relationships and fundraising opportunities"
  },
  {
    icon: Building2,
    title: "Sponsor Management",
    description: "Attract and manage sponsors with dedicated portals and engagement tools"
  }
]

export function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            Everything Your Organization Needs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Replace fragmented workflows with a single, modern platform that saves hours per week
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}