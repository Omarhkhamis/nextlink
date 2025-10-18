"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Target,
  Eye,
  Award,
  Users,
  Clock,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
}

export default function About() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch("/api/team");
        const result = await response.json();
        if (result.data) {
          setTeam(result.data);
        }
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const values = [
    {
      icon: Target,
      title: "Mission",
      description:
        "To revolutionize modern living by making NextLink technology accessible, reliable, and intuitive for everyone.",
    },
    {
      icon: Eye,
      title: "Vision",
      description:
        "A world where every home intelligently adapts to its inhabitants, creating perfect comfort, security, and efficiency.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We deliver premium solutions with meticulous attention to detail, ensuring the highest standards in every project.",
    },
  ];

  const achievements = [
    { number: "10+", label: "Years of Experience" },
    { number: "500+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Industry Awards" },
  ];

  return (
    <main className="pt-20">
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMGQ0ZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              About <span className="text-brand-blue">NextLink</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're passionate about transforming houses into intelligent living
              spaces that enhance your lifestyle, security, and comfort.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl font-bold text-white mb-6">
                Our <span className="text-brand-green">Story</span>
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  NextLink began with a simple vision: to make advanced home
                  automation technology accessible to everyone. What started as
                  a small team of passionate engineers has grown into a leading
                  provider of intelligent home solutions.
                </p>
                <p>
                  Over the past decade, we've completed over 500 projects,
                  helping families and businesses create spaces that are not
                  just smart, but truly intelligent. Our systems learn, adapt,
                  and evolve with your lifestyle.
                </p>
                <p>
                  Today, we pride ourselves on being at the forefront of home
                  automation technology, offering cutting-edge solutions backed
                  by exceptional customer service and technical support.
                </p>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all hover:border-brand-blue/50"
                  >
                    <div className="text-4xl font-bold text-brand-blue mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-brand-blue/50 transition-all hover:shadow-xl hover:shadow-brand-blue/20 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6 relative">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-green/20">
                    <value.icon className="h-8 w-8 text-brand-blue" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Meet Our <span className="text-brand-blue">Team</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experienced professionals dedicated to bringing your NextLink
              vision to life
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-400">Loading team members...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={member.id}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:border-brand-blue/50 transition-all hover:shadow-xl hover:shadow-brand-blue/20 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-64 bg-gradient-to-br from-brand-blue/20 to-brand-green/20 flex items-center justify-center overflow-hidden">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Users className="h-24 w-24 text-white/20" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-brand-blue text-sm font-semibold mb-3">
                      {member.position}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Why Choose <span className="text-brand-green">Us</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We combine expertise, innovation, and exceptional service to
              deliver unmatched results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Fast Response Time",
                description:
                  "24/7 support with average response time under 2 hours",
              },
              {
                icon: Award,
                title: "Certified Experts",
                description:
                  "All technicians are certified and continuously trained",
              },
              {
                icon: TrendingUp,
                title: "Future-Proof Solutions",
                description: "Scalable systems that grow with your needs",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-brand-blue/50 transition-all hover:shadow-xl hover:shadow-brand-blue/20"
              >
                <feature.icon className="h-12 w-12 text-brand-green mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/start-project">
              <Button
                size="lg"
                className="bg-brand-blue hover:bg-brand-green text-black font-semibold px-10 py-6 text-lg group"
              >
                Start Your Project Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
