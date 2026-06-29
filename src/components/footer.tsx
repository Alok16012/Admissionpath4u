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
    <footer className="bg-gradient-to-b from-[#27465B] to-[#1b3242] text-white/80">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-lg bg-white p-1.5">
                <Image
                  src="/logo.png"
                  alt="Admission Path 4u"
                  width={120}
                  height={40}
                  className="h-9 w-auto"
                />
              </span>
              <span className="text-xl font-extrabold text-[#BDA25F]">
                Admission Path 4u
              </span>
            </Link>
            <p className="text-white/70 leading-relaxed text-sm">
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
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-[#BDA25F] mt-0.5 shrink-0" />
                <span>
                  GF-090, Migsun Galleria, Sector 27
                  <br />
                  Greater Noida, Uttar Pradesh - 201306
                </span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-[#BDA25F] shrink-0" />
                <a href="tel:+919650501173" className="hover:text-white transition-colors">
                  +91 96505 01173
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-[#BDA25F] shrink-0" />
                <a href="mailto:info@admissionpath4u.com" className="hover:text-white transition-colors">
                  info@admissionpath4u.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#16242f] py-6 border-t border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Admission Path 4u. All rights reserved.</p>
          <p>
            Developed by{" "}
            <Link
              href="https://blinks-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
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
      className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:bg-[#BDA25F] hover:text-[#27465B] hover:border-[#BDA25F] transition-all duration-300"
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
        className="text-white/70 hover:text-white hover:pl-1 transition-all duration-300 block"
      >
        {children}
      </Link>
    </li>
  );
}
