"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Youtube,
  Globe,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <span className="text-2xl font-extrabold text-[#FFD700]">
                AdmissionPath4u
              </span>
            </Link>
            <p className="text-zinc-400 leading-relaxed text-sm">
              Your trusted partner in navigating the college admission journey.
              We help you find the best colleges, courses, and scholarships
              tailored to your career goals.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://www.facebook.com/profile.php?id=61587842248462" icon={Facebook} label="Facebook" />
              <SocialLink href="https://www.instagram.com/admissionpath4u/" icon={Instagram} label="Instagram" />
              <SocialLink href="https://www.youtube.com/channel/UCvIQzIgTENnGijRQWTReqTg" icon={Youtube} label="YouTube" />
              <SocialLink href="https://share.google/qQ63bbfFnHXiOOn4N" icon={Globe} label="Google My Business" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/colleges">Colleges</FooterLink>
              <FooterLink href="/exams">Exams</FooterLink>
              <FooterLink href="/blogs">Blogs</FooterLink>
              <FooterLink href="/services">Our Services</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">
              Popular Courses
            </h4>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/courses/btech">B.Tech Engineering</FooterLink>
              <FooterLink href="/courses/mba">MBA / PGDM</FooterLink>
              <FooterLink href="/courses/mbbs">MBBS Medical</FooterLink>
              <FooterLink href="/courses/design">Design & Fashion</FooterLink>
              <FooterLink href="/courses/law">Law (LLB / LLM)</FooterLink>
              <FooterLink href="/courses/abroad-mbbs">Abroad MBBS</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-3 text-zinc-400">
                <MapPin className="w-5 h-5 text-[#1d4ed8] mt-0.5 shrink-0" />
                <span>
                  GF-090, Migsun Galleria, Sector 27
                  <br />
                  Greater Noida, Uttar Pradesh - 201306
                </span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Phone className="w-5 h-5 text-[#1d4ed8] shrink-0" />
                <span>+91 96505 01173</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Mail className="w-5 h-5 text-[#1d4ed8] shrink-0" />
                <span>info@admissionpath4u.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-6 border-t border-zinc-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} AdmissionPath4u. All rights reserved.</p>
          <p>
            Developed by{" "}
            <Link
              href="https://blinks-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Blinks AI
            </Link>
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label?: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#1d4ed8] hover:text-white hover:border-[#1d4ed8] transition-all duration-300"
    >
      <Icon className="w-4 h-4" />
    </Link>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-zinc-400 hover:text-white hover:pl-1 transition-all duration-300 block"
      >
        {children}
      </Link>
    </li>
  );
}
