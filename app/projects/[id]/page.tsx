"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MapPin, Calendar, ArrowLeft, Tag, Images, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// Modal removed per request

interface ProjectImage {
  id: number;
  url: string;
  alt?: string | null;
  position?: number | null;
}

interface Project {
  id: number;
  title: string;
  description: string;
  long_description?: string;
  location: string;
  category: string;
  image: string; // صورة الغلاف
  created_at: string;
  images?: ProjectImage[]; // ✅ المعرض الاختياري
}

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // Hooks must not be conditional: compute image list and lightbox state up-front
  const allImages = useMemo(() => {
    const cover = project?.image || "";
    const gallery = (project?.images ?? []).map((i) => i.url).filter(Boolean) as string[];
    const distinct = gallery.filter((u) => u && u !== cover);
    return cover ? [cover, ...distinct] : distinct;
  }, [project?.image, project?.images]);

  const hasImages = allImages.length > 0 && !!allImages[0];
  const [startIndex, setStartIndex] = useState(0);
  const next = () => {
    if (allImages.length > 3) setStartIndex((i) => (i + 1) % allImages.length);
  };
  const prev = () => {
    if (allImages.length > 3)
      setStartIndex((i) => (i - 1 + allImages.length) % allImages.length);
  };
  // Drag/swipe handling (mouse + touch via Pointer Events)
  const drag = useRef<{ active: boolean; startX: number; moved: boolean }>({
    active: false,
    startX: 0,
    moved: false,
  });
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (allImages.length <= 3) return;
    drag.current.active = true;
    drag.current.startX = e.clientX;
    drag.current.moved = false;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    const threshold = 50;
    if (Math.abs(dx) > threshold) {
      drag.current.moved = true;
      if (dx < 0) next();
      else prev();
      drag.current.active = false;
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };
  const onPointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current.active = false;
    drag.current.moved = false;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };
  const visibleImages = useMemo(() => {
    if (!hasImages) return [] as string[];
    const len = allImages.length;
    const items: string[] = [];
    items.push(allImages[startIndex]);
    if (len > 1) items.push(allImages[(startIndex + 1) % len]);
    if (len > 2) items.push(allImages[(startIndex + 2) % len]);
    return items;
  }, [allImages, startIndex, hasImages]);

  useEffect(() => {
    const fetchProject = async () => {
      if (!params?.id) return;
      try {
        const response = await fetch(`/api/projects/${params.id}`);
        if (response.ok) {
          const result = await response.json();
          setProject(result.data as Project);
        } else {
          router.push("/projects");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        router.push("/projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params?.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Project not found.</div>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-black pt-16 md:pt-20">
      {/* Hero */}
      <div className="relative h-[500px] w-full overflow-hidden">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-blue/20 to-brand-green/20 flex items-center justify-center">
            <div className="text-9xl font-bold text-white/10">
              {project.title.charAt(0)}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute top-8 left-8">
          <Button
            onClick={() => router.push("/projects")}
            variant="ghost"
            className="text-white hover:text-brand-blue hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Projects
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-brand-blue/90 text-black text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <Tag className="h-4 w-4" />
              {project.category}
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <div className="flex items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-blue" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-brand-blue" />
                <span>
                  {new Date(project.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Image Mosaic with slider (no modal) */}
        {hasImages && (
          <div
            className="relative mb-10 select-none touch-pan-y cursor-grab active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
            onPointerLeave={onPointerEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={visibleImages[0]}
                  alt={project.title}
                  className="w-full h-[360px] md:h-[480px] object-cover rounded border border-white/10"
                />
              </div>
              <div className="flex md:block flex-row gap-3 md:gap-0">
                {visibleImages.slice(1).map((src, i) => (
                  <div key={`side-${i}`} className="relative flex-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={project.title}
                      className="w-full h-[177px] md:h-[236px] object-cover rounded border border-white/10"
                    />
                  </div>
                ))}
              </div>
            </div>
            {allImages.length > 3 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 md:p-3 border border-white/10 shadow-md"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 md:p-3 border border-white/10 shadow-md"
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Project Overview
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
            </Card>

            {/* Detailed Description */}
            {project.long_description && (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Detailed Description
                  </h2>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {project.long_description}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ✅ Gallery */}
            {project.images && project.images.length > 0 && false && (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="h-5 w-5 text-brand-blue" />
                    <h2 className="text-2xl font-bold text-white">Gallery</h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(project?.images ?? []).map((img) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={img.id}
                        src={img.url}
                        alt={img.alt ?? ""}
                        className="w-full h-40 md:h-48 object-cover rounded border border-white/10"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Category</p>
                    <p className="text-white font-medium">{project.category}</p>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-gray-400 text-sm mb-1">Location</p>
                    <p className="text-white font-medium">{project.location}</p>
                  </div>
                  
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-brand-blue/20 to-brand-green/20 border-white/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  Interested in this project?
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Get in touch with us to learn more about this project and how
                  we can help you.
                </p>
                <Button
                  onClick={() => router.push("/contact")}
                  className="w-full bg-brand-blue hover:bg-brand-green text-black font-semibold"
                >
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal removed */}
    </div>
  );
}
