import { getColleges } from "@/app/actions/public";
import { CollegeCard } from "@/components/college-card";
import { CollegeFilters } from "@/components/college-filters";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Top Colleges & Universities in India",
  description:
    "Browse top colleges and universities in India. Filter by course, state, fees and placements, and apply online with Admission Path4u.",
  alternates: { canonical: "/colleges" },
};

export default async function CollegesPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { colleges, totalPages, currentPage } = await getColleges(searchParams);

  // Helper to build pagination links
  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams as any);
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-20">
            <CollegeFilters />
          </div>
        </aside>
        <main className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">All Colleges</h1>
            <p className="text-muted-foreground">
              Find the best colleges for your future.
            </p>
          </div>
          {colleges.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {colleges.map((college: any) => (
                  <CollegeCard key={college._id} college={college} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    disabled={currentPage <= 1}
                    asChild={currentPage > 1}
                  >
                    {currentPage > 1 ? (
                      <Link href={createPageLink(currentPage - 1)}>
                        Previous
                      </Link>
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
                No colleges found matching your criteria.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
