"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
} from "@/components/ui/form";
import { createCollege, updateCollege } from "@/app/actions/college";
import { uploadImage } from "@/app/actions/upload";
import { Loader2 } from "lucide-react";
import { ICollege } from "@/models/College";

// Need to match shadcn form structure usage which I haven't installed 'form' component for yet.
// I should install shadcn form: npx shadcn@latest add form

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  state: z.string().min(2, "State is required"),
  city: z.string().min(2, "City is required"),
  courses: z.string().min(2, "Courses are required"), // We accept comma separated
  fees: z.coerce.number().min(0, "Fees must be positive"),
  description: z.string().min(10, "Description is required"),
  highestPackage: z.coerce.number().optional(),
  averagePackage: z.coerce.number().optional(),
});

interface CollegeFormProps {
  college?: ICollege;
  onSuccess: () => void;
}

export function CollegeForm({ college, onSuccess }: CollegeFormProps) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: college?.name || "",
      state: college?.state || "",
      city: college?.city || "",
      courses: college?.courses?.join(", ") || "",
      fees: college?.fees || 0,
      description: college?.description || "",
      highestPackage: college?.highestPackage || 0,
      averagePackage: college?.averagePackage || 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      let imageUrl = college?.images?.[0]; // Keep existing if no new file

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const result = await uploadImage(formData);
        if (result.error) throw new Error(result.error);
        imageUrl = result.url;
      }

      const data = {
        ...values,
        courses: values.courses
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        images: imageUrl ? [imageUrl] : [],
      };

      if (college?._id) {
        const res = await updateCollege(college._id as unknown as string, data);
        if (!res.success) throw new Error(res.error);
      } else {
        const res = await createCollege(data);
        if (!res.success) throw new Error(res.error);
      }

      onSuccess();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="courses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Courses (comma separated)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="B.Tech, MBA, BBA" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fees (per year)</FormLabel>
              <FormControl>
                <Input type="number" {...field} value={field.value as number} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="highestPackage"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Highest Package (LPA)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={(field.value as number) || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="averagePackage"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Average Package (LPA)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    value={(field.value as number) || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormLabel>Image</FormLabel>
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {college ? "Update College" : "Add College"}
        </Button>
      </form>
    </Form>
  );
}
