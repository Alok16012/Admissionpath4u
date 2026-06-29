import Link from "next/link";
import { Calendar, Monitor, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ExamCard({ exam }: { exam: any }) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold mb-2 line-clamp-1">{exam.name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {exam.description}
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-[#27465B]" />
            <span>{new Date(exam.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Monitor className="h-4 w-4 text-[#27465B]" />
            <span>{exam.listing_mode}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4 text-[#27465B]" />
            <span className="line-clamp-1">{exam.eligibility}</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2">
        <Button
          asChild
          className="w-full bg-black hover:bg-black/90 text-white"
        >
          <Link href={`/exams/${exam.slug}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
