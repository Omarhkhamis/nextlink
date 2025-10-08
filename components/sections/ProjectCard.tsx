import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  location: string;
  category: string;
  image?: string;
  href?: string;
}

export default function ProjectCard({
  title,
  description,
  location,
  category,
  image,
  href = '#',
}: ProjectCardProps) {
  return (
    <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:border-brand-blue/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-blue/20 group overflow-hidden">
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-brand-blue/20 to-brand-green/20">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold text-white/10">{title.charAt(0)}</div>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className="bg-brand-blue/90 text-black text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl text-white group-hover:text-brand-blue transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="flex items-center text-gray-400 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{description}</p>
      </CardContent>

      <CardFooter>
        <Link href={href} className="w-full">
          <Button
            variant="ghost"
            className="w-full text-brand-blue hover:text-brand-green hover:bg-white/5 group/btn"
          >
            View Project Details
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
