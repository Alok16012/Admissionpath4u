"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { COURSE_CONFIG, ALL_COURSES } from "@/lib/course-config";
import { deleteCollege } from "@/app/actions/college";
import { CollegeForm } from "../colleges/college-form";
import { Plus, Pencil, Trash, Eye, BookOpen, ExternalLink } from "lucide-react";

interface CoursesOverviewProps {
  courseStats: { slug: string; name: string; count: number }[];
  colleges: any[];
}

export function CoursesOverview({ courseStats, colleges }: CoursesOverviewProps) {
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingCollege, setEditingCollege] = useState<any | null>(null);
  const [collegeList, setCollegeList] = useState(colleges);

  const activeCourseConfig = activeCourse ? COURSE_CONFIG[activeCourse] : null;

  const filteredColleges = activeCourse
    ? collegeList.filter((c: any) =>
        c.courses?.some((course: string) =>
          course.toLowerCase().includes(activeCourseConfig!.name.toLowerCase())
        )
      )
    : [];

  const handleAdd = () => {
    setEditingCollege(null);
    setSheetOpen(true);
  };

  const handleEdit = (college: any) => {
    setEditingCollege(college);
    setSheetOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this college?")) {
      await deleteCollege(id);
      setCollegeList((prev) => prev.filter((c) => c._id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage colleges for each course category
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/colleges">
            <BookOpen className="mr-2 h-4 w-4" /> Manage All Colleges
          </Link>
        </Button>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courseStats.map((stat) => {
          const config = COURSE_CONFIG[stat.slug];
          return (
            <div
              key={stat.slug}
              onClick={() => setActiveCourse(activeCourse === stat.slug ? null : stat.slug)}
              className={`cursor-pointer rounded-2xl border p-5 transition-all hover:shadow-md ${
                activeCourse === stat.slug
                  ? "border-[#27465B] bg-[#27465B]/5 shadow-md"
                  : "border-gray-100 bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">{stat.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{config?.fullName}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#27465B]">{stat.count}</p>
                  <p className="text-xs text-gray-400">Colleges</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Link
                  href={`/courses/${stat.slug}`}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Page
                </Link>
                <span className="text-gray-200">|</span>
                <span className="text-xs text-gray-400">
                  {activeCourse === stat.slug ? "Click to collapse" : "Click to manage"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Colleges for selected course */}
      {activeCourse && activeCourseConfig && (
        <div className="border rounded-2xl bg-white overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b bg-gray-50">
            <div>
              <h3 className="font-bold text-gray-900">
                {activeCourseConfig.name} Colleges
              </h3>
              <p className="text-sm text-gray-500">{filteredColleges.length} colleges in this category</p>
            </div>
            <Button onClick={handleAdd} size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add College
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>College Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead>Highest Pkg</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredColleges.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No colleges found for {activeCourseConfig.name}. Add one above.
                  </TableCell>
                </TableRow>
              ) : (
                filteredColleges.map((college: any) => (
                  <TableRow key={college._id}>
                    <TableCell>
                      <p className="font-medium">{college.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {college.courses.join(", ")}
                      </p>
                    </TableCell>
                    <TableCell>{college.city}, {college.state}</TableCell>
                    <TableCell>₹{college.fees?.toLocaleString()}</TableCell>
                    <TableCell>
                      {college.highestPackage ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          ₹{college.highestPackage} LPA
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">N/A</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/colleges/${college.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(college)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(college._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit College Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="overflow-y-auto sm:max-w-xl w-full px-8">
          <SheetHeader>
            <SheetTitle>{editingCollege ? "Edit College" : "Add New College"}</SheetTitle>
            <SheetDescription>
              {editingCollege ? "Update college details." : `Add a college for ${activeCourseConfig?.name}`}
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <CollegeForm
              college={editingCollege}
              onSuccess={() => {
                setSheetOpen(false);
                window.location.reload();
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
