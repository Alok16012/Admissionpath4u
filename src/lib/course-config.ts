export interface CourseConfig {
  slug: string;
  name: string;
  fullName: string;
  description: string;
  duration: string;
  eligibility: string;
  avgSalary: string;
  topRecruiters: string[];
  gradient: string;
  bgLight: string;
  icon: string;
  highlights: string[];
}

export const COURSE_CONFIG: Record<string, CourseConfig> = {
  btech: {
    slug: "btech",
    name: "B.Tech",
    fullName: "Bachelor of Technology",
    description:
      "Bachelor of Technology (B.Tech) is a 4-year undergraduate engineering program that equips students with technical knowledge and practical skills in various engineering disciplines. It is one of the most sought-after degrees in India, opening doors to top tech companies and higher education.",
    duration: "4 Years",
    eligibility: "10+2 with PCM (Physics, Chemistry, Math), Min 50% marks",
    avgSalary: "₹6–18 LPA",
    topRecruiters: ["Google", "Microsoft", "TCS", "Infosys", "Wipro", "Amazon"],
    gradient: "from-blue-700 to-blue-900",
    bgLight: "bg-blue-50",
    icon: "Settings",
    highlights: [
      "Specializations in CS, ECE, Mechanical, Civil & more",
      "Strong placement record at top MNCs",
      "Research & innovation opportunities",
      "Industry internship programs",
    ],
  },
  mbbs: {
    slug: "mbbs",
    name: "MBBS",
    fullName: "Bachelor of Medicine, Bachelor of Surgery",
    description:
      "MBBS is India's premier medical undergraduate degree, spanning 5.5 years including a 1-year internship. It trains students to become licensed medical doctors with expertise in clinical medicine, surgery, and patient care.",
    duration: "5.5 Years (incl. 1yr Internship)",
    eligibility: "10+2 with PCB, NEET-UG qualified",
    avgSalary: "₹8–25 LPA",
    topRecruiters: ["AIIMS", "Apollo Hospitals", "Fortis", "Max Healthcare", "Medanta"],
    gradient: "from-red-700 to-red-900",
    bgLight: "bg-red-50",
    icon: "GraduationCap",
    highlights: [
      "Clinical training at top hospitals",
      "NEET-based merit admission",
      "Diverse specialization options",
      "Government & private hospital opportunities",
    ],
  },
  mba: {
    slug: "mba",
    name: "MBA",
    fullName: "Master of Business Administration",
    description:
      "MBA is a prestigious 2-year postgraduate management degree designed to develop leadership, strategic thinking, and business expertise. It prepares graduates for senior management and entrepreneurial roles across industries.",
    duration: "2 Years",
    eligibility: "Any Bachelor's Degree, CAT/XAT/MAT/GMAT score",
    avgSalary: "₹10–30 LPA",
    topRecruiters: ["McKinsey", "BCG", "Deloitte", "Goldman Sachs", "Flipkart", "Amazon"],
    gradient: "from-purple-700 to-purple-900",
    bgLight: "bg-purple-50",
    icon: "Briefcase",
    highlights: [
      "Specializations: Finance, Marketing, HR, Operations",
      "Industry live projects & case studies",
      "Top B-school placements",
      "Global exchange programs",
    ],
  },
  design: {
    slug: "design",
    name: "Design",
    fullName: "Bachelor / Master of Design",
    description:
      "Design courses cover the intersection of creativity, technology, and user experience. From fashion and graphic design to UX/UI and product design, these programs nurture creative thinkers who shape the visual and functional world around us.",
    duration: "4 Years (UG) / 2 Years (PG)",
    eligibility: "10+2 (any stream), Aptitude/Portfolio test",
    avgSalary: "₹5–20 LPA",
    topRecruiters: ["Adobe", "Flipkart", "Myntra", "Zara", "Raymond", "Designit"],
    gradient: "from-pink-600 to-rose-800",
    bgLight: "bg-pink-50",
    icon: "Palette",
    highlights: [
      "Fashion, Graphic, UX/UI, Product Design",
      "Portfolio-based learning",
      "Industry collaborations & live briefs",
      "International design exposure",
    ],
  },
  law: {
    slug: "law",
    name: "Law",
    fullName: "Bachelor / Master of Laws",
    description:
      "Law programs train students in legal principles, judicial systems, and advocacy skills. With increasing demand for legal professionals in corporates, litigation, and public policy, a law degree opens doors to a respected and impactful career.",
    duration: "5 Years (BA LLB) / 3 Years (LLB)",
    eligibility: "10+2 (BA LLB) or Any Degree (LLB), CLAT/AILET score",
    avgSalary: "₹6–25 LPA",
    topRecruiters: ["AZB & Partners", "Cyril Amarchand", "JSA", "Supreme Court", "Khaitan & Co"],
    gradient: "from-amber-700 to-yellow-900",
    bgLight: "bg-amber-50",
    icon: "Gavel",
    highlights: [
      "Corporate Law, Litigation, IPR specializations",
      "Moot court & legal internships",
      "Top law firm placements",
      "Judiciary & civil services pathway",
    ],
  },
  "abroad-mbbs": {
    slug: "abroad-mbbs",
    name: "Abroad MBBS",
    fullName: "MBBS Abroad",
    description:
      "Studying MBBS abroad is a cost-effective alternative for students who miss out on Indian MBBS seats. Countries like Russia, Georgia, Kazakhstan, and Ukraine offer globally recognized medical degrees at affordable fees with English-medium instruction.",
    duration: "5–6 Years",
    eligibility: "10+2 with PCB, NEET-UG qualified, Min 50% marks",
    avgSalary: "₹8–20 LPA (after returning to India)",
    topRecruiters: ["Indian Hospitals (after FMG Exam)", "WHO-listed hospitals globally"],
    gradient: "from-teal-600 to-cyan-800",
    bgLight: "bg-teal-50",
    icon: "Plane",
    highlights: [
      "NMC & WHO recognized universities",
      "No Donation / Capitation fees",
      "English-medium instruction",
      "Low cost compared to private MBBS in India",
    ],
  },
};

export const ALL_COURSES = Object.values(COURSE_CONFIG);
