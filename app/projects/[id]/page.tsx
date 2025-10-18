"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MapPin, Calendar, ArrowLeft, Tag, Images } from "lucide-react";
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
  image: string; // صورة الغلاف
  created_at: string;
  images?: ProjectImage[]; // ✅ المعرض الاختياري
}

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-black pt-20 md:pt-24">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
            {project.images && project.images.length > 0 && (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Images className="h-5 w-5 text-brand-blue" />
                    <h2 className="text-2xl font-bold text-white">Gallery</h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.images.map((img) => (
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
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-gray-400 text-sm mb-1">Date Added</p>
                    <p className="text-white font-medium">
                      {new Date(project.created_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
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
    </div>
  );
}
