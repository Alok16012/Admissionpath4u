import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getServiceBySlug, getServices } from "@/app/actions/public";
import {
  Search, Banknote, FileText, Building2, BadgeIndianRupee, GraduationCap,
  BookOpen, Users, Star, Trophy, Award, Lightbulb, Target, CheckCircle,
  Shield, Globe, Zap, Heart, Clock, Phone, ArrowRight, ChevronRight,
  ChevronDown, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ICON_MAP: Record<string, React.ElementType> = {
  Search, Banknote, FileText, Building2, BadgeIndianRupee, GraduationCap,
  BookOpen, Users, Star, Trophy, Award, Lightbulb, Target, CheckCircle,
  Shield, Globe, Zap, Heart, Clock, Phone,
};

// Static fallback data for non-DB pages
const STATIC_SERVICES: Record<string, any> = {
  "college-finder": {
    title: "College Finder",
    shortDescription: "Your smart guide to finding the best-fit college tailored to your needs.",
    fullDescription: "Our College Finder service uses a smart matching algorithm to recommend colleges based on your academic profile, preferred course, budget, and location. We analyze hundreds of data points to ensure you apply to colleges where you have the best chance of admission and success.\n\nWith access to 500+ partner colleges across India, we help you discover the right institution that matches your aspirations and financial goals.",
    icon: "Search",
    features: ["Personalized College Recommendations", "500+ Partner Colleges", "Filter by Course, Budget & Location", "Admission Probability Score", "Direct Counselor Connect", "Application Deadline Reminders"],
    benefits: ["Save time with curated shortlists", "Higher admission success rate", "Compare colleges side-by-side", "Get expert second opinion", "Access to exclusive college data"],
    processSteps: [
      { title: "Fill Your Profile", description: "Share your academic background, interests, preferred courses, and budget range." },
      { title: "Get Recommendations", description: "Our system matches you with the most suitable colleges based on your profile." },
      { title: "Shortlist & Compare", description: "Review your personalized list, compare colleges, and shortlist your top choices." },
      { title: "Apply with Confidence", description: "Our counselors guide you through the application process for each college." },
    ],
    faqs: [
      { question: "How many colleges can I shortlist?", answer: "You can shortlist up to 10 colleges through our platform for free." },
      { question: "Is the recommendation service free?", answer: "Yes, basic college recommendations are completely free. Premium features are available at a nominal fee." },
    ],
    ctaText: "Discover Now",
    slug: "college-finder",
  },
  "scholarship-program": {
    title: "Scholarship Program",
    shortDescription: "Grab up to 100% scholarships to fund your dream education.",
    fullDescription: "Money should never be a barrier to quality education. Our Scholarship Program connects deserving students with merit-based and need-based scholarships from top colleges and private sponsors.\n\nWe assist you through the entire scholarship application process — from eligibility checks to document submission — ensuring you get the financial support you deserve.",
    icon: "Banknote",
    features: ["Merit-Based Scholarships", "Need-Based Financial Aid", "Up to 100% Fee Waiver", "Scholarship Eligibility Check", "Document Assistance", "Fast-Track Approval Support"],
    benefits: ["Reduce or eliminate tuition fees", "Access exclusive college-sponsored grants", "Apply to multiple scholarships at once", "Expert guidance throughout the process", "Track scholarship application status"],
    processSteps: [
      { title: "Check Eligibility", description: "Fill out a quick eligibility form to discover which scholarships you qualify for." },
      { title: "Select Scholarships", description: "Browse and choose from a curated list of scholarships matching your profile." },
      { title: "Prepare Documents", description: "Our team helps you compile and verify all required documents." },
      { title: "Submit & Track", description: "We submit your applications and keep you updated at every step." },
    ],
    faqs: [
      { question: "Who is eligible for scholarships?", answer: "Eligibility varies by scholarship. Criteria typically include academic merit, family income, or specific course enrollment." },
      { question: "Is there any fee to apply for scholarships?", answer: "No, applying for scholarships through our platform is completely free." },
    ],
    ctaText: "Apply Now",
    slug: "scholarship-program",
  },
  "application-process": {
    title: "Application Process",
    shortDescription: "Apply to multiple colleges through a single, streamlined admission process.",
    fullDescription: "Our single-window Application Process service eliminates the hassle of applying to multiple colleges separately. Submit one application and let us handle the rest.\n\nFrom document verification to form submission and follow-ups, our dedicated admission advisors are with you every step of the way to ensure a smooth and stress-free admission experience.",
    icon: "FileText",
    features: ["Single Application for Multiple Colleges", "Document Verification & Submission", "Real-Time Status Tracking", "Dedicated Admission Advisor", "Interview Preparation Support", "Offer Letter Assistance"],
    benefits: ["Apply to 10+ colleges with one application", "No missed deadlines", "Save hours of repetitive form filling", "Expert review of your application", "Higher acceptance rate with guided applications"],
    processSteps: [
      { title: "Create Your Profile", description: "Register and fill in your academic details, preferences, and target colleges." },
      { title: "Document Preparation", description: "Our team checks and organizes all required documents for each college." },
      { title: "Application Review", description: "Expert counselors review your application before submission for quality assurance." },
      { title: "Submit & Follow Up", description: "We submit your applications and follow up with colleges on your behalf." },
    ],
    faqs: [
      { question: "How many colleges can I apply to?", answer: "You can apply to as many colleges as you want through our single-window platform." },
      { question: "What documents are required?", answer: "Typically mark sheets, ID proof, photos, and certificates. Our team guides you on exactly what's needed for each college." },
    ],
    ctaText: "Join Now",
    slug: "application-process",
  },
  "campus-achiever": {
    title: "Campus Achiever",
    shortDescription: "Unlock exclusive campus opportunities and excel in your academic journey.",
    fullDescription: "Campus Achiever is our premium program designed to help students thrive beyond just getting admitted. We connect you with campus leadership programs, internship opportunities, industry mentors, and academic support networks.\n\nOur goal is to ensure that once you step into your dream college, you have everything you need to stand out, grow, and build a successful career.",
    icon: "Building2",
    features: ["Campus Leadership Programs", "Internship & Placement Connect", "Industry Mentor Access", "Academic Performance Support", "Networking Events", "Campus Visit & Tours"],
    benefits: ["Start building your career from Day 1", "Access hidden campus opportunities", "Connect with industry leaders", "Improve academic performance", "Build a strong professional network"],
    processSteps: [
      { title: "Enroll in Campus Achiever", description: "Sign up after your college admission is confirmed." },
      { title: "Profile Assessment", description: "We assess your strengths and goals to create a personalized campus success plan." },
      { title: "Program Matching", description: "Get matched with campus clubs, internships, and mentorship programs." },
      { title: "Ongoing Support", description: "Regular check-ins and guidance throughout your academic journey." },
    ],
    faqs: [
      { question: "When can I enroll in Campus Achiever?", answer: "You can enroll anytime after receiving your college admission offer." },
      { question: "Is Campus Achiever available for all colleges?", answer: "Campus Achiever is currently available for our 200+ partner colleges. We are expanding rapidly." },
    ],
    ctaText: "Get Started",
    slug: "campus-achiever",
  },
  "education-loan": {
    title: "Education Loan",
    shortDescription: "Turn dreams into reality with easy and accessible education loans.",
    fullDescription: "Getting an education loan should be simple, fast, and affordable. Our Education Loan service partners with leading banks and NBFCs to bring you the best loan options with low interest rates, flexible repayment terms, and quick approval.\n\nWe handle the entire loan process — from eligibility assessment to bank coordination — so you can focus on your education, not paperwork.",
    icon: "BadgeIndianRupee",
    features: ["Loans up to ₹50 Lakhs", "Low Interest Rates Starting at 8.5%", "Quick Approval in 3-5 Days", "Flexible Repayment Options", "Collateral-Free Loans Available", "Multiple Bank Partners"],
    benefits: ["Fund 100% of your education cost", "Start repayment after course completion", "No hidden charges", "Compare multiple bank offers", "Dedicated loan advisor assigned"],
    processSteps: [
      { title: "Eligibility Check", description: "Share your course details and family income for an instant eligibility assessment." },
      { title: "Choose Loan Offer", description: "Compare offers from 10+ bank partners and select the best option for you." },
      { title: "Document Submission", description: "Submit required documents digitally — our team assists with preparation." },
      { title: "Loan Disbursal", description: "Get your loan approved and disbursed directly to your college within days." },
    ],
    faqs: [
      { question: "What is the maximum loan amount?", answer: "We can help you secure education loans up to ₹50 Lakhs depending on the course and institution." },
      { question: "Do I need collateral for an education loan?", answer: "Collateral-free loans are available for amounts up to ₹7.5 Lakhs. Higher amounts may require collateral." },
    ],
    ctaText: "Apply Now",
    slug: "education-loan",
  },
  "re-admission": {
    title: "Re-admission",
    shortDescription: "Simplified re-admission services to get you back on track effortlessly.",
    fullDescription: "Life happens, and sometimes students need to take a break from their studies. Our Re-admission service helps students seamlessly return to college, whether you dropped out, took a gap year, or want to transfer credits from a previous institution.\n\nWe navigate the complex re-admission procedures, credit transfer policies, and documentation requirements on your behalf to get you back on your academic path quickly.",
    icon: "GraduationCap",
    features: ["Gap Year Re-enrollment Support", "Credit Transfer Assistance", "College Transfer Guidance", "Academic Counseling", "Documentation Support", "Fast Re-admission Processing"],
    benefits: ["Resume studies without losing credits", "Expert guidance on re-admission policies", "Smooth transition back to academics", "Explore better college options", "Stress-free documentation handling"],
    processSteps: [
      { title: "Assessment Call", description: "Speak with a counselor to understand your situation and re-admission goals." },
      { title: "College Matching", description: "We identify colleges that accept re-admissions or credit transfers for your course." },
      { title: "Documentation", description: "Our team compiles and verifies all re-admission documents including transcripts." },
      { title: "Application & Follow-up", description: "We submit your re-admission application and follow up until confirmation." },
    ],
    faqs: [
      { question: "Can I transfer my existing credits?", answer: "Yes, we help with credit transfer to compatible colleges. Transfer eligibility depends on the institution and courses completed." },
      { question: "How long does re-admission take?", answer: "The re-admission process typically takes 2-4 weeks depending on the college and documentation." },
    ],
    ctaText: "Register Now",
    slug: "re-admission",
  },
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug) || STATIC_SERVICES[slug];
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | Admission For You`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug) || STATIC_SERVICES[slug];

  if (!service) notFound();

  const IconComponent = ICON_MAP[service.icon] || Star;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3">
        <div className="container mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#800000] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-[#800000] transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#800000] via-[#900000] to-[#600000] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-[#FFD700]/10 blur-3xl" />
        <div className="absolute bottom-0 left-20 w-48 h-48 rounded-full bg-white/5 blur-2xl" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl">
                <IconComponent className="w-14 h-14 text-[#FFD700]" />
              </div>
            </div>
            {/* Content */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full mb-4 border border-white/10">
                <Sparkles className="w-3 h-3 text-[#FFD700]" />
                Our Service
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                {service.title}
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
                {service.shortDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold shadow-lg border-none"
                >
                  <Link href="/contact">{service.ctaText || "Get Started"}</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Link href="/services">View All Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Image */}
      {service.image && (
        <div className="container mx-auto px-6 -mt-8 relative z-10 max-w-4xl">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
            <Image
              src={service.image}
              alt={service.title}
              width={1200}
              height={500}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
        </div>
      )}

      {/* Overview */}
      <section className={`py-16 bg-white ${service.image ? "pt-20" : ""}`}>
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#800000] rounded-full inline-block" />
                About This Service
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
                  {service.fullDescription}
                </p>
              </div>
            </div>

            {/* Quick Info */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4 text-base">Quick Info</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#800000]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-[#800000]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Service Type</p>
                      <p className="text-sm font-semibold text-gray-800">Admission Support</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Students Served</p>
                      <p className="text-sm font-semibold text-gray-800">10,000+</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Success Rate</p>
                      <p className="text-sm font-semibold text-gray-800">98%</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Button asChild className="w-full bg-[#800000] hover:bg-[#900000] text-white">
                    <Link href="/contact">
                      Contact Us
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Key <span className="text-[#800000]">Features</span>
            </h2>
            <p className="text-gray-500 text-center mb-10">What makes this service stand out</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.features.map((feature: string, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-8 h-8 rounded-full bg-[#800000]/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-[#800000]" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-gradient-to-br from-[#800000]/5 to-[#800000]/10 rounded-3xl p-8 md:p-12 border border-[#800000]/10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Why Choose This Service?
              </h2>
              <p className="text-gray-500 mb-8">Benefits that set us apart</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#800000]" />
                    </div>
                    <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process Steps */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              How It <span className="text-[#800000]">Works</span>
            </h2>
            <p className="text-gray-500 text-center mb-12">Simple steps to get started</p>
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#800000] to-[#800000]/10 hidden md:block" />
              <div className="space-y-8">
                {service.processSteps.map((step: { title: string; description: string }, i: number) => (
                  <div key={i} className="flex gap-6 items-start relative">
                    {/* Step Number */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#800000] text-white flex items-center justify-center font-bold text-lg shadow-lg z-10">
                      {i + 1}
                    </div>
                    {/* Step Content */}
                    <div className="flex-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Frequently Asked <span className="text-[#800000]">Questions</span>
            </h2>
            <p className="text-gray-500 text-center mb-10">Answers to common queries</p>
            <div className="space-y-4">
              {service.faqs.map((faq: { question: string; answer: string }, i: number) => (
                <details
                  key={i}
                  className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-800 hover:text-[#800000] transition-colors list-none">
                    <span>{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#800000] to-[#a00000] text-white">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
            <IconComponent className="w-8 h-8 text-[#FFD700]" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Ready for {service.title}?
          </h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            Our experts are here to help you navigate every step. Connect with us today for a free consultation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold shadow-lg border-none"
            >
              <Link href="/contact">{service.ctaText || "Get Started"}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-white/30 text-white hover:bg-white/10"
            >
              <Link href="/services">Explore More Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
