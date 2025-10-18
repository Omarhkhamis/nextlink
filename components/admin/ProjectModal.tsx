"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Project } from "@/app/admin/dashboard/projects/page";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Omit<Project, "id">) => void;
  project: Project | null;
}

export default function ProjectModal({
  isOpen,
  onClose,
  onSave,
  project,
}: ProjectModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    long_description: "", // ✅ جديد
    location: "",
    category: "residential",
    image: "",
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        long_description: project.long_description ?? "", // ✅ تعبئة إذا متوفر
        location: project.location,
        category: project.category,
        image: project.image,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        long_description: "", // ✅ افتراضي فارغ
        location: "",
        category: "residential",
        image: "",
      });
    }
  }, [project, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ✅ نرسل long_description ضمن البيانات
    onSave({
      title: formData.title,
      description: formData.description,
      long_description: formData.long_description || undefined, // اختياري
      location: formData.location,
      category: formData.category,
      image: formData.image,
    } as Omit<Project, "id">);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-white/10 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {project ? "Edit Project" : "Add New Project"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="bg-white/5 border-white/10 text-white"
              required
            />
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-white/5 border-white/10 text-white"
              rows={3}
              required
            />
          </div>

          {/* ✅ Detailed Description (اختياري) */}
          <div className="space-y-2">
            <Label htmlFor="long_description">Detailed Description</Label>
            <Textarea
              id="long_description"
              value={formData.long_description}
              onChange={(e) =>
                setFormData({ ...formData, long_description: e.target.value })
              }
              className="bg-white/5 border-white/10 text-white"
              rows={8}
              placeholder="Add more details about the project (optional)"
            />
          </div>

          {/* Location + Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/10">
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="url"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="bg-white/5 border-white/10 text-white"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-brand-blue hover:bg-brand-green text-black font-semibold"
            >
              {project ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
