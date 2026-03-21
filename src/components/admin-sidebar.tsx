"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  School,
  Users,
  LogOut,
  FileText,
  BookOpen,
  Briefcase,
  GraduationCap,
  Info,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AdminSidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/homepage", label: "Homepage", icon: Home },
    { href: "/admin/colleges", label: "Colleges", icon: School },
    { href: "/admin/courses", label: "Courses", icon: GraduationCap },
    { href: "/admin/exams", label: "Exams", icon: FileText },
    { href: "/admin/blogs", label: "Blogs", icon: BookOpen },
    { href: "/admin/services", label: "Services", icon: Briefcase },
    { href: "/admin/about", label: "About Us", icon: Info },
    { href: "/admin/leads", label: "Leads", icon: Users },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    router.push("/admin/login");
  };

  return (
    <div
      className={cn(
        "pb-12 h-full border-r bg-gray-100/40 dark:bg-gray-800/40",
        className,
      )}
    >
      <div className="space-y-4 py-4 h-full flex flex-col relative">
        <div className="px-6 py-2 flex-1">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Admin Panel
          </h2>
          <div className="space-y-1">
            {links.map((link) => (
              <Button
                key={link.href}
                variant={pathname === link.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={link.href}>
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="px-6 py-2">
          <Button
            variant="outline"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
