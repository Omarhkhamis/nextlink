'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { Send, CheckCircle2, Home, Building2, Sparkles } from 'lucide-react';

export default function StartProject() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    propertyType: '',
    propertyStage: '',
    budget: '',
    services: [] as string[],
    additionalInfo: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Project form submitted:', formData);
  };

  const handleCheckboxChange = (service: string, checked: boolean) => {
    setFormData({
      ...formData,
      services: checked
        ? [...formData.services, service]
        : formData.services.filter((s) => s !== service),
    });
  };

  const services = [
    'Smart Lighting',
    'HVAC Control',
    'Security & Surveillance',
    'Home Cinema',
    'Voice Integration',
    'Network Setup',
  ];

  const steps = [
    {
      icon: Home,
      title: 'Tell Us About Your Property',
      description: 'Share details about your space and requirements',
    },
    {
      icon: CheckCircle2,
      title: 'Get a Custom Proposal',
      description: "We'll create a tailored solution for your needs",
    },
    {
      icon: Sparkles,
      title: 'Transform Your Home',
      description: 'Professional installation and setup',
    },
  ];

  return (
    <main className="pt-20">
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMGQ0ZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              Start Your <span className="text-brand-blue">Project</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Begin your journey to a smarter home. Share your vision and we'll make it a reality.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6 relative inline-block">
                  <div className="p-6 rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-green/20 border border-white/10">
                    <step.icon className="h-12 w-12 text-brand-blue" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-brand-blue text-black font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Project Details</CardTitle>
                  <CardDescription className="text-gray-400">
                    Fill out the form below to get started with your smart home project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-brand-blue"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-brand-blue"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number *
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 123-4567"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-brand-blue"
                        />
                      </div>

                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
                          City *
                        </label>
                        <Input
                          id="city"
                          name="city"
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="New York"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-brand-blue"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="propertyType" className="block text-sm font-medium text-gray-300 mb-2">
                          Property Type *
                        </label>
                        <Select
                          value={formData.propertyType}
                          onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                        >
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/10">
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="condo">Condo</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="office">Office</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label htmlFor="propertyStage" className="block text-sm font-medium text-gray-300 mb-2">
                          Property Stage *
                        </label>
                        <Select
                          value={formData.propertyStage}
                          onValueChange={(value) => setFormData({ ...formData, propertyStage: value })}
                        >
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select stage" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-white/10">
                            <SelectItem value="planning">Planning Phase</SelectItem>
                            <SelectItem value="construction">Under Construction</SelectItem>
                            <SelectItem value="renovation">Renovation</SelectItem>
                            <SelectItem value="existing">Existing Property</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                        Estimated Budget
                      </label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) => setFormData({ ...formData, budget: value })}
                      >
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10">
                          <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="100k+">$100,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Services Interested In *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {services.map((service) => (
                          <div key={service} className="flex items-center space-x-3">
                            <Checkbox
                              id={service}
                              checked={formData.services.includes(service)}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange(service, checked as boolean)
                              }
                              className="border-white/20 data-[state=checked]:bg-brand-blue data-[state=checked]:border-brand-blue"
                            />
                            <label
                              htmlFor={service}
                              className="text-sm text-gray-300 cursor-pointer"
                            >
                              {service}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-300 mb-2">
                        Additional Information
                      </label>
                      <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                        placeholder="Tell us more about your project, timeline, or any specific requirements..."
                        rows={4}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-brand-blue resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-brand-blue hover:bg-brand-green text-black font-semibold group"
                    >
                      Submit Project Request
                      <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-brand-blue/10 to-brand-green/10 border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl text-white">What Happens Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-black text-sm font-bold">
                      1
                    </div>
                    <p className="text-gray-300 text-sm">
                      We'll review your request within 24 hours
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-black text-sm font-bold">
                      2
                    </div>
                    <p className="text-gray-300 text-sm">
                      Schedule a free consultation call
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-black text-sm font-bold">
                      3
                    </div>
                    <p className="text-gray-300 text-sm">
                      Receive a customized proposal and quote
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-black text-sm font-bold">
                      4
                    </div>
                    <p className="text-gray-300 text-sm">
                      Begin your smart home transformation
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-400 text-sm">
                    Our team is here to assist you with any questions about your project.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-300">
                      <span className="text-brand-blue font-semibold">Phone:</span> +1 (555) 123-4567
                    </p>
                    <p className="text-gray-300">
                      <span className="text-brand-blue font-semibold">Email:</span> info@smarthome.com
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-brand-green text-brand-green hover:bg-brand-green/10"
                  >
                    Schedule Consultation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
