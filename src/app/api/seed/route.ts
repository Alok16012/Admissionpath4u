import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function slug(name: string) {
  return name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

const SEED_COLLEGES = [
  // B.TECH
  {
    name: "IIT Delhi",
    slug: slug("IIT Delhi"),
    state: "Delhi",
    city: "New Delhi",
    courses: ["B.Tech", "M.Tech", "PhD"],
    fees: 200000,
    description: "Indian Institute of Technology Delhi is one of India's premier engineering institutions offering world-class education in technology, science, and management. Known for its rigorous curriculum and top-tier placements.",
    highestPackage: 60,
    averagePackage: 18,
  },
  {
    name: "NIT Trichy",
    slug: slug("NIT Trichy"),
    state: "Tamil Nadu",
    city: "Tiruchirappalli",
    courses: ["B.Tech", "M.Tech", "MBA"],
    fees: 150000,
    description: "National Institute of Technology Tiruchirappalli is one of the top NITs in India, renowned for its academic excellence and strong alumni network across global tech companies.",
    highestPackage: 45,
    averagePackage: 14,
  },
  {
    name: "VIT Vellore",
    slug: slug("VIT Vellore"),
    state: "Tamil Nadu",
    city: "Vellore",
    courses: ["B.Tech", "M.Tech", "MBA", "MCA"],
    fees: 175000,
    description: "Vellore Institute of Technology is a deemed university offering top engineering programs with excellent industry connections and a vibrant campus life.",
    highestPackage: 44,
    averagePackage: 8,
  },
  {
    name: "BITS Pilani",
    slug: slug("BITS Pilani"),
    state: "Rajasthan",
    city: "Pilani",
    courses: ["B.Tech", "B.E.", "M.Tech", "MBA"],
    fees: 250000,
    description: "Birla Institute of Technology and Science, Pilani is a prestigious private engineering university famous for its Practice School program and strong industry-academia connect.",
    highestPackage: 50,
    averagePackage: 16,
  },
  {
    name: "DTU Delhi",
    slug: slug("DTU Delhi"),
    state: "Delhi",
    city: "New Delhi",
    courses: ["B.Tech", "M.Tech", "MBA"],
    fees: 85000,
    description: "Delhi Technological University (formerly DCE) is one of Delhi's top engineering colleges offering affordable yet quality technical education with strong corporate placements.",
    highestPackage: 40,
    averagePackage: 12,
  },
  {
    name: "SRM Institute of Science and Technology",
    slug: slug("SRM Institute of Science and Technology"),
    state: "Tamil Nadu",
    city: "Chennai",
    courses: ["B.Tech", "M.Tech", "MBA", "BCA"],
    fees: 200000,
    description: "SRM Institute is a top-ranked private university offering diverse engineering programs with state-of-the-art facilities and strong global placement support.",
    highestPackage: 35,
    averagePackage: 7,
  },

  // MBBS
  {
    name: "AIIMS New Delhi",
    slug: slug("AIIMS New Delhi"),
    state: "Delhi",
    city: "New Delhi",
    courses: ["MBBS", "MD", "MS", "PhD"],
    fees: 5000,
    description: "All India Institute of Medical Sciences, New Delhi is the most prestigious medical institution in India, offering world-class healthcare education and research opportunities.",
    highestPackage: 25,
    averagePackage: 15,
  },
  {
    name: "JIPMER Puducherry",
    slug: slug("JIPMER Puducherry"),
    state: "Puducherry",
    city: "Puducherry",
    courses: ["MBBS", "MD", "MS"],
    fees: 10000,
    description: "Jawaharlal Institute of Postgraduate Medical Education and Research is a premier central government medical college offering top-quality medical education with low fees.",
    highestPackage: 22,
    averagePackage: 12,
  },
  {
    name: "Maulana Azad Medical College",
    slug: slug("Maulana Azad Medical College"),
    state: "Delhi",
    city: "New Delhi",
    courses: ["MBBS", "MD", "MS"],
    fees: 25000,
    description: "Maulana Azad Medical College is one of India's oldest and most renowned government medical colleges, known for its clinical training and research infrastructure.",
    highestPackage: 20,
    averagePackage: 10,
  },
  {
    name: "CMC Vellore",
    slug: slug("CMC Vellore"),
    state: "Tamil Nadu",
    city: "Vellore",
    courses: ["MBBS", "MD", "MS", "Nursing"],
    fees: 120000,
    description: "Christian Medical College, Vellore is a globally recognized medical institution known for its commitment to service, excellence in medical education, and groundbreaking research.",
    highestPackage: 28,
    averagePackage: 14,
  },
  {
    name: "Grant Medical College Mumbai",
    slug: slug("Grant Medical College Mumbai"),
    state: "Maharashtra",
    city: "Mumbai",
    courses: ["MBBS", "MD", "MS"],
    fees: 40000,
    description: "Grant Medical College is one of Mumbai's oldest government medical colleges, affiliated with JJ Hospital, providing excellent clinical training in a large hospital setting.",
    highestPackage: 18,
    averagePackage: 10,
  },
  {
    name: "Kasturba Medical College Mangalore",
    slug: slug("Kasturba Medical College Mangalore"),
    state: "Karnataka",
    city: "Mangalore",
    courses: ["MBBS", "MD", "MS"],
    fees: 700000,
    description: "Kasturba Medical College is a premier private medical institution part of Manipal Academy, offering world-class MBBS education with strong clinical exposure.",
    highestPackage: 20,
    averagePackage: 12,
  },

  // MBA
  {
    name: "IIM Ahmedabad",
    slug: slug("IIM Ahmedabad"),
    state: "Gujarat",
    city: "Ahmedabad",
    courses: ["MBA", "PGPM", "PhD"],
    fees: 2500000,
    description: "Indian Institute of Management Ahmedabad is India's top business school, consistently ranked among the best globally. Known for its case-based learning and record-breaking placements.",
    highestPackage: 120,
    averagePackage: 35,
  },
  {
    name: "IIM Bangalore",
    slug: slug("IIM Bangalore"),
    state: "Karnataka",
    city: "Bangalore",
    courses: ["MBA", "PGPM", "Executive MBA"],
    fees: 2400000,
    description: "IIM Bangalore is one of India's top business schools, known for its entrepreneurship culture, strong faculty, and outstanding corporate placements.",
    highestPackage: 110,
    averagePackage: 32,
  },
  {
    name: "ISB Hyderabad",
    slug: slug("ISB Hyderabad"),
    state: "Telangana",
    city: "Hyderabad",
    courses: ["MBA", "PGP", "Executive MBA"],
    fees: 3000000,
    description: "Indian School of Business offers a globally acclaimed one-year MBA program with an international faculty and exceptional placement outcomes at top MNCs.",
    highestPackage: 100,
    averagePackage: 30,
  },
  {
    name: "XLRI Jamshedpur",
    slug: slug("XLRI Jamshedpur"),
    state: "Jharkhand",
    city: "Jamshedpur",
    courses: ["MBA", "BM", "HRM"],
    fees: 2000000,
    description: "XLRI Xavier School of Management is one of India's oldest and most respected business schools, known for its Human Resources and Business Management programs.",
    highestPackage: 80,
    averagePackage: 28,
  },
  {
    name: "FMS Delhi University",
    slug: slug("FMS Delhi University"),
    state: "Delhi",
    city: "New Delhi",
    courses: ["MBA", "Executive MBA"],
    fees: 50000,
    description: "Faculty of Management Studies, Delhi University offers one of India's best MBA programs at the most affordable fees, making it the best ROI business school in India.",
    highestPackage: 75,
    averagePackage: 25,
  },
  {
    name: "MDI Gurgaon",
    slug: slug("MDI Gurgaon"),
    state: "Haryana",
    city: "Gurugram",
    courses: ["MBA", "PGPM", "Executive MBA"],
    fees: 1950000,
    description: "Management Development Institute Gurgaon is a top-10 business school in India known for its strong industry connections and excellent national and international placements.",
    highestPackage: 70,
    averagePackage: 22,
  },

  // DESIGN
  {
    name: "NID Ahmedabad",
    slug: slug("NID Ahmedabad"),
    state: "Gujarat",
    city: "Ahmedabad",
    courses: ["Design", "B.Des", "M.Des"],
    fees: 250000,
    description: "National Institute of Design, Ahmedabad is India's most prestigious design school, offering programs in industrial, communication, and textile design with a world-renowned faculty.",
    highestPackage: 25,
    averagePackage: 10,
  },
  {
    name: "NIFT Delhi",
    slug: slug("NIFT Delhi"),
    state: "Delhi",
    city: "New Delhi",
    courses: ["Design", "Fashion Design", "B.Des", "M.Des"],
    fees: 180000,
    description: "National Institute of Fashion Technology Delhi is India's leading fashion design institution, shaping careers in fashion, accessories, textile, and apparel design.",
    highestPackage: 20,
    averagePackage: 8,
  },
  {
    name: "Symbiosis Institute of Design",
    slug: slug("Symbiosis Institute of Design"),
    state: "Maharashtra",
    city: "Pune",
    courses: ["Design", "B.Des", "Fashion Design"],
    fees: 350000,
    description: "SID Pune is one of the premier private design schools in India offering industry-aligned programs in communication design, fashion, and industrial design.",
    highestPackage: 18,
    averagePackage: 7,
  },
  {
    name: "Pearl Academy Delhi",
    slug: slug("Pearl Academy Delhi"),
    state: "Delhi",
    city: "New Delhi",
    courses: ["Design", "Fashion Design", "Media", "Business"],
    fees: 400000,
    description: "Pearl Academy is a creative institution focused on design, fashion, media and business, known for international collaborations and strong industry placements.",
    highestPackage: 15,
    averagePackage: 6,
  },
  {
    name: "MIT Institute of Design Pune",
    slug: slug("MIT Institute of Design Pune"),
    state: "Maharashtra",
    city: "Pune",
    courses: ["Design", "B.Des", "M.Des"],
    fees: 280000,
    description: "MIT Institute of Design offers innovative design programs with a focus on sustainability, technology integration, and design thinking across multiple disciplines.",
    highestPackage: 14,
    averagePackage: 6,
  },

  // LAW
  {
    name: "National Law School Bangalore",
    slug: slug("National Law School Bangalore"),
    state: "Karnataka",
    city: "Bangalore",
    courses: ["Law", "BA LLB", "LLM"],
    fees: 250000,
    description: "National Law School of India University is the top-ranked law school in India, consistently producing India's finest legal minds, judges, and corporate lawyers.",
    highestPackage: 30,
    averagePackage: 18,
  },
  {
    name: "NALSAR University of Law",
    slug: slug("NALSAR University of Law"),
    state: "Telangana",
    city: "Hyderabad",
    courses: ["Law", "BA LLB", "LLM", "MBA"],
    fees: 200000,
    description: "NALSAR University of Law Hyderabad is ranked among the top NLUs in India, known for its rigorous legal education and strong placements at top law firms.",
    highestPackage: 25,
    averagePackage: 14,
  },
  {
    name: "NLU Delhi",
    slug: slug("NLU Delhi"),
    state: "Delhi",
    city: "New Delhi",
    courses: ["Law", "BA LLB", "LLM"],
    fees: 220000,
    description: "National Law University Delhi is a premier NLU known for its exceptional academic faculty, mooting culture, and top placements at leading law firms and corporations.",
    highestPackage: 28,
    averagePackage: 16,
  },
  {
    name: "Symbiosis Law School Pune",
    slug: slug("Symbiosis Law School Pune"),
    state: "Maharashtra",
    city: "Pune",
    courses: ["Law", "BA LLB", "BBA LLB", "LLM"],
    fees: 300000,
    description: "Symbiosis Law School is a top private law school in India offering diverse law programs with strong industry exposure and international exchange opportunities.",
    highestPackage: 22,
    averagePackage: 10,
  },
  {
    name: "Christ University School of Law",
    slug: slug("Christ University School of Law"),
    state: "Karnataka",
    city: "Bangalore",
    courses: ["Law", "BA LLB", "BBA LLB", "LLM"],
    fees: 180000,
    description: "Christ University School of Law offers a vibrant academic environment with strong moot court training, legal aid clinics, and excellent internship opportunities.",
    highestPackage: 18,
    averagePackage: 8,
  },

  // ABROAD MBBS
  {
    name: "Tbilisi State Medical University",
    slug: slug("Tbilisi State Medical University"),
    state: "Georgia",
    city: "Tbilisi",
    courses: ["Abroad MBBS", "MBBS", "MD"],
    fees: 500000,
    description: "Tbilisi State Medical University is one of Georgia's oldest and most prestigious medical universities, recognized by NMC and WHO, offering English-medium MBBS at affordable costs.",
    highestPackage: 15,
    averagePackage: 8,
  },
  {
    name: "Kazakh-Russian Medical University",
    slug: slug("Kazakh-Russian Medical University"),
    state: "Kazakhstan",
    city: "Almaty",
    courses: ["Abroad MBBS", "MBBS", "MD"],
    fees: 400000,
    description: "KRMU Almaty is a top-ranked medical university in Kazakhstan offering NMC-recognized MBBS programs in English with modern hospital infrastructure and affordable fees.",
    highestPackage: 12,
    averagePackage: 7,
  },
  {
    name: "Vinnitsa National Medical University",
    slug: slug("Vinnitsa National Medical University"),
    state: "Ukraine",
    city: "Vinnytsia",
    courses: ["Abroad MBBS", "MBBS", "MD"],
    fees: 350000,
    description: "VNMU Ukraine is a renowned state medical university offering NMC-approved MBBS education with clinical training at large teaching hospitals at very affordable fees.",
    highestPackage: 12,
    averagePackage: 7,
  },
  {
    name: "Belarusian State Medical University",
    slug: slug("Belarusian State Medical University"),
    state: "Belarus",
    city: "Minsk",
    courses: ["Abroad MBBS", "MBBS", "MD"],
    fees: 380000,
    description: "BSMU is one of Belarus's top medical institutions offering English-medium MBBS programs with state-of-the-art facilities and high-quality clinical training.",
    highestPackage: 13,
    averagePackage: 7,
  },
  {
    name: "Ternopil National Medical University",
    slug: slug("Ternopil National Medical University"),
    state: "Ukraine",
    city: "Ternopil",
    courses: ["Abroad MBBS", "MBBS"],
    fees: 300000,
    description: "TNMU is a well-known NMC-recognized medical university in Ukraine, popular among Indian students for its strong clinical training, English medium, and affordable fee structure.",
    highestPackage: 11,
    averagePackage: 6,
  },
  {
    name: "Davao Medical School Foundation",
    slug: slug("Davao Medical School Foundation"),
    state: "Philippines",
    city: "Davao",
    courses: ["Abroad MBBS", "MBBS", "MD"],
    fees: 600000,
    description: "DMSF Philippines is a leading medical college offering WHO-recognized MD (equivalent to MBBS) programs in English with excellent clinical exposure.",
    highestPackage: 14,
    averagePackage: 8,
  },
];

const SEED_EXAMS = [
  {
    name: "JEE Main 2025",
    slug: "jee-main-2025",
    date: new Date("2025-04-15"),
    description: "Joint Entrance Examination (JEE) Main is the gateway to admission in NITs, IIITs, and other centrally funded technical institutions. It is also the qualifying exam for JEE Advanced (IITs). The exam is conducted in two sessions — January and April.",
    eligibility: "10+2 or equivalent with PCM. Minimum 75% marks (65% for SC/ST). Age limit: must have been born on or after October 1, 2000.",
    listing_mode: "Online",
  },
  {
    name: "NEET UG 2025",
    slug: "neet-ug-2025",
    date: new Date("2025-05-04"),
    description: "National Eligibility cum Entrance Test (NEET-UG) is the single entrance exam for admission to MBBS, BDS, BAMS, BSMS, BUMS, and BHMS courses in all medical colleges across India. Conducted by NTA, it is the most competitive medical entrance exam in India.",
    eligibility: "10+2 with PCB (Physics, Chemistry, Biology). Minimum 50% aggregate marks (40% for SC/ST/OBC). Age: 17-25 years (relaxation for reserved categories).",
    listing_mode: "Offline",
  },
  {
    name: "CAT 2025",
    slug: "cat-2025",
    date: new Date("2025-11-30"),
    description: "Common Admission Test (CAT) is India's premier MBA entrance examination, conducted by the IIMs on a rotational basis. CAT scores are accepted by all IIMs and over 1,200 B-schools across India. It tests Verbal Ability, Data Interpretation, Logical Reasoning, and Quantitative Aptitude.",
    eligibility: "Bachelor's degree in any discipline with minimum 50% marks (45% for SC/ST/PWD) from a recognized university. Final year students can also apply.",
    listing_mode: "Online",
  },
  {
    name: "CLAT 2025",
    slug: "clat-2025",
    date: new Date("2025-12-01"),
    description: "Common Law Admission Test (CLAT) is a centralized national entrance test for admission to undergraduate (BA LLB) and postgraduate (LLM) law programs offered by 23 National Law Universities across India. It tests English, GK, Legal Reasoning, Logical Reasoning, and Maths.",
    eligibility: "For UG: 10+2 with minimum 45% marks (40% for SC/ST). For PG: LLB with minimum 50% marks. Age: No upper limit for UG from 2023 onwards.",
    listing_mode: "Offline",
  },
  {
    name: "NIFT Entrance Test 2025",
    slug: "nift-entrance-test-2025",
    date: new Date("2026-01-25"),
    description: "NIFT Entrance Test is conducted by the National Institute of Fashion Technology for admission to its B.Des, M.Des, B.FTech, and MFM programs. The test includes a Creative Ability Test (CAT) and General Ability Test (GAT), along with a Situation Test for B.Des programs.",
    eligibility: "10+2 in any stream from a recognized board. For B.FTech: PCM background preferred. No specific percentage requirement.",
    listing_mode: "Online",
  },
  {
    name: "GATE 2026",
    slug: "gate-2026",
    date: new Date("2026-02-08"),
    description: "Graduate Aptitude Test in Engineering (GATE) is a national-level exam for admission to M.Tech/MS/PhD programs at IITs, NITs, and IIITs. GATE scores are also used by PSUs like BHEL, ONGC, NTPC, and IOCL for recruitment to engineering positions.",
    eligibility: "Bachelor's degree in Engineering/Technology/Architecture or Master's degree in Science/Mathematics/Statistics/Computer Applications. Final year students can apply.",
    listing_mode: "Online",
  },
];

const SEED_BLOGS = [
  {
    title: "Top 10 Engineering Colleges in India 2025: Complete Rankings",
    slug: "top-10-engineering-colleges-india-2025",
    content: `Choosing the right engineering college is one of the most important decisions in a student's life. With hundreds of options available across India, it can be overwhelming to narrow down your choices. This comprehensive guide covers the top 10 engineering colleges in India for 2025 based on placement records, faculty quality, research output, and infrastructure.

## 1. IIT Bombay
Indian Institute of Technology Bombay consistently ranks as one of India's top engineering institutions. With an average placement package exceeding ₹20 LPA and the highest packages crossing ₹1 crore, IIT Bombay attracts the best engineering talent in the country.

## 2. IIT Delhi
Located in the capital, IIT Delhi is renowned for its cutting-edge research and excellent industry connections. The institution has strong ties with both Indian and international tech giants.

## 3. IIT Madras
Ranked #1 by NIRF for several years, IIT Madras stands out for its research ecosystem and entrepreneurship culture. The institution has a thriving startup incubator.

## 4. IIT Kharagpur
India's oldest IIT, IIT Kharagpur offers the widest range of engineering disciplines and is known for producing industry leaders and Nobel laureates.

## 5. BITS Pilani
The top private engineering college in India, BITS Pilani is known for its Practice School program, which gives students real industry experience at leading companies.

## 6. NIT Trichy
The top-ranked National Institute of Technology, NIT Trichy offers excellent engineering education with placement records rivaling several IITs.

## 7. VIT Vellore
One of India's most sought-after private engineering colleges, VIT is known for its international collaborations, diverse student community, and consistent placement record.

## 8. DTU Delhi
Delhi Technological University offers quality engineering education at an affordable cost, making it a top choice for Delhi students.

## 9. SRM Institute of Science and Technology
SRM is known for its industry-oriented curriculum and massive campus infrastructure. It attracts over 400 companies for campus placements.

## 10. Manipal Institute of Technology
MIT Manipal combines academic excellence with a vibrant campus culture. It consistently achieves 80%+ placement rates across all engineering disciplines.`,
    excerpt: "Discover India's top 10 engineering colleges for 2025 ranked by placements, faculty, and infrastructure. From IITs to top private colleges — find your perfect fit.",
    author: "Admission Expert",
    main_image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
  },
  {
    title: "How to Crack JEE Main 2025 in First Attempt: Complete Strategy",
    slug: "how-to-crack-jee-main-2025-first-attempt",
    content: `JEE Main is one of the most competitive engineering entrance exams in India, with over 10 lakh students appearing each year for a limited number of seats. Cracking it in the first attempt requires smart planning, consistent effort, and the right strategy.

## Understanding the Exam Pattern

JEE Main consists of three subjects: Physics, Chemistry, and Mathematics. The paper has 90 questions (30 per subject) with both MCQ and numerical answer type questions. Total marks: 300.

## Subject-wise Strategy

### Physics
- Focus on Mechanics, Electrostatics, Optics, and Modern Physics — these form ~60% of questions
- Practice numerical problems daily
- Solve previous year papers topic-wise

### Chemistry
- Organic Chemistry reactions are the most important — memorize named reactions
- Physical Chemistry requires strong Mathematics fundamentals
- NCERT is gold for Inorganic Chemistry

### Mathematics
- Calculus, Coordinate Geometry, and Algebra are high-weightage topics
- Practice at least 50 problems daily
- Focus on accuracy over speed initially

## Preparation Timeline

**6 Months Before Exam:**
- Complete NCERT thoroughly
- Start solving JEE Main previous year papers

**3 Months Before:**
- Full mock tests every week
- Identify and strengthen weak areas

**1 Month Before:**
- Daily revision of formulas and reactions
- Maintain error log and review mistakes

## Important Tips
1. Solve at least 5 full mock tests before the exam
2. Manage time: aim for 50-55 minutes per subject
3. Attempt questions you are 100% sure about first
4. Leave questions where you might get negative marks`,
    excerpt: "Complete study strategy to crack JEE Main 2025 in your first attempt — subject-wise tips, time management, and mock test strategy from exam experts.",
    author: "JEE Expert",
    main_image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
  },
  {
    title: "MBBS vs BDS: Which Medical Career is Right for You?",
    slug: "mbbs-vs-bds-which-is-better",
    content: `Both MBBS (Bachelor of Medicine and Bachelor of Surgery) and BDS (Bachelor of Dental Surgery) are prestigious medical degrees in India. If you've qualified NEET and are confused between the two, this detailed comparison will help you make an informed decision.

## MBBS at a Glance
- Duration: 5.5 years (including 1-year internship)
- Seats: ~1.02 lakh seats across government and private colleges
- Career: Physician, Surgeon, Specialist Doctor
- Average Salary: ₹8–25 LPA (government) to ₹50+ LPA (private specialists)

## BDS at a Glance
- Duration: 5 years (including 1-year internship)
- Seats: ~26,000 seats
- Career: Dentist, Orthodontist, Oral Surgeon
- Average Salary: ₹5–15 LPA, can go up to ₹50+ LPA for specialists

## Key Differences

| Factor | MBBS | BDS |
|--------|------|-----|
| Scope | Broader medical scope | Focused on oral health |
| Admission | Highly competitive | Comparatively easier |
| Fees | ₹5K–24L (Govt to Private) | ₹2L–20L |
| Specialization Options | 50+ MD/MS specialties | 9 MDS specialties |
| Govt Job Opportunities | More | Fewer |

## Which Should You Choose?

**Choose MBBS if:**
- You want a wide scope of practice
- You want more specialization options
- Your NEET rank allows for a good government college

**Choose BDS if:**
- Your NEET rank doesn't qualify for MBBS
- You are genuinely interested in dental sciences
- You want to set up your own practice relatively quickly`,
    excerpt: "MBBS vs BDS — a detailed comparison of fees, career scope, salary, and admission difficulty to help you make the right decision after NEET.",
    author: "Medical Counselor",
    main_image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
  },
  {
    title: "MBA Scholarships in India 2025: Complete List and How to Apply",
    slug: "mba-scholarships-india-2025",
    content: `An MBA from a top business school is a significant investment, with fees ranging from ₹5 lakh to ₹25 lakh. However, numerous scholarships are available to ease the financial burden for deserving students. Here is a comprehensive list of MBA scholarships available in India for 2025.

## IIM Scholarships

**Merit-cum-Need Scholarship (IIMs)**
- Available at all IIMs
- Up to 100% tuition fee waiver
- Criteria: Annual family income below ₹3 lakh + academic merit

**NC-OBC Scholarships**
- For OBC candidates from non-creamy layer
- Monthly stipend of ₹4,500 to ₹8,000

## Private B-School Scholarships

**ISB Merit Scholarship**
- For exceptional GMAT/GRE scorers
- Up to ₹15 lakh scholarship

**XLRI Scholarship for Women in Management**
- Encourages women in business
- ₹1–3 lakh per year

## Government Scholarships

**Central Sector Scheme of Scholarships**
- For students from families with annual income below ₹8 lakh
- ₹12,000 per year

**Post-Matric Scholarships (SC/ST/OBC)**
- Full fee reimbursement + living allowance

## How to Apply for MBA Scholarships

1. **Research early**: Most scholarships have deadlines 3-6 months before admission
2. **Maintain academic record**: Most scholarships require 60%+ in graduation
3. **Prepare documents**: Income certificate, caste certificate, ID proof, academic transcripts
4. **Write a strong SOP**: Your Statement of Purpose can be the difference-maker
5. **Apply to multiple scholarships**: Don't put all eggs in one basket`,
    excerpt: "Complete guide to MBA scholarships in India 2025 — IIM scholarships, government schemes, and private B-school grants. Learn how to apply and maximize your chances.",
    author: "MBA Advisor",
    main_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  },
  {
    title: "How to Get an Education Loan in India: Step-by-Step Guide 2025",
    slug: "education-loan-guide-india-2025",
    content: `An education loan can be your ticket to a top college when funds are limited. With education costs rising every year, knowing how to navigate the loan process is crucial. Here is a complete guide to getting an education loan in India in 2025.

## Types of Education Loans

### Secured Loans (with collateral)
- Loan amount: ₹7.5 lakh and above
- Interest rate: 8.5%–11% per annum
- Requires property, FD, or insurance as collateral

### Unsecured Loans (without collateral)
- Loan amount: Up to ₹7.5 lakh
- Interest rate: 10%–15% per annum
- No collateral required

## Top Banks Offering Education Loans

1. **State Bank of India (SBI Scholar Loan)** — Best for IIT/NIT students
2. **Bank of Baroda (Baroda Vidya Loan)** — Best interest rates for government colleges
3. **HDFC Credila** — Best for private engineering and MBA colleges
4. **Avanse Financial Services** — Flexible repayment options
5. **Axis Bank Education Loan** — Quick processing

## Required Documents
- KYC documents (Aadhaar, PAN)
- Admission letter from the college
- Fee structure / fee receipt
- Academic records (10th, 12th, Graduation)
- Income proof of co-applicant (salary slips, ITR)
- Collateral documents (for secured loans)

## Step-by-Step Application Process

1. Compare loan offers from multiple banks
2. Check eligibility on bank website
3. Fill online application form
4. Submit documents to the nearest branch
5. Bank conducts verification (7-15 days)
6. Loan sanction and disbursement

## Tax Benefit
Under Section 80E of Income Tax Act, the entire interest paid on education loan is tax-deductible for up to 8 years.`,
    excerpt: "Step-by-step guide to getting an education loan in India in 2025 — best banks, interest rates, required documents, and tips to get quick approval.",
    author: "Finance Expert",
    main_image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  },
  {
    title: "Abroad MBBS 2025: Best Countries for Indian Students",
    slug: "abroad-mbbs-best-countries-2025",
    content: `With less than 1 lakh MBBS seats in India for over 20 lakh NEET aspirants, studying MBBS abroad has become a popular and legitimate option. Countries like Russia, Georgia, Kazakhstan, and the Philippines offer NMC-recognized MBBS programs at a fraction of the cost of private Indian colleges.

## Why Study MBBS Abroad?

- **Cost**: ₹25–60 lakh total (vs ₹70 lakh–1.5 crore in private Indian colleges)
- **No Donation**: Strictly merit-based admission, no capitation fees
- **English Medium**: Most universities teach in English
- **WHO & NMC Recognition**: Eligible to return and practice in India after passing FMGE

## Top Countries for MBBS Abroad

### 1. Russia
- Average Cost: ₹30–45 lakh
- Duration: 6 years
- Top Universities: Kazan Federal, Sechenov University, RUDN
- Pros: Strong medical education tradition, large Indian student community

### 2. Georgia
- Average Cost: ₹25–40 lakh
- Duration: 6 years
- Top Universities: Tbilisi State Medical, David Tvildiani Medical
- Pros: Affordable, safe, English-medium, European exposure

### 3. Kazakhstan
- Average Cost: ₹25–35 lakh
- Duration: 5 years
- Top Universities: KRMU, Astana Medical University
- Pros: Cheapest option, NMC recognized, good clinical exposure

### 4. Philippines
- Average Cost: ₹35–55 lakh
- Duration: 5.5 years (BS pre-med + MD)
- Top Universities: DMSF Davao, UV Gullas College
- Pros: English medium, similar culture, American medical education system

### 5. Ukraine (limited post-war situation)
- Check current safety status before applying
- Best universities: Kharkiv NMU, Vinnitsa NMU

## Important: FMGE / NExT Exam
To practice medicine in India after studying abroad, you must pass the Foreign Medical Graduate Examination (FMGE) or the upcoming National Exit Test (NExT). Pass rate is approximately 15-20% — prepare rigorously.`,
    excerpt: "Complete guide to studying MBBS abroad in 2025 — best countries, top universities, total costs, and what you need to know about returning to India.",
    author: "Study Abroad Counselor",
    main_image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  },
];

export async function POST() {
  try {
    // Seed Colleges (upsert by slug)
    const collegeRows = SEED_COLLEGES.map((c) => ({
      name: c.name,
      slug: c.slug,
      state: c.state,
      city: c.city,
      courses: c.courses,
      fees: c.fees,
      description: c.description,
      images: [],
      highest_package: c.highestPackage ?? null,
      average_package: c.averagePackage ?? null,
    }));
    const { error: cErr, data: cData } = await supabase
      .from('colleges')
      .upsert(collegeRows, { onConflict: 'slug', ignoreDuplicates: true })
      .select();
    const collegesAdded = cData?.length ?? 0;

    // Seed Exams (upsert by slug)
    const examRows = SEED_EXAMS.map((e) => ({
      name: e.name,
      slug: e.slug,
      date: e.date,
      description: e.description,
      eligibility: e.eligibility,
      listing_mode: e.listing_mode,
    }));
    const { error: eErr, data: eData } = await supabase
      .from('exams')
      .upsert(examRows, { onConflict: 'slug', ignoreDuplicates: true })
      .select();
    const examsAdded = eData?.length ?? 0;

    // Seed Blogs (upsert by slug)
    const { error: bErr, data: bData } = await supabase
      .from('blogs')
      .upsert(SEED_BLOGS, { onConflict: 'slug', ignoreDuplicates: true })
      .select();
    const blogsAdded = bData?.length ?? 0;

    if (cErr || eErr || bErr) {
      return NextResponse.json({ error: cErr?.message || eErr?.message || bErr?.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Seed complete!',
      colleges: { added: collegesAdded },
      exams: { added: examsAdded },
      blogs: { added: blogsAdded },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Use POST /api/seed to seed all demo data (colleges, exams, blogs)" });
}
