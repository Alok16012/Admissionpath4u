"use client";

import { ILead } from "@/models/Lead";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateLeadStatus } from "@/app/actions/lead";

import { Badge } from "@/components/ui/badge"; // Need to add badge shadecn

// I'll use native date for now to avoid installing date-fns if not needed, or install if I want it nice.
// "Modern dashboard layout" implies nice date formatting.
// I'll use new Date().toLocaleDateString()

export function LeadManager({ initialLeads }: { initialLeads: any[] }) {
  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateLeadStatus(id, newStatus);
  };

  const getSourceColor = (source: string) => {
    if (!source || source === "Contact Page") return "bg-gray-100 text-gray-700";
    if (source.startsWith("College Page")) return "bg-blue-100 text-blue-700";
    if (source.startsWith("Course Page")) return "bg-purple-100 text-purple-700";
    if (source.startsWith("Service Page")) return "bg-orange-100 text-orange-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
        <span className="text-sm text-muted-foreground">{initialLeads.length} total leads</span>
      </div>
      <div className="border rounded-md bg-white dark:bg-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  No leads yet.
                </TableCell>
              </TableRow>
            ) : (
              initialLeads.map((lead) => (
                <TableRow key={lead._id}>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric"
                    })}
                  </TableCell>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell className="text-sm">{lead.email}</TableCell>
                  <TableCell className="text-sm">{lead.phone}</TableCell>
                  <TableCell className="text-sm">{lead.interestedCourse || "—"}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getSourceColor(lead.source)}`}>
                      {lead.source || "Contact Page"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={lead.status}
                      onValueChange={(val) => handleStatusChange(lead._id, val)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="enrolled">Enrolled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
