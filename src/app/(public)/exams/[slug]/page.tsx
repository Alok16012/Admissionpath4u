import type { Metadata } from "next";
import { getExamBySlug } from "@/app/actions/public";
import { notFound } from "next/navigation";
import { Calendar, Monitor, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { metaDescription } from "@/lib/seo";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const exam = await getExamBySlug(slug);
  if (!exam) return { title: "Exam Not Found" };
  const title = `${exam.name} — Dates, Eligibility & Pattern`;
  const description = metaDescription(
    exam.description,
    `${exam.name} exam details: important dates, eligibility, exam pattern and preparation guidance from Admission Path 4u.`
  );
  return {
    title,
    description,
    alternates: { canonical: `/exams/${slug}` },
    openGraph: { title, description, type: "article", images: ["/logo.png"] },
  };
}

export default async function ExamDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const exam = await getExamBySlug(params.slug);

  if (!exam) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-6">
      <Button
        variant="ghost"
        asChild
        className="mb-6 pl-0 hover:bg-transparent hover:text-primary"
      >
        <Link href="/exams" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Exams
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{exam.name}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                <Calendar className="h-4 w-4" />
                <span>{new Date(exam.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                <Monitor className="h-4 w-4" />
                <span>{exam.listing_mode}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
            <h2 className="text-xl font-bold">About the Exam</h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {exam.description}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
            <h2 className="text-xl font-bold">Eligibility Criteria</h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {exam.eligibility}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#27465B] text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Important Info</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-white/70 uppercase font-semibold">
                  Exam Date
                </p>
                <p className="font-medium">
                  {new Date(exam.date).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs text-white/70 uppercase font-semibold">
                  Mode
                </p>
                <p className="font-medium">{exam.listing_mode}</p>
              </div>
              <div>
                <p className="text-xs text-white/70 uppercase font-semibold">
                  Eligibility
                </p>
                <p className="font-medium text-sm">{exam.eligibility}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Contact our counselors for guidance on {exam.name} preparation and
              admission.
            </p>
            <Button asChild className="w-full">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
