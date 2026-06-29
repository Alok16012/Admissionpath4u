import { getBlogs } from "@/app/actions/public";
import { BlogCard } from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Education Blog — Admission Tips & College News",
  description:
    "Read the latest admission tips, college news, exam updates and career guidance from Admission Path 4u.",
  alternates: { canonical: "/blogs" },
};

export default async function BlogsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { blogs, totalPages, currentPage } = await getBlogs(searchParams);

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams as any);
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="container mx-auto py-8 px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Latest Blogs</h1>
        <p className="text-muted-foreground">
          Insights, updates, and articles on education and admissions.
        </p>
      </div>

      {blogs.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog: any) => (
              <BlogCard key={blog._id} blog={blog} />
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
            No blogs found. Check back later!
          </p>
        </div>
      )}
    </div>
  );
}
