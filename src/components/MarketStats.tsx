import { TrendingUp, Users, DollarSign, Zap } from 'lucide-react'

const stats = [
  {
    icon: Users,
    number: "5 mins",
    label: "Setup Time",
    description: "Get your organization up and running in minutes, not hours"
  },
  {
    icon: TrendingUp,
    number: "65%",
    label: "Time Saved",
    description: "Student leaders report saving hours per week on admin tasks"
  },
  {
    icon: DollarSign,
    number: "100%",
    label: "Payment Tracking",
    description: "Real-time visibility into all dues and event payments"
  },
  {
    icon: Zap,
    number: "24/7",
    label: "Support",
    description: "Get help whenever you need it with our dedicated support team"
  }
]

export function MarketStats() {
  return (
    <section className="py-20 bg-blue-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-white mb-4">
            Built for Student Success
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join organizations that are already saving time and improving their operations
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl text-white">{stat.number}</div>
                <div className="text-xl text-blue-100">{stat.label}</div>
                <p className="text-sm text-blue-200 max-w-xs mx-auto">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}