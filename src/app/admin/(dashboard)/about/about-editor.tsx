"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { saveSiteSettings } from "@/app/actions/settings";
import { Loader2, Plus, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";

interface AboutEditorProps {
  initialSettings: any;
}

const DEFAULT_STATS = [
  { label: "Students Helped", value: "10,000+" },
  { label: "Partner Colleges", value: "500+" },
  { label: "States Covered", value: "28+" },
  { label: "Success Rate", value: "98%" },
];

const DEFAULT_WHY_US = [
  { title: "Expert Counseling", description: "Get guidance from experienced counselors who understand the nuances of the admission process." },
  { title: "Verified Information", description: "Access up-to-date and accurate details about fees, placements, and eligibility criteria." },
  { title: "Scholarship Support", description: "Find tailored scholarship opportunities to help manage your education finances effectively." },
  { title: "Seamless Process", description: "From application forms to document verification, we streamline every step for you." },
  { title: "Wide Network", description: "Connect with top colleges and universities across India through our extensive partner network." },
  { title: "Student First", description: "Your career goals and preferences are our top priority. We work for your success." },
];

export function AboutEditor({ initialSettings }: AboutEditorProps) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [mission, setMission] = useState(
    initialSettings?.aboutMission ||
    "At Admission Path4u, our mission is to democratize access to quality education information. We believe every student deserves to make informed decisions about their future, regardless of their background."
  );
  const [vision, setVision] = useState(
    initialSettings?.aboutVision ||
    "We envision a future where the college admission process is transparent, accessible, and stress-free. Our platform leverages technology to bridge the gap between ambitious students and top-tier educational institutions."
  );

  const [stats, setStats] = useState<{ label: string; value: string }[]>(
    initialSettings?.aboutStats?.length ? initialSettings.aboutStats : DEFAULT_STATS
  );

  const [whyUs, setWhyUs] = useState<{ title: string; description: string }[]>(
    initialSettings?.aboutWhyUs?.length ? initialSettings.aboutWhyUs : DEFAULT_WHY_US
  );

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);
    try {
      const res = await saveSiteSettings({
        aboutMission: mission,
        aboutVision: vision,
        aboutStats: stats,
        aboutWhyUs: whyUs,
      });
      if (res.success) setSaved(true);
      else alert("Failed to save: " + res.error);
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">About Us</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Edit the content shown on the About Us page
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild size="sm">
            <Link href="/about" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Preview Page
            </Link>
          </Button>
          <Button onClick={handleSave} disabled={loading} size="sm">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="bg-white rounded-2xl border p-6 space-y-5">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Mission & Vision</h3>
        <div className="space-y-2">
          <Label>Mission Statement</Label>
          <Textarea
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            rows={4}
            placeholder="Our mission is..."
          />
        </div>
        <div className="space-y-2">
          <Label>Vision Statement</Label>
          <Textarea
            value={vision}
            onChange={(e) => setVision(e.target.value)}
            rows={4}
            placeholder="We envision..."
          />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white rounded-2xl border p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="font-semibold text-gray-800">Stats / Achievements</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setStats([...stats, { label: "", value: "" }])}
          >
            <Plus className="w-3 h-3 mr-1" /> Add
          </Button>
        </div>
        <div className="space-y-3">
          {stats.map((stat, i) => (
            <div key={i} className="flex gap-3 items-center">
              <Input
                value={stat.value}
                onChange={(e) => {
                  const updated = [...stats];
                  updated[i].value = e.target.value;
                  setStats(updated);
                }}
                placeholder="Value (e.g. 10,000+)"
                className="w-32"
              />
              <Input
                value={stat.label}
                onChange={(e) => {
                  const updated = [...stats];
                  updated[i].label = e.target.value;
                  setStats(updated);
                }}
                placeholder="Label (e.g. Students Helped)"
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setStats(stats.filter((_, idx) => idx !== i))}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white rounded-2xl border p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="font-semibold text-gray-800">Why Choose Us (Feature Cards)</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setWhyUs([...whyUs, { title: "", description: "" }])}
          >
            <Plus className="w-3 h-3 mr-1" /> Add Card
          </Button>
        </div>
        <div className="space-y-4">
          {whyUs.map((item, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-2 bg-gray-50/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400 uppercase">Card {i + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setWhyUs(whyUs.filter((_, idx) => idx !== i))}
                  className="text-red-500 hover:text-red-600 h-7 w-7"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <Input
                value={item.title}
                onChange={(e) => {
                  const updated = [...whyUs];
                  updated[i].title = e.target.value;
                  setWhyUs(updated);
                }}
                placeholder="Card Title (e.g. Expert Counseling)"
              />
              <Textarea
                value={item.description}
                onChange={(e) => {
                  const updated = [...whyUs];
                  updated[i].description = e.target.value;
                  setWhyUs(updated);
                }}
                rows={2}
                placeholder="Card description..."
              />
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading} size="lg">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {saved ? "Changes Saved!" : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
}
