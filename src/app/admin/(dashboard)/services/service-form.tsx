"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createService, updateService } from "@/app/actions/service";
import { uploadImage } from "@/app/actions/upload";
import { Loader2, Plus, Trash2, GripVertical } from "lucide-react";
import { IService } from "@/models/Service";

const ICON_OPTIONS = [
  "Search", "Banknote", "FileText", "Building2", "BadgeIndianRupee",
  "GraduationCap", "BookOpen", "Users", "Star", "Trophy", "Award",
  "Lightbulb", "Target", "CheckCircle", "Shield", "Globe", "Zap",
  "Heart", "Clock", "Phone",
];

const formSchema = z.object({
  title: z.string().min(2, "Title is required"),
  shortDescription: z.string().min(10, "Short description is required").max(300, "Max 300 characters"),
  fullDescription: z.string().min(20, "Full description is required"),
  icon: z.string().min(1, "Icon is required"),
  ctaText: z.string(),
  isActive: z.boolean(),
  order: z.coerce.number(),
  features: z.array(z.object({ value: z.string() })),
  benefits: z.array(z.object({ value: z.string() })),
  processSteps: z.array(
    z.object({ title: z.string(), description: z.string() })
  ),
  faqs: z.array(
    z.object({ question: z.string(), answer: z.string() })
  ),
});

interface ServiceFormProps {
  service?: IService | null;
  onSuccess: (service: any) => void;
}

export function ServiceForm({ service, onSuccess }: ServiceFormProps) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: (service as any)?.title || "",
      shortDescription: (service as any)?.shortDescription || "",
      fullDescription: (service as any)?.fullDescription || "",
      icon: (service as any)?.icon || "Star",
      ctaText: (service as any)?.ctaText || "Contact Us",
      isActive: (service as any)?.isActive ?? true,
      order: (service as any)?.order ?? 0,
      features: ((service as any)?.features || []).map((v: string) => ({ value: v })),
      benefits: ((service as any)?.benefits || []).map((v: string) => ({ value: v })),
      processSteps: (service as any)?.processSteps || [],
      faqs: (service as any)?.faqs || [],
    },
  });

  const featuresArray = useFieldArray({ control: form.control, name: "features" });
  const benefitsArray = useFieldArray({ control: form.control, name: "benefits" });
  const stepsArray = useFieldArray({ control: form.control, name: "processSteps" });
  const faqsArray = useFieldArray({ control: form.control, name: "faqs" });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      let imageUrl = (service as any)?.image;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const result = await uploadImage(formData);
        if (result.error) throw new Error(result.error);
        imageUrl = result.url;
      }

      const data: any = {
        ...values,
        features: values.features.map((f) => f.value).filter(Boolean),
        benefits: values.benefits.map((b) => b.value).filter(Boolean),
        processSteps: values.processSteps.filter((s) => s.title && s.description),
        faqs: values.faqs.filter((f) => f.question && f.answer),
        image: imageUrl,
      };

      let res;
      if ((service as any)?._id) {
        res = await updateService((service as any)._id, data);
      } else {
        res = await createService(data);
      }

      if (!res.success) throw new Error(res.error);
      onSuccess(res.data);
    } catch (error: any) {
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* Basic Info */}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Basic Info</h3>
          <div className="h-px bg-gray-100" />
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Title *</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. College Finder" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ICON_OPTIONS.map((icon) => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ctaText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button Text</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Contact Us" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description * (shown on cards)</FormLabel>
              <FormControl>
                <Textarea {...field} rows={2} placeholder="Brief 1-2 line description for the service card..." />
              </FormControl>
              <FormDescription>{field.value?.length || 0}/300 characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fullDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Description * (shown on detail page)</FormLabel>
              <FormControl>
                <Textarea {...field} rows={5} placeholder="Detailed description of the service, its purpose, process, and value..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <div className="space-y-2">
          <FormLabel>Cover Image</FormLabel>
          {(service as any)?.image && (
            <p className="text-xs text-muted-foreground">Current image will be replaced if you upload a new one.</p>
          )}
          <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>Lower = shown first</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-center">
                <FormLabel>Active</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormDescription>Show on public website</FormDescription>
              </FormItem>
            )}
          />
        </div>

        {/* Features */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Key Features</h3>
              <p className="text-xs text-muted-foreground">What makes this service special</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => featuresArray.append({ value: "" })}>
              <Plus className="w-3 h-3 mr-1" /> Add
            </Button>
          </div>
          <div className="space-y-2">
            {featuresArray.fields.map((field, i) => (
              <div key={field.id} className="flex gap-2">
                <GripVertical className="w-4 h-4 text-gray-300 mt-2.5 flex-shrink-0" />
                <FormField
                  control={form.control}
                  name={`features.${i}.value`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input {...field} placeholder="e.g. Personalized Recommendations" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => featuresArray.remove(i)} className="text-red-500 hover:text-red-600 flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Benefits</h3>
              <p className="text-xs text-muted-foreground">Why students should choose this</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => benefitsArray.append({ value: "" })}>
              <Plus className="w-3 h-3 mr-1" /> Add
            </Button>
          </div>
          <div className="space-y-2">
            {benefitsArray.fields.map((field, i) => (
              <div key={field.id} className="flex gap-2">
                <GripVertical className="w-4 h-4 text-gray-300 mt-2.5 flex-shrink-0" />
                <FormField
                  control={form.control}
                  name={`benefits.${i}.value`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input {...field} placeholder="e.g. Save time with curated shortlists" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => benefitsArray.remove(i)} className="text-red-500 hover:text-red-600 flex-shrink-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">How It Works (Steps)</h3>
              <p className="text-xs text-muted-foreground">Step-by-step process</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => stepsArray.append({ title: "", description: "" })}>
              <Plus className="w-3 h-3 mr-1" /> Add Step
            </Button>
          </div>
          <div className="space-y-3">
            {stepsArray.fields.map((field, i) => (
              <div key={field.id} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400 uppercase">Step {i + 1}</span>
                  <Button type="button" variant="ghost" size="icon" onClick={() => stepsArray.remove(i)} className="text-red-500 hover:text-red-600 h-7 w-7">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name={`processSteps.${i}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Step title, e.g. Fill Your Profile" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`processSteps.${i}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea {...field} rows={2} placeholder="What happens in this step..." />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">FAQs</h3>
              <p className="text-xs text-muted-foreground">Common questions & answers</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => faqsArray.append({ question: "", answer: "" })}>
              <Plus className="w-3 h-3 mr-1" /> Add FAQ
            </Button>
          </div>
          <div className="space-y-3">
            {faqsArray.fields.map((field, i) => (
              <div key={field.id} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400 uppercase">FAQ {i + 1}</span>
                  <Button type="button" variant="ghost" size="icon" onClick={() => faqsArray.remove(i)} className="text-red-500 hover:text-red-600 h-7 w-7">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name={`faqs.${i}.question`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Question..." />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`faqs.${i}.answer`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea {...field} rows={2} placeholder="Answer..." />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {(service as any)?._id ? "Update Service" : "Create Service"}
        </Button>
      </form>
    </Form>
  );
}
