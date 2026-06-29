import { getBlogBySlug } from "@/app/actions/public";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function BlogDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-6 max-w-4xl">
      <Button
        variant="ghost"
        asChild
        className="mb-6 pl-0 hover:bg-transparent hover:text-primary"
      >
        <Link href="/blogs" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Blogs
        </Link>
      </Button>

      <article className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(blog.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
          <Image
            src={blog.main_image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none prose-img:rounded-xl">
          <div className="bg-gray-50 p-6 rounded-lg font-medium text-gray-700 italic border-l-4 border-[#1d4ed8]">
            {blog.excerpt}
          </div>

          <div className="whitespace-pre-line text-gray-800 leading-relaxed mt-8">
            {blog.content}
          </div>
        </div>
      </article>

      <div className="mt-16 pt-8 border-t">
        <h3 className="text-2xl font-bold mb-6">More from Admission Path 4u</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1d4ed8] text-white p-6 rounded-xl">
            <h4 className="font-bold text-xl mb-2">Find Top Colleges</h4>
            <p className="mb-4 text-white/80">
              Explore the best colleges for your career path.
            </p>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/colleges">Explore Colleges</Link>
            </Button>
          </div>
          <div className="bg-[#FFD700] p-6 rounded-xl">
            <h4 className="font-bold text-xl mb-2 text-black">
              Upcoming Exams
            </h4>
            <p className="mb-4 text-black/80">
              Stay updated with latest exam dates and notifications.
            </p>
            <Button
              asChild
              className="w-full bg-black text-white hover:bg-black/80"
            >
              <Link href="/exams">Check Exams</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
