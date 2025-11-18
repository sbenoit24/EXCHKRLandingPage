import { Card, CardContent } from './ui/card'
import { Linkedin, Mail } from 'lucide-react'

const team = [
  {
    name: "Gabi Josefson",
    role: "CEO",
    email: "Gabi@exchkr.com"
  },
  {
    name: "Mitchell Breakstone",
    role: "President",
    email: ""
  },
  {
    name: "Sam Benoit",
    role: "Founding Engineer",
    email: ""
  }
]

const advisors = [
  { name: "Carl Starkey", company: "AWSM" },
  { name: "Mandy Pekin", company: "Grubhub" },
  { name: "Greg Weiss", company: "ScoreSwag" },
  { name: "Daniel Mann", company: "FirstCut Barrel" },
  { name: "Pete DeSio", company: "Capital S" },
  { name: "Cooley LLP", company: "Legal Advisor" }
]

export function Team() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600">
            Experienced founders backed by industry veterans
          </p>
        </div>
        
        {/* Executive Team */}
        <div className="mb-16">
          <h3 className="text-2xl text-gray-900 text-center mb-8">Executive Team</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center border border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl text-gray-600">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h4 className="text-xl text-gray-900 mb-1">{member.name}</h4>
                  <p className="text-blue-600 mb-4">{member.role}</p>
                  {member.email && (
                    <div className="flex justify-center space-x-3">
                      <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-gray-600">
                        <Mail className="h-5 w-5" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-gray-600">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Advisory Board */}
        <div>
          <h3 className="text-2xl text-gray-900 text-center mb-8">Advisory Board</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <h4 className="text-lg text-gray-900 mb-1">{advisor.name}</h4>
                <p className="text-gray-600">{advisor.company}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}