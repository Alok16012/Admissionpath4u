import type { Metadata } from "next";
import { getCollegeBySlug } from "@/app/actions/public";
import { notFound } from "next/navigation";
import { MapPin, BookOpen, IndianRupee } from "lucide-react";
import { ContactDialog } from "@/components/contact-dialog";
import { metaDescription } from "@/lib/seo";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const college = await getCollegeBySlug(slug);
  if (!college) return { title: "College Not Found" };
  const title = `${college.name} — Courses, Fees & Placements`;
  const description = metaDescription(
    college.description,
    `${college.name}, ${college.city}, ${college.state}. Check courses, fees and placements, and apply online with Admission Path4u.`
  );
  return {
    title,
    description,
    alternates: { canonical: `/colleges/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      images: college.images?.[0] ? [college.images[0]] : ["/logo.png"],
    },
  };
}

export default async function CollegeDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;
  const college = await getCollegeBySlug(slug);

  if (!college) notFound();

  return (
    <div className="container py-10 px-4 md:px-6 m-auto">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-8">
          <div className="rounded-lg overflow-hidden border bg-gray-100 dark:bg-gray-800 aspect-video relative">
            {college.images?.[0] ? (
              <img
                src={college.images[0]}
                alt={college.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Image Available
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{college.name}</h1>
            <div className="flex items-center text-muted-foreground mt-2 text-lg">
              <MapPin className="mr-2 h-5 w-5" />
              {college.city}, {college.state}
            </div>
          </div>

          <div className="prose max-w-none dark:prose-invert">
            <h3 className="text-xl font-semibold mb-2">About</h3>
            <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
              {college.description}
            </p>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="sticky top-24 border rounded-lg p-6 shadow-sm bg-card">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-[#27465B]" />
                  Courses Offered
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {college.courses.map((c: string) => (
                    <span
                      key={c}
                      className="bg-[#27465B]/5 text-[#1b3242] border border-[#27465B]/20 text-sm px-3 py-1 rounded-full dark:bg-[#1b3242]/30 dark:text-[#BDA25F] dark:border-[#1b3242]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="font-semibold text-lg flex items-center">
                  <IndianRupee className="mr-2 h-5 w-5 text-green-600" />
                  Fees
                </h3>
                <p className="text-3xl font-bold mt-2">
                  ₹{college.fees.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground">
                    /year
                  </span>
                </p>
              </div>

              {(college.highestPackage || college.averagePackage) && (
                <div className="pt-6 border-t space-y-3">
                  {college.highestPackage && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Highest Package
                      </span>
                      <span className="font-semibold text-lg">
                        ₹{college.highestPackage} LPA
                      </span>
                    </div>
                  )}
                  {college.averagePackage && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Average Package
                      </span>
                      <span className="font-semibold text-lg">
                        ₹{college.averagePackage} LPA
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-6">
                <ContactDialog
                  collegeName={college.name}
                  defaultCourse={college.courses[0]}
                />
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Our counselors will contact you shortly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
