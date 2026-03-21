"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { ServiceForm } from "./service-form";
import { Plus, Pencil, Trash, Eye } from "lucide-react";
import { deleteService } from "@/app/actions/service";
import Link from "next/link";

export function ServiceManager({ initialServices }: { initialServices: any[] }) {
  const [open, setOpen] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [services, setServices] = useState(initialServices);

  const handleAdd = () => {
    setEditingService(null);
    setOpen(true);
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s._id !== id));
    }
  };

  const handleSuccess = (updatedService: any) => {
    if (editingService) {
      setServices((prev) =>
        prev.map((s) => (s._id === updatedService._id ? updatedService : s))
      );
    } else {
      setServices((prev) => [updatedService, ...prev]);
    }
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Services</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage services shown on the public website
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </div>

      <div className="border rounded-md bg-white dark:bg-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Features</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No services found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              services.map((service) => (
                <TableRow key={service._id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{service.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
                        {service.shortDescription}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {service.icon}
                    </code>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {service.features?.length || 0} features
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={service.isActive ? "default" : "secondary"}>
                      {service.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{service.order}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/services/${service.slug}`} target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(service)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(service._id)}
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

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="overflow-y-auto sm:max-w-2xl w-full px-8">
          <SheetHeader>
            <SheetTitle>
              {editingService ? "Edit Service" : "Add New Service"}
            </SheetTitle>
            <SheetDescription>
              {editingService
                ? "Update the service details below."
                : "Fill in all details to create a new service page."}
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <ServiceForm
              service={editingService}
              onSuccess={handleSuccess}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
