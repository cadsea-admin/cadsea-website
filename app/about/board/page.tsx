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
    image: '/images/board/ken_jiang.jpg',
    bio: `Dr. Ken (Ximiao) Jiang is currently working as a Data Science Sr. Manager at the Capital One bank, where he is leading the credit card fraud detection model risk management work. He also involved in the validation and risk management of various credit card acquisition, valuation and client management models. Prior to Capital One, Ken worked as a senior quantitative modeler at Fannie Mae for over 4 years, where his primary role was validating and researching various mortgage loan credit risk, prepayment risk and home price related models. Ken holds a PhD degree in engineering and a master's degree in statistics. He has many years of experience working in both academia and industry to use advanced statistical models to address real world problems. In his career, Ken has served multiple leading financial firms and key government agencies, includes the OFR of the Treasury, SBA, USDOT, Capital One, Freddie Mac and Fannie Mae, etc.`,
  },
  {
    name: 'Tiger Tang',
    roles: ['Vice Chair of Board', 'President'],
    image: '/images/board/TigerTang.png',
    bio: `Tiger Tang is an experienced Data Science leader with a commitment to building and fostering the Data Science community. Currently serving as a Senior Data Science Manager at CARFAX, where he leads a team specialising in data health, Natural Language Processing (NLP), and forecasting. Tiger believes in the transformative potential of data science, and he is passionate about sharing his knowledge and expertise with others. As a frequent speaker at industry conferences and schools, he enjoys empowering others to leverage data science tools to drive meaningful impact in their organisations and communities.`,
  },
  {
    name: 'Wanli Liu',
    roles: ['Board Member', 'Vice President'],
    image: '/images/board/Wanli.jpg',
    bio: `Dr. Liu has 10+ years experience of applying Data Science (specialised in ML & NLP) in various industries including finance, law and biotechnology. He is leading the application of the latest AI technologies in consulting and financial industries with experiences in innovative organisations such as Deloitte and Capital One. He started DS career as a Data Scientist at NCBI of NIH for biomedical search engine PubMed and volunteered to work on providing DS support for anti racial profiling projects with AAJC. He received BS from Nanjing University in China, MS from University of Rochester, and PhD in Computer Engineering from University of Maryland.`,
  },
  {
    name: 'Richard Xie',
    roles: ['Board Member', 'Former Chair of Board (2023–2024)'],
    image: '/images/board/Richard.jpg',
    bio: `Dr. Richard Xie is currently a Data Science Manager at Amazon. He is also a leading advocate in the data science community and an Adjunct Professor at George Washington University and George Mason University. Richard received his Ph.D. in Operations Research from George Mason University. Dr. Xie has successfully applied machine learning and artificial intelligence methods to solve large-scale real life challenges. At Amazon, he leads his team to apply the state-of-arts ML technology to helping book lovers find the next best books to read. Prior to that, he worked at Fannie Mae leading the effort to build start-of-the-art information management systems to optimize the work flow in model risk management. Before joining Fannie Mae, Richard worked at Cylera as the VP of Data Science, leading a data science team to develop and deploy a robust real-time computation system and a suite of streaming machine learning models to monitor and detect network malicious anomalies. He also has extensive experience in leveraging data science methods in IoT device profiling and categorization.`,
  },
  {
    name: 'Kathy Liu',
    roles: ['Board Member', 'Former Chair of Board (2019–2020)'],
    image: '/images/board/kathy-l.jpg',
    bio: `Kathy Liu is a visionary executive with over two decades of leadership across Fortune 500 operations, high-growth startups, IPO execution, and AI-powered transformation. She launched her career at Siemens Shanghai, where she led multi-province GSM infrastructure deployments. Kathy later joined ChinaCast, progressing from PMO Manager to Vice President of a NASDAQ-listed company, where she led a 100+ person team and played a pivotal role in its successful public offering and international growth. After relocating to the U.S., Kathy founded CoreData LLC, delivering strategic data solutions, predictive analytics, and BI systems for public and private sector clients. In parallel, she co-founded and became the first Chairwoman of CADSEA, building it from the ground up into one of North America's most influential tech communities — empowering thousands of AI and data professionals through mentorship, leadership development, and cross-cultural collaboration.`,
  },
  {
    name: 'Simon Zhang',
    roles: ['Board Member', 'Former Chair of Board (2021–2022)'],
    image: '/images/board/JidongZhang.PNG',
    bio: `Jidong (Simon) Zhang is a seasoned quantitative risk professional with over 21 years of experience in financial risk management, quantitative modeling, and model governance. He currently serves as an Executive Director at Wells Fargo, where he leads model risk oversight and interest rate risk management for the firm's $1.4 trillion deposit-taking business. Prior to Wells Fargo, Mr. Zhang held leadership roles at Santander Bank US, Freddie Mac, and Capital One. He has been frequently invited to speak at industry conferences as a keynote speaker on topics related to financial risk, quantitative modeling, and regulatory governance. Mr. Zhang earned the FRM designation in 2014 and was invited by GARP to contribute to the development of the 2017 FRM examination. He received an M.S. in Statistics and pursued Ph.D. studies (ABD) in Economics at the University of Georgia. Beyond his professional career, he serves as Event Chair of Asian Connection – Wells Fargo DC Chapter, Board Member of TCFA Washington DC chapter, and is a Founding Member of CADSEA (2019–Present).`,
  },
  {
    name: 'Fei Xing',
    roles: ['Board Member'],
    image: '/images/board/fei-xing.jpg',
    bio: `Dr. Fei Xing is a data science and artificial intelligence leader with more than 10 years of experience translating mathematical rigor and emerging technologies into measurable organizational impact. Holding a Ph.D. in Mathematics, he specializes in AI strategy, digital transformation, machine learning, and integrating large language models into business and operational workflows. Dr. Xing is the Founder and Principal AI Strategist of Elongevity, LLC. Previously, as a Director at Mathematica, he led a multidisciplinary analytics practice of more than 90 data scientists and technical professionals. As a CADSEA board member, Dr. Xing is committed to strengthening connections across academia and industry and supporting the next generation of data and technology professionals. He also serves in leadership roles with NAFTHAA, Monte Jade Greater Washington DC, Hua Sports, and the Tsinghua alumni community.`,
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
