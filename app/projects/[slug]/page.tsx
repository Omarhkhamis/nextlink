"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MapPin, Calendar, ArrowLeft, Tag, Images, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  image: string;
  created_at: string;
  images?: ProjectImage[];
}

export default function ProjectDetailBySlugPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!params?.slug) return;
      try {
        const response = await fetch(`/api/projects?slug=${params.slug}`);
        if (response.ok) {
          const result = await response.json();
          setProject(result.data as Project);
        } else {
          router.push("/projects");
        }
      } catch (error) {
        console.error("Error fetching project by slug:", error);
        router.push("/projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [params?.slug, router]);

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
    if (allImages.length > 3) setStartIndex((i) => (i - 1 + allImages.length) % allImages.length);
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

  return (
    <div className="min-h-screen bg-black pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between mb-4">
          <Button onClick={() => router.push('/projects')} variant="ghost" className="text-white hover:text-brand-blue hover:bg-white/10">
            <ArrowLeft className="mr-2 h-5 w-5" />Back to Projects
          </Button>
          <div className="inline-flex items-center gap-2 bg-brand-blue/90 text-black text-sm font-semibold px-4 py-2 rounded-full">
            <Tag className="h-4 w-4" />{project.category}
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{project.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6">
          <div className="flex items-center gap-2"><MapPin className="h-5 w-5 text-brand-blue" /><span>{project.location}</span></div>
          <div className="flex items-center gap-2"><Calendar className="h-5 w-5 text-brand-blue" /><span>{new Date(project.created_at).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</span></div>
        </div>
        {hasImages && (
          <div className="relative mb-10 select-none touch-pan-y">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2 relative">
                <img src={visibleImages[0]} alt={project.title} className="w-full h-[360px] md:h-[480px] object-cover rounded border border-white/10" />
              </div>
              <div className="flex md:block flex-row gap-3 md:gap-0">
                {visibleImages.slice(1).map((src, i) => (
                  <div key={`side-${i}`} className="relative flex-1">
                    <img src={src} alt={project.title} className="w-full h-[177px] md:h-[236px] object-cover rounded border border-white/10" />
                  </div>
                ))}
              </div>
            </div>
            {allImages.length > 3 && (
              <>
                <button type="button" onClick={() => setStartIndex((i)=> (i-1+allImages.length)%allImages.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 md:p-3 border border-white/10 shadow-md" aria-label="Previous">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button type="button" onClick={() => setStartIndex((i)=> (i+1)%allImages.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 md:p-3 border border-white/10 shadow-md" aria-label="Next">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white/5 border-white/10"><CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
              <p className="text-gray-300 leading-relaxed">{project.description}</p>
            </CardContent></Card>
            {project.long_description && (
              <Card className="bg-white/5 border-white/10"><CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Detailed Description</h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{project.long_description}</div>
              </CardContent></Card>
            )}
          </div>
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10"><CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
              <div className="space-y-4">
                <div><p className="text-gray-400 text-sm mb-1">Category</p><p className="text-white font-medium">{project.category}</p></div>
                <div className="border-t border-white/10 pt-4"><p className="text-gray-400 text-sm mb-1">Location</p><p className="text-white font-medium">{project.location}</p></div>
              </div>
            </CardContent></Card>
            <Card className="bg-gradient-to-br from-brand-blue/20 to-brand-green/20 border-white/10"><CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">Interested in this project?</h3>
              <p className="text-gray-300 text-sm mb-4">Get in touch with us to learn more about this project and how we can help you.</p>
              <Button onClick={() => router.push('/contact')} className="w-full bg-brand-blue hover:bg-brand-green text-black font-semibold">Contact Us</Button>
            </CardContent></Card>
          </div>
        </div>
      </div>
    </div>
  );
}
