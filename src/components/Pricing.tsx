import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Check, Star } from 'lucide-react'

const plans = [
  {
    name: "Beta Access",
    price: "Free",
    period: "during beta",
    description: "🚀 Exclusive early access to EXCHKR - full features FREE!",
    features: [
      "Full platform access during beta",
      "All premium payment features",
      "Event management & ticketing",
      "Alumni & sponsor portals",
      "Direct feedback line to founders",
      "Custom onboarding support",
      "Beta tester exclusive perks",
      "🎁 Founding member recognition"
    ],
    cta: "Join Beta Program",
    popular: true
  },
  {
    name: "Growth",
    price: "$29",
    period: "per semester",
    description: "For growing organizations with active membership",
    features: [
      "Up to 100 members",
      "Advanced payment features",
      "Event management",
      "Alumni portal",
      "Priority support",
      "Custom branding",
      "Financial reporting"
    ],
    cta: "Start Trial",
    popular: false
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large organizations and university-wide deployments",
    features: [
      "Unlimited members",
      "Advanced integrations",
      "Sponsor management",
      "White-label options",
      "Dedicated support",
      "Custom features",
      "SLA guarantee"
    ],
    cta: "Contact Sales",
    popular: false
  }
]

export function Pricing() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            🚀 Beta Program Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Be a founding member! Join our exclusive beta program and help shape the future of student organization management.
          </p>
          <div className="mt-4 inline-flex items-center bg-[#C39A46]/10 text-[#12285B] px-4 py-2 rounded-full">
            <span className="text-sm">⭐ Limited beta spots available - apply now</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 border-2 shadow-xl scale-105' : 'border-gray-200'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm">Most Popular</span>
                  </div>
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-2">{plan.period}</span>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include free setup, training, and migration assistance
          </p>
          <p className="text-sm text-gray-500">
            Need a custom solution? <a href="mailto:sales@exchkr.com" className="text-blue-600 hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  )
}