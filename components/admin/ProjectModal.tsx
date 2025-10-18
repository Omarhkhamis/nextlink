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
  onSave: (
    project: Omit<Project, "id"> & { gallery?: { url: string; alt?: string }[] }
  ) => void;
  project: Project | null;
}

// نوع داخلي للصور (بدون الاعتماد على تعريف خارجي)
type GalleryItem = { url: string; alt?: string };

// مولد slug بسيط من العنوان
function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
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
    long_description: "",
    location: "",
    category: "residential",
    image: "",
  });

  // حالة المعرض
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [uploading, setUploading] = useState(false);

  // عند فتح المودال أو تغيير المشروع، عبّئ البيانات والمعرض
  useEffect(() => {
    if (project) {
      // images قد تكون غير معرّفة في Project، لذا نقرأها بأمان
      const imagesFromProject =
        (
          project as unknown as {
            images?: { url: string; alt?: string | null }[];
          }
        ).images || [];

      setFormData({
        title: project.title,
        description: project.description,
        long_description: project.long_description ?? "",
        location: project.location,
        category: project.category,
        image: project.image,
      });

      setGallery(
        imagesFromProject.map((img) => ({
          url: img.url,
          alt: img.alt ?? undefined,
        }))
      );
    } else {
      setFormData({
        title: "",
        description: "",
        long_description: "",
        location: "",
        category: "residential",
        image: "",
      });
      setGallery([]);
    }
  }, [project, isOpen]);

  // رفع ملفات إلى السيرفر المحلي
  async function handleFiles(files: FileList | null) {
    if (!files || !files.length) return;

    // عنوان فارغ؟ استخدم "project" مؤقتًا
    const projectSlug = slugify(formData.title || "project");

    const fd = new FormData();
    fd.append("projectSlug", projectSlug);
    Array.from(files).forEach((f) => fd.append("files", f));

    try {
      setUploading(true);
      const res = await fetch("/api/uploads/project-images", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Upload failed");
      }
      const newUrls = (data.urls as string[]).map((url) => ({ url }));
      setGallery((prev) => [...prev, ...newUrls]);

      // لو ما في صورة غلاف محددة، خلّي أول صورة من المعرض غلافًا
      if (!formData.image && newUrls.length > 0) {
        setFormData((p) => ({ ...p, image: newUrls[0].url }));
      }
    } catch (e: any) {
      console.error(e);
      alert(e?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  // إزالة صورة من المعرض محلياً
  function removeGalleryIndex(i: number) {
    setGallery((prev) => prev.filter((_, idx) => idx !== i));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // لو صورة الغلاف غير محددة وجاليري موجود، اجعل الأولى غلافًا
    const cover = formData.image || (gallery[0]?.url ?? "");

    onSave({
      title: formData.title,
      description: formData.description,
      long_description: formData.long_description || undefined,
      location: formData.location,
      category: formData.category,
      image: cover,
      // نمرّر المعرض إلى الـ API (PUT/POST ستتعامل معه)
      gallery: gallery.map((g, i) => ({ url: g.url, alt: g.alt })),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-white/10 text-white max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {project ? "Edit Project" : "Add New Project"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            <p className="text-xs text-gray-400">
              Slug: {slugify(formData.title || "project")}
            </p>
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

          {/* Detailed Description (اختياري) */}
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

          {/* Cover Image URL (اختياري؛ سيُستمد من أول صورة إذا تُرك فارغًا) */}
          <div className="space-y-2">
            <Label htmlFor="image">Cover Image URL</Label>
            <Input
              id="image"
              type="url"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="bg-white/5 border-white/10 text-white"
              placeholder="https://example.com/image.jpg (optional)"
            />
            <p className="text-xs text-gray-400">
              If left empty, the first gallery image will be used as cover.
            </p>
          </div>

          {/* Gallery Uploader */}
          <div className="space-y-2">
            <Label htmlFor="gallery">Gallery Images</Label>
            <input
              id="gallery"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="block w-full text-sm file:mr-4 file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-white hover:file:bg-white/20"
            />
            {uploading && <p className="text-sm text-gray-400">Uploading...</p>}

            {/* Previews */}
            {!!gallery.length && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {gallery.map((img, i) => (
                  <div key={`${img.url}-${i}`} className="relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.alt || ""}
                      className="h-28 w-full object-cover rounded border border-white/10"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryIndex(i)}
                      className="absolute top-1 right-1 bg-black/70 text-white rounded px-2 py-0.5 text-xs opacity-0 group-hover:opacity-100 transition"
                      title="Remove"
                    >
                      ×
                    </button>
                    <div className="absolute bottom-1 left-1 bg-black/60 text-[10px] px-1.5 py-0.5 rounded">
                      {i === 0 ? "Will be cover if empty" : `#${i + 1}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
              disabled={uploading}
            >
              {project ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
