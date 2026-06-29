"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  Menu,
  Facebook,
  Instagram,
  Youtube,
  Globe,
  Phone,
  Mail,
  Settings,
  GraduationCap,
  Briefcase,
  Palette,
  Gavel,
  Plane,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";

const COURSE_LINKS = [
  { href: "/courses/btech", label: "B.TECH", Icon: Settings },
  { href: "/courses/mbbs", label: "MBBS", Icon: GraduationCap },
  { href: "/courses/mba", label: "MBA", Icon: Briefcase },
  { href: "/courses/design", label: "DESIGN", Icon: Palette },
  { href: "/courses/law", label: "LAW", Icon: Gavel },
  { href: "/courses/abroad-mbbs", label: "ABROAD MBBS", Icon: Plane },
];

const SOCIALS = [
  { href: "https://www.facebook.com/profile.php?id=61587842248462", Icon: Facebook, label: "Facebook" },
  { href: "https://www.instagram.com/admissionpath4u/", Icon: Instagram, label: "Instagram" },
  { href: "https://www.youtube.com/channel/UCvIQzIgTENnGijRQWTReqTg", Icon: Youtube, label: "YouTube" },
  { href: "https://share.google/qQ63bbfFnHXiOOn4N", Icon: Globe, label: "Website" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/colleges?search=${encodeURIComponent(q)}` : "/colleges");
    setIsOpen(false);
  };

  return (
    <div className="w-full flex flex-col font-sans">
      {/* Top utility bar */}
      <div className="hidden md:block bg-[#27465B] text-white">
        <div className="container mx-auto flex h-10 items-center justify-between px-6 text-xs">
          {/* Contact info */}
          <div className="flex items-center gap-6">
            <a
              href="tel:+919650501173"
              className="flex items-center gap-1.5 hover:text-[#BDA25F] transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>+91 96505 01173</span>
            </a>
            <a
              href="mailto:info@admissionpath4u.com"
              className="flex items-center gap-1.5 hover:text-[#BDA25F] transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>info@admissionpath4u.com</span>
            </a>
          </div>

          {/* Top links + socials */}
          <div className="flex items-center gap-5">
            <nav className="flex items-center gap-4 font-medium">
              <Link href="/colleges" className="hover:text-[#BDA25F] transition-colors">
                Colleges
              </Link>
              <Link href="/exams" className="hover:text-[#BDA25F] transition-colors">
                Exams
              </Link>
              <Link href="/blogs" className="hover:text-[#BDA25F] transition-colors">
                Blogs
              </Link>
              <Link href="/services" className="hover:text-[#BDA25F] transition-colors">
                Services
              </Link>
              <Link href="/about" className="hover:text-[#BDA25F] transition-colors">
                About
              </Link>
            </nav>
            <span className="h-4 w-px bg-white/25" />
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ href, Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/90 hover:text-[#BDA25F] transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-6">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Admission Path 4u"
              width={200}
              height={60}
              className="h-12 w-auto md:h-14"
              priority
            />
            <span className="hidden text-lg font-extrabold leading-tight text-[#27465B] sm:inline-block">
              Admission Path{" "}
              <span className="text-[#BDA25F]">4u</span>
            </span>
          </Link>

          {/* Desktop course nav */}
          <nav className="hidden xl:flex items-center gap-6 text-[13px] font-semibold text-gray-700">
            {COURSE_LINKS.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-1.5 transition-colors hover:text-[#27465B]"
              >
                <Icon className="h-4 w-4 text-[#BDA25F]" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Search + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <form
              onSubmit={handleSearch}
              className="flex h-10 items-center rounded-full border border-gray-200 bg-gray-50 px-3 focus-within:border-[#27465B] focus-within:ring-1 focus-within:ring-[#27465B]/30 transition"
            >
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search colleges..."
                className="h-8 w-36 border-0 bg-transparent px-2 text-sm shadow-none focus-visible:ring-0 lg:w-44"
              />
            </form>
            <Button
              asChild
              className="rounded-full bg-[#BDA25F] px-5 font-semibold text-[#27465B] shadow-sm hover:bg-[#a98e4f]"
            >
              <Link href="/contact">Apply Now</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="xl:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#27465B]">
                  <Menu className="h-7 w-7" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[360px] px-5 pt-5">
                <SheetTitle className="mb-3 text-left font-bold text-[#27465B]">
                  Menu
                </SheetTitle>

                <form
                  onSubmit={handleSearch}
                  className="mb-4 flex h-10 items-center rounded-full border border-gray-200 bg-gray-50 px-3"
                >
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search colleges..."
                    className="h-8 border-0 bg-transparent px-2 text-sm shadow-none focus-visible:ring-0"
                  />
                </form>

                <nav className="flex flex-col">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Explore
                  </p>
                  <MobileLink href="/colleges" onClick={() => setIsOpen(false)}>Colleges</MobileLink>
                  <MobileLink href="/exams" onClick={() => setIsOpen(false)}>Exams</MobileLink>
                  <MobileLink href="/blogs" onClick={() => setIsOpen(false)}>Blogs</MobileLink>
                  <MobileLink href="/services" onClick={() => setIsOpen(false)}>Services</MobileLink>
                  <MobileLink href="/about" onClick={() => setIsOpen(false)}>About</MobileLink>

                  <div className="my-3 h-px bg-gray-200" />
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Courses
                  </p>
                  {COURSE_LINKS.map(({ href, label }) => (
                    <MobileLink key={href} href={href} onClick={() => setIsOpen(false)}>
                      {label.charAt(0) + label.slice(1).toLowerCase()}
                    </MobileLink>
                  ))}

                  <div className="my-3 h-px bg-gray-200" />
                  <Button
                    asChild
                    className="w-full rounded-full bg-[#BDA25F] font-semibold text-[#27465B] hover:bg-[#a98e4f]"
                  >
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      Apply for Scholarship
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-md py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#27465B]"
    >
      {children}
    </Link>
  );
}
