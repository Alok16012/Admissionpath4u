"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { saveHeroSettings } from "@/app/actions/settings";
import { uploadImage } from "@/app/actions/upload";
import { Loader2, Plus, Trash2, Upload, ExternalLink, GripVertical } from "lucide-react";
import Link from "next/link";

interface HeroEditorProps {
  initialSettings: any;
}

export function HeroEditor({ initialSettings }: HeroEditorProps) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [heroTitle, setHeroTitle] = useState(
    initialSettings?.heroTitle || "Find Your Dream College"
  );
  const [heroSubtitle, setHeroSubtitle] = useState(
    initialSettings?.heroSubtitle ||
      "Explore thousands of colleges, courses, and scholarships to kickstart your career."
  );
  const [heroImages, setHeroImages] = useState<string[]>(
    initialSettings?.heroImages || []
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const url = await uploadImage(formData);
      setHeroImages((prev) => [...prev, url]);
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setHeroImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);
    try {
      const res = await saveHeroSettings({ heroImages, heroTitle, heroSubtitle });
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Homepage</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Edit the hero banner images and text shown on the homepage
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild size="sm">
            <Link href="/" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Preview
            </Link>
          </Button>
          <Button onClick={handleSave} disabled={loading} size="sm">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Hero Text */}
      <section className="bg-white rounded-2xl border p-6 space-y-5">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Hero Text</h3>
        <div className="space-y-2">
          <Label>Main Heading</Label>
          <Input
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            placeholder="Find Your Dream College"
          />
        </div>
        <div className="space-y-2">
          <Label>Subtitle / Description</Label>
          <Textarea
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            rows={3}
            placeholder="Explore thousands of colleges..."
          />
        </div>
      </section>

      {/* Banner Images */}
      <section className="bg-white rounded-2xl border p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <div>
            <h3 className="font-semibold text-gray-800">Banner Images</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Images auto-rotate every 5 seconds on homepage
            </p>
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              ) : (
                <Upload className="w-3 h-3 mr-1" />
              )}
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>
          </div>
        </div>

        {heroImages.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-sm border-2 border-dashed rounded-xl">
            No banner images yet. Upload at least one image.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {heroImages.map((url, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 bg-gray-50"
              >
                <GripVertical className="w-4 h-4 text-gray-300 shrink-0" />
                <div className="relative w-32 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-200">
                  <Image src={url} alt={`Banner ${i + 1}`} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-600">Slide {i + 1}</p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{url}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeImage(i)}
                  className="text-red-400 hover:text-red-600 hover:bg-red-50 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400">
          Recommended: landscape images, at least 1200×600px. PNG or JPG.
        </p>
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
