import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
}

export default function ServiceCard({ icon: Icon, title, description, features }: ServiceCardProps) {
  return (
    <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:border-brand-blue/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-blue/20 group">
      <CardHeader>
        <div className="mb-4 relative">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-green/20 group-hover:from-brand-blue/30 group-hover:to-brand-green/30 transition-all">
            <Icon className="h-8 w-8 text-brand-blue group-hover:text-brand-green transition-colors" />
          </div>
          <div className="absolute inset-0 blur-2xl bg-brand-blue/10 group-hover:bg-brand-blue/20 transition-all" />
        </div>
        <CardTitle className="text-2xl text-white group-hover:text-brand-blue transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-400 text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      {features && features.length > 0 && (
        <CardContent>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm text-gray-300">
                <span className="text-brand-green mt-1">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  );
}
