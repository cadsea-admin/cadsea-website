import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Advisory Committee',
  description:
    'The Advisory Committee brings unique knowledge and skills to augment the Board of Directors and help guide CADSEA more effectively.',
}

type Advisor = {
  name: string
  title: string
  org: string
  tags: string[]
  bio: string
  image?: string
}

const advisors: Advisor[] = [
  {
    name: 'Lisa Wu, CFA, CPA, FRM',
    image: '/images/advisory/lisa_wu.jpg',
    title: 'Chief Risk Officer',
    org: 'Federal Home Loan Bank of Topeka',
    tags: ['Risk Management', 'AI Governance', 'Financial Leadership'],
    bio: `Lisa Wu, CFA, CPA, FRM serves as Chief Risk Officer at the Federal Home Loan Bank of Topeka. With more than 25 years of leadership experience across financial services, risk management, analytics, and AI governance, she has held senior leadership positions at PenFed Credit Union, Capital One, and Fannie Mae. Lisa is a recognized expert in enterprise risk, model governance, and data-driven decision making. She advises CADSEA on leadership development, responsible AI, and the future of analytics-driven organizations.`,
  },
  {
    name: 'Kathy Sheng, PCC',
    image: '/images/advisory/kathy-sheng.png',
    title: 'Executive Coach, Investor & Board Advisor',
    org: '',
    tags: ['Leadership Development', 'Entrepreneurship', 'Executive Coaching'],
    bio: `Kathy Sheng is an executive coach, investor, and leadership advisor with more than 20 years of experience leading teams and developing talent across corporate, entrepreneurial, and nonprofit sectors. An ICF Professional Certified Coach and Georgetown-certified executive coach, she specializes in leadership development, executive presence, career growth, and cross-cultural effectiveness. Kathy also advises and invests in emerging ventures, bringing a unique combination of executive leadership, coaching, and entrepreneurial experience to support the next generation of leaders.`,
  },
  {
    name: 'Mark An',
    title: 'Vice President, Head of Enterprise Models',
    org: 'Fannie Mae',
    tags: ['Artificial Intelligence', 'Data Science', 'Enterprise Analytics'],
    bio: `Mark An is Vice President and Head of Enterprise Models at Fannie Mae, where he leads enterprise-wide quantitative modeling, analytics, and model governance initiatives. With deep expertise in artificial intelligence, machine learning, predictive analytics, and enterprise risk management, Mark has spent his career applying advanced data science to solve complex business and financial challenges. He is a recognized leader in the analytics community and an active mentor dedicated to helping the next generation of technology and data professionals develop both technical excellence and strategic leadership capabilities.`,
  },
  {
    name: 'Dr. Chao Wu',
    image: '/images/advisory/wu chao.jpg',
    title: 'Maryland State Delegate',
    org: '',
    tags: ['Public Policy', 'STEM Education', 'Community Leadership'],
    bio: `Chao Wu is a Maryland State Delegate, data scientist, and community leader whose work bridges technology, education, and public service. Prior to serving in the Maryland General Assembly, he served on the Howard County Board of Education and became its first Asian American Board Chair. Holding a Ph.D. in Electrical and Computer Engineering, Dr. Wu has built a distinguished career in data science and AI while advocating for STEM education, workforce development, and civic engagement. He is committed to empowering future leaders through innovation, education, and public service.`,
  },
]

function getInitials(name: string) {
  const parts = name.replace(/[,].*/, '').trim().split(' ')
  if (parts.length === 1) return parts[0][0]
  return parts[0][0] + parts[parts.length - 1][0]
}

export default function AdvisoryPage() {
  return (
    <>
      <section className="bg-navy py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">About Us</span>
          <h1 className="text-white text-4xl font-bold mt-2 mb-3">Advisory Committee</h1>
          <p className="text-white/60 text-lg max-w-3xl leading-relaxed">
            The Advisory Committee is a collection of individuals who bring unique knowledge and skills
            which augment the knowledge and skills of the formal board of directors in order to more
            effectively guide the organization. The advisory committee does not have formal authority to
            govern the organization — rather, it serves to make recommendations and provide key
            information and materials to the board of directors.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {advisors.map((advisor) => (
          <article
            key={advisor.name}
            className="flex flex-col sm:flex-row gap-6 py-10 border-b border-slate-100 last:border-0"
          >
            {/* Avatar */}
            <div className="shrink-0">
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden">
                {advisor.image ? (
                  <Image src={advisor.image} alt={advisor.name} fill className="object-cover object-top" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                    <span className="text-3xl font-bold text-slate-500 select-none">
                      {getInitials(advisor.name)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-navy font-bold text-xl mb-0.5">{advisor.name}</h3>
              <p className="text-muted text-sm mb-3">
                {advisor.title}{advisor.org ? `, ${advisor.org}` : ''}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {advisor.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-gold/10 text-amber-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{advisor.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
