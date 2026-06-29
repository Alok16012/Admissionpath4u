import { getExams } from "@/app/actions/public";
import { ExamCard } from "@/components/exam-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Upcoming Entrance Exams in India — Dates & Eligibility",
  description:
    "Stay updated on upcoming entrance exams in India like NEET, JEE and CUET. Check dates, eligibility and exam patterns with Admission Path4u.",
  alternates: { canonical: "/exams" },
};

export default async function ExamsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { exams, totalPages, currentPage } = await getExams(searchParams);

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams as any);
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Entrance Exams</h1>
        <p className="text-muted-foreground">
          Find upcoming entrance exams and eligibility criteria.
        </p>
      </div>

      {exams.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam: any) => (
              <ExamCard key={exam._id} exam={exam} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                disabled={currentPage <= 1}
                asChild={currentPage > 1}
              >
                {currentPage > 1 ? (
                  <Link href={createPageLink(currentPage - 1)}>Previous</Link>
                ) : (
                  "Previous"
                )}
              </Button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                disabled={currentPage >= totalPages}
                asChild={currentPage < totalPages}
              >
                {currentPage < totalPages ? (
                  <Link href={createPageLink(currentPage + 1)}>Next</Link>
                ) : (
                  "Next"
                )}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="py-12 text-center border rounded-md bg-gray-50 dark:bg-gray-800/50">
          <p className="text-lg text-muted-foreground">
            No exams found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
