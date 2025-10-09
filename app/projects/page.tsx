"use client";

import ProjectCard from "@/components/sections/ProjectCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  location: string;
  category: string;
  image: string;
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["all", "residential", "commercial", "luxury"];

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // تحقق إذا params موجودة
        if (!params || !params.id) {
          console.warn("Project ID is missing! Using placeholder data.");
          setProject({
            id: 0,
            title: "Placeholder Project",
            description:
              "This is placeholder content. Add real projects from the dashboard.",
            location: "Unknown",
            category: "residential",
            image: "/placeholder-image.jpg",
          });
          return;
        }

        const response = await fetch(`/api/projects/${params.id}`);
        if (response.ok) {
          const result = await response.json();
          setProject(result.data);
        }
      } catch (error) {
        console.error(error);
        // في حالة حدوث خطأ
        setProject({
          id: 0,
          title: "Placeholder Project",
          description:
            "This is placeholder content. Add real projects from the dashboard.",
          location: "Unknown",
          category: "residential",
          image: "/placeholder-image.jpg",
        });
      }
    };

    fetchProject();
  }, [params]);

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <main className="pt-20">
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMGQ0ZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              Our <span className="text-brand-blue">Projects</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of successful NextLink installations across
              residential, commercial, and luxury properties
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setFilter(category)}
                variant={filter === category ? "default" : "outline"}
                className={
                  filter === category
                    ? "bg-brand-blue hover:bg-brand-green text-black font-semibold"
                    : "border-white/20 text-gray-300 hover:border-brand-blue hover:text-brand-blue hover:bg-white/5"
                }
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard {...project} href={`/projects/${project.id}`} />
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-brand-blue/10 to-brand-green/10 border border-white/10 rounded-3xl p-12 text-center backdrop-blur-lg">
            <h2 className="text-4xl font-bold text-white mb-6">
              Want a Similar Project?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Every home is unique. Let us create a custom NextLink solution
              tailored to your specific needs and preferences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/start-project">
                <Button
                  size="lg"
                  className="bg-brand-blue hover:bg-brand-green text-black font-semibold px-10 py-6 text-lg group"
                >
                  Request a Similar Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-brand-green text-brand-green hover:bg-brand-green/10 px-10 py-6 text-lg"
                >
                  Get Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
