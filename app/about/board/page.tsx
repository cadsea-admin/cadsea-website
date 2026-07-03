import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Board of Directors',
  description:
    "Meet the Board of Directors of CADSEA — the governing body responsible for determining the organization's mission and overseeing its operations.",
}

type Member = {
  name: string
  roles: string[]
  bio: string
  image?: string
}

const members: Member[] = [
  {
    name: 'Ken Jiang',
    roles: ['Chair of Board'],
    image: '',
    bio: `Dr. Ken (Ximiao) Jiang is currently working as a Data Science Sr. Manager at Capital One bank, where he is leading the credit card fraud detection model risk management work. He also involved in the validation and risk management of various credit card acquisition, valuation and client management models. Prior to Capital One, Ken worked as a senior quantitative modeler at Fannie Mae for over 4 years, where his primary role was validating and researching various mortgage loan credit risk, prepayment risk and home price related models. Ken holds a PhD degree in engineering and a master's degree in statistics. He has many years of experience working in both academia and industry to use advanced statistical models to address real world problems. In his career, Ken has served multiple leading financial firms and key government agencies, including the OFR of the Treasury, SBA, USDOT, Capital One, Freddie Mac and Fannie Mae.`,
  },
  {
    name: 'Tiger Tang',
    roles: ['Vice Chair of Board', 'President'],
    image: '',
    bio: `Tiger Tang is an experienced Data Science leader with a commitment to building and fostering the Data Science community. Currently serving as a Senior Data Science Manager at CARFAX, where he leads a team specialising in data health, Natural Language Processing (NLP), and forecasting. Tiger believes in the transformative potential of data science, and he is passionate about sharing his knowledge and expertise with others. As a frequent speaker at industry conferences and schools, he enjoys empowering others to leverage data science tools to drive meaningful impact in their organisations and communities.`,
  },
  {
    name: 'Wanli Liu',
    roles: ['Board Member', 'Vice President'],
    bio: `Dr. Liu has 10+ years experience of applying Data Science (specialised in ML & NLP) in various industries including finance, law and biotechnology. He is leading the application of the latest AI technologies in consulting and financial industries with experiences in innovative organisations such as Deloitte and Capital One. He started his DS career as a Data Scientist at NCBI of NIH for biomedical search engine PubMed and volunteered to work on providing DS support for anti racial profiling projects with AAJC. He received BS from Nanjing University in China, MS from University of Rochester, and PhD in Computer Engineering from University of Maryland.`,
  },
  {
    name: 'Richard Xie',
    roles: ['Board Member', 'Former Chair of Board (2023–2024)'],
    bio: `Dr. Richard Xie is currently a Data Science Manager at Amazon and an Adjunct Professor at George Washington University and George Mason University. Richard received his Ph.D. in Operations Research from George Mason University. He has successfully applied machine learning and AI methods to solve large-scale real-life challenges. At Amazon, he leads his team to apply state-of-the-art ML technology to help book lovers find their next great read. Prior to Amazon, he worked at Fannie Mae building information management systems for model risk management, and at Cylera as VP of Data Science, developing real-time streaming ML models for network anomaly detection.`,
  },
  {
    name: 'Kathy Liu',
    roles: ['Board Member', 'Former Chair of Board (2019–2020)'],
    image: '/images/board/kathy-l.jpg',
    bio: `Kathy Liu is a visionary executive with over two decades of leadership across Fortune 500 operations, high-growth startups, IPO execution, and AI-powered transformation. She launched her career at Siemens Shanghai and later joined ChinaCast, progressing to Vice President of a NASDAQ-listed company. After relocating to the U.S., Kathy founded CoreData LLC, delivering strategic data solutions for public and private sector clients. She co-founded CADSEA and became its first Chairwoman, building it into one of North America's most influential tech communities — empowering thousands of AI and data professionals through mentorship, leadership development, and cross-cultural collaboration.`,
  },
  {
    name: 'Simon Zhang',
    roles: ['Board Member', 'Former Chair of Board (2021–2022)'],
    bio: `Jidong (Simon) Zhang is a seasoned quantitative modeler with 14 years of experience in financial risk management. He is currently Vice President at Wells Fargo, responsible for managing model risk related to the firm's $1.4 trillion deposit-taking business. Before Wells Fargo, Mr. Zhang worked at Santander (USA), Freddie Mac and Capital One. He was frequently invited as a keynote speaker at industry conferences and was recognized by GARP as an industry leader, contributing to the 2017 FRM exam questions. He received his M.S. in Statistics and Ph.D. (ABD) in Economics from the University of Georgia.`,
  },
  {
    name: 'Fei Xing',
    roles: ['Board Member'],
    image: '/images/board/fei-xing.jpg',
    bio: `Fei Xing, with a Ph.D. in mathematics, serves as the Director of Analytics at Mathematica, spearheading data science initiatives that enhance operations and bolster decision-making for a diverse array of federal, state, and commercial stakeholders. Fei holds board positions in several non-profit organizations, including the North America Federation of Tsinghua Alumni Association (NAFTHAA), the Monte Jade Washington DC, and the Tsinghua Alumni Association in Greater Washington DC, alongside CADSEA.`,
  },
]

function getInitials(name: string) {
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0][0]
  return parts[0][0] + parts[parts.length - 1][0]
}

function MemberRow({ member }: { member: Member }) {
  const hasImage = !!member.image
  const isPrimary = member.roles.some((r) =>
    ['Chair of Board', 'Vice Chair of Board'].includes(r)
  )

  return (
    <article className="flex flex-col sm:flex-row gap-6 py-10 border-b border-slate-100 last:border-0">
      {/* Photo / Avatar */}
      <div className="shrink-0">
        <div className="relative w-32 h-32 rounded-2xl overflow-hidden">
          {hasImage ? (
            <Image src={member.image!} alt={member.name} fill className="object-cover object-top" />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${
              isPrimary
                ? 'bg-gradient-to-br from-navy to-navy-light'
                : 'bg-gradient-to-br from-slate-200 to-slate-300'
            }`}>
              <span className={`text-3xl font-bold select-none ${
                isPrimary ? 'text-white/80' : 'text-slate-500'
              }`}>
                {getInitials(member.name)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-navy font-bold text-xl mb-2">{member.name}</h3>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {member.roles.map((role) => (
            <span
              key={role}
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                role === 'Chair of Board' || role === 'Vice Chair of Board'
                  ? 'bg-navy text-white'
                  : role.startsWith('Former')
                  ? 'bg-slate-100 text-slate-500'
                  : 'bg-gold/10 text-amber-700'
              }`}
            >
              {role}
            </span>
          ))}
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
      </div>
    </article>
  )
}

export default function BoardPage() {
  return (
    <>
      <section className="bg-navy py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">About Us</span>
          <h1 className="text-white text-4xl font-bold mt-2 mb-3">Board of Directors</h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
            The board of directors is the governing body of CADSEA. Individuals who sit on the board
            are responsible for determining the organization&apos;s mission and purpose as well as
            overseeing the organization&apos;s operations and activities.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {members.map((member) => (
          <MemberRow key={member.name} member={member} />
        ))}
      </div>
    </>
  )
}
