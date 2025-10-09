import Hero from '@/components/sections/Hero';
import ServiceCard from '@/components/sections/ServiceCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Lightbulb, Thermometer, Shield, Monitor, Mic, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const services = [
    {
      icon: Lightbulb,
      title: 'Smart Lighting',
      description: 'Intelligent lighting control that adapts to your lifestyle and saves energy',
    },
    {
      icon: Thermometer,
      title: 'HVAC Control',
      description: 'Climate control systems that maintain perfect comfort while optimizing efficiency',
    },
    {
      icon: Shield,
      title: 'Security & Surveillance',
      description: 'Advanced security systems with real-time monitoring and instant alerts',
    },
    {
      icon: Monitor,
      title: 'Home Cinema',
      description: 'Premium audio-visual experiences with seamless integration and control',
    },
    {
      icon: Mic,
      title: 'Voice Integration',
      description: 'Alexa, Google Home, and Home Assistant integration for hands-free control',
    },
  ];

  const features = [
    'Expert consultation and system design',
    'Professional installation by certified technicians',
    'Seamless integration with existing systems',
    '24/7 technical support and maintenance',
    'Energy efficiency optimization',
    'Future-proof scalable solutions',
  ];

  return (
    <main>
      <Hero
        title="Towards a Home That Understands You"
        subtitle="Smart automation, safety, comfort, and energy efficiency"
        primaryButtonText="Get Free Consultation"
        primaryButtonLink="/contact"
        secondaryButtonText="View Projects"
        secondaryButtonLink="/projects"
        showVideo
      />

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Our <span className="text-brand-blue">Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive NextLink solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-brand-blue text-brand-blue hover:bg-brand-blue/10 group"
              >
                View All Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Why Choose <span className="text-brand-green">NextLink</span>?
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                We transform ordinary houses into intelligent homes that anticipate your needs,
                enhance your comfort, and provide unparalleled security and energy efficiency.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-brand-green flex-shrink-0 mt-1" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              <Link href="/about">
                <Button
                  size="lg"
                  className="mt-8 bg-brand-green hover:bg-brand-blue text-black font-semibold group"
                >
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                <div className="relative h-[500px]">
                  <Image
                    src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Modern NextLink interior"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: '10+', label: 'Years Experience' },
                        { value: '500+', label: 'Happy Clients' },
                        { value: '98%', label: 'Satisfaction' },
                        { value: '24/7', label: 'Support' },
                      ].map((stat, index) => (
                        <div
                          key={index}
                          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 text-center hover:bg-white/20 transition-all"
                        >
                          <div className="text-2xl font-bold text-brand-blue mb-1">{stat.value}</div>
                          <div className="text-gray-200 text-xs">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl animate-float" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-green/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMGQ0ZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Home?
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Get started with a free consultation and discover how we can make your home smarter,
              safer, and more comfortable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/start-project">
                <Button
                  size="lg"
                  className="bg-brand-blue hover:bg-brand-green text-black font-semibold px-10 py-6 text-lg group"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-brand-green text-brand-green hover:bg-brand-green/10 px-10 py-6 text-lg"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
