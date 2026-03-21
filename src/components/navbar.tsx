"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Menu,
  Facebook,
  Instagram,
  Youtube,
  Globe,
  Settings,
  GraduationCap, // for B.Tech/MBBS
  Briefcase, // for MBA
  Palette, // for Design
  Gavel, // for Law
  Plane, // for Abroad MBBS
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col font-sans">
      {/* Top Bar - Maroon */}
      <div className="hidden md:block bg-[#800000] text-white py-2 px-4 md:px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-xs md:text-sm gap-4 px-6">
          {/* Top Left Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/colleges"
              className="hover:text-yellow-400 uppercase font-medium"
            >
              College
            </Link>
            <Link
              href="/exams"
              className="hover:text-yellow-400 uppercase font-medium"
            >
              Exams
            </Link>

            <Link
              href="/blogs"
              className="hover:text-yellow-400 uppercase font-medium"
            >
              Blogs
            </Link>
            <Link
              href="/services"
              className="hover:text-yellow-400 uppercase font-medium"
            >
              Services
            </Link>
          </nav>

          {/* Top Right Actions */}
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 w-full md:w-auto">
            <Button
              asChild
              className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-semibold rounded-full px-6 h-8 text-xs md:text-sm"
            >
              <Link href="/contact">Apply for Scholarship</Link>
            </Button>

            <div className="relative bg-white rounded-full flex items-center px-3 py-1 h-8 w-48 md:w-64">
              <Input
                type="text"
                placeholder="Search Colleges..."
                className="border-0 shadow-none focus-visible:ring-0 h-6 px-0 text-black placeholder:text-gray-400 text-xs w-full"
              />
              <Search className="h-4 w-4 text-[#800000]" />
            </div>

            <div className="flex items-center space-x-3">
              <Link href="https://www.facebook.com/profile.php?id=61587842248462" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <Facebook className="h-4 w-4 md:h-5 md:w-5 bg-white text-[#800000] rounded-full p-0.5" />
              </Link>
              <Link href="https://www.instagram.com/admissionpath4u/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <Instagram className="h-4 w-4 md:h-5 md:w-5 bg-white text-[#800000] rounded-full p-0.5" />
              </Link>
              <Link href="https://www.youtube.com/channel/UCvIQzIgTENnGijRQWTReqTg" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <Youtube className="h-4 w-4 md:h-5 md:w-5 bg-white text-[#800000] rounded-full p-0.5" />
              </Link>
              <Link href="https://share.google/qQ63bbfFnHXiOOn4N" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                <Globe className="h-4 w-4 md:h-5 md:w-5 bg-white text-[#800000] rounded-full p-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar - White */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Admission Path 4u"
              width={200}
              height={60}
              className="h-12 w-auto md:h-16"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-gray-700 font-medium text-sm">
            <Link
              href="/courses/btech"
              className="flex items-center gap-1 hover:text-[#800000] transition-colors"
            >
              <Settings className="w-4 h-4 text-[#800000]" />
              <span>B.TECH</span>
            </Link>
            <Link
              href="/courses/mbbs"
              className="flex items-center gap-1 hover:text-[#800000] transition-colors"
            >
              <GraduationCap className="w-4 h-4 text-[#800000]" />
              <span>MBBS</span>
            </Link>
            <Link
              href="/courses/mba"
              className="flex items-center gap-1 hover:text-[#800000] transition-colors"
            >
              <Briefcase className="w-4 h-4 text-[#800000]" />
              <span>MBA</span>
            </Link>
            <Link
              href="/courses/design"
              className="flex items-center gap-1 hover:text-[#800000] transition-colors"
            >
              <Palette className="w-4 h-4 text-[#800000]" />
              <span>DESIGN</span>
            </Link>
            <Link
              href="/courses/law"
              className="flex items-center gap-1 hover:text-[#800000] transition-colors"
            >
              <Gavel className="w-4 h-4 text-[#800000]" />
              <span>LAW</span>
            </Link>
            <Link
              href="/courses/abroad-mbbs"
              className="flex items-center gap-1 hover:text-[#800000] transition-colors"
            >
              <Plane className="w-4 h-4 text-[#800000]" />
              <span>ABROAD MBBS</span>
            </Link>
          </nav>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#800000]">
                  <Menu className="h-8 w-8" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] px-4 pt-4"
              >
                <SheetTitle className="text-left text-[#800000] font-bold mb-1">
                  Menu
                </SheetTitle>
                <nav className="flex flex-col space-y-4">
                  <MobileLink href="/colleges" onClick={() => setIsOpen(false)}>
                    Colleges
                  </MobileLink>
                  <MobileLink href="/exams" onClick={() => setIsOpen(false)}>
                    Exams
                  </MobileLink>

                  <MobileLink href="/blogs" onClick={() => setIsOpen(false)}>
                    Blogs
                  </MobileLink>
                  <div className="h-px bg-gray-200 my-2" />
                  <MobileLink
                    href="/courses/btech"
                    onClick={() => setIsOpen(false)}
                  >
                    B.Tech
                  </MobileLink>
                  <MobileLink
                    href="/courses/mbbs"
                    onClick={() => setIsOpen(false)}
                  >
                    MBBS
                  </MobileLink>
                  <MobileLink
                    href="/courses/mba"
                    onClick={() => setIsOpen(false)}
                  >
                    MBA
                  </MobileLink>
                  <MobileLink
                    href="/courses/design"
                    onClick={() => setIsOpen(false)}
                  >
                    Design
                  </MobileLink>
                  <MobileLink
                    href="/courses/law"
                    onClick={() => setIsOpen(false)}
                  >
                    Law
                  </MobileLink>
                  <MobileLink
                    href="/courses/abroad-mbbs"
                    onClick={() => setIsOpen(false)}
                  >
                    Abroad MBBS
                  </MobileLink>
                  <div className="h-px bg-gray-200 my-2" />
                  <Button
                    asChild
                    className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black w-full"
                  >
                    <Link href="/contact">Apply for Scholarship</Link>
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

function DropdownMenuWrapper({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 hover:text-[#800000] outline-none transition-colors">
        {icon}
        <span>{label}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Top Colleges</DropdownMenuItem>
        <DropdownMenuItem>Rankings</DropdownMenuItem>
        <DropdownMenuItem>Exams</DropdownMenuItem>
        <DropdownMenuItem>Admission</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
      className="text-lg font-medium hover:text-[#800000] transition-colors"
    >
      {children}
    </Link>
  );
}
