"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

export function CourseSearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative max-w-lg">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      <Input
        type="text"
        placeholder="Search colleges by name, city or state..."
        defaultValue={searchParams.get("search") || ""}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-11 pr-4 h-12 rounded-full bg-white border-0 shadow-lg text-gray-800 placeholder:text-gray-400 text-sm focus-visible:ring-2 focus-visible:ring-[#FFD700]"
      />
    </div>
  );
}
