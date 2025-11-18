import exampleImage from 'figma:asset/ee1240d4837a8d5450420e6b2c60aa8887c51c5c.png';
import { Check, X } from 'lucide-react';

const competitors = [
  { name: 'EXCHKR', logo: '🦬', isUs: true },
  { name: 'CampusGroups', logo: 'CG', isUs: false },
  { name: 'Crowded', logo: 'CR', isUs: false },
  { name: 'BillHighway', logo: 'BH', isUs: false },
  { name: 'OmegaFi', logo: 'ΩΦ', isUs: false }
];

const features = [
  { 
    name: 'Financial Management', 
    support: [true, false, true, true, false] 
  },
  { 
    name: 'Member Management', 
    support: [true, false, true, true, true] 
  },
  { 
    name: 'Sponsorships', 
    support: [true, false, false, false, false] 
  },
  { 
    name: 'Connect to Alumni', 
    support: [true, true, true, true, false] 
  },
  { 
    name: 'Student-first UX', 
    support: [true, true, true, false, false] 
  },
  { 
    name: 'Easy Leadership Turnover', 
    support: [true, true, false, false, false] 
  },
  { 
    name: 'Affordable', 
    support: [true, true, false, false, false] 
  }
];

export function CompetitorComparison() {
  return (
    <section className="py-20 bg-[#12285B]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-white mb-4">
            Why Choose EXCHKR?
          </h2>
          <p className="text-xl text-[#BBDFF] max-w-3xl mx-auto">
            See how we stack up against the competition. EXCHKR is the only platform built specifically for student organizations.
          </p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Header Row */}
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-6 text-lg text-gray-900 min-w-[200px]">
                    Us vs. Them
                  </th>
                  {competitors.map((competitor, index) => (
                    <th key={index} className="text-center p-6 min-w-[140px]">
                      <div className="flex flex-col items-center space-y-2">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg ${
                          competitor.isUs ? 'bg-[#12285B]' : 'bg-[#C39A46]'
                        }`}>
                          {competitor.logo}
                        </div>
                        <span className={`text-sm ${competitor.isUs ? 'text-[#12285B]' : 'text-gray-700'}`}>
                          {competitor.name}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Feature Rows */}
              <tbody>
                {features.map((feature, featureIndex) => (
                  <tr key={featureIndex} className="border-t border-gray-200">
                    <td className="p-6 text-gray-900 bg-gray-50">
                      {feature.name}
                    </td>
                    {feature.support.map((hasSupport, compIndex) => (
                      <td key={compIndex} className="p-6 text-center">
                        <div className="flex justify-center">
                          {hasSupport ? (
                            <Check className={`h-6 w-6 ${
                              competitors[compIndex].isUs ? 'text-[#C39A46]' : 'text-gray-800'
                            }`} />
                          ) : (
                            <div className="w-6 h-6"></div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-[#BBDFF] text-lg mb-6">
            Ready to experience the difference? Join our beta program today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#C39A46] hover:bg-[#C39A46]/90 text-white px-8 py-3 rounded-lg transition-colors">
              🚀 Join Beta Waitlist
            </button>
            <button className="border border-[#BBDFF] text-[#BBDFF] hover:bg-[#BBDFF]/10 px-8 py-3 rounded-lg transition-colors">
              📞 Request Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}