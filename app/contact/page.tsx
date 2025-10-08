'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'info@smarthome.com',
      link: 'mailto:info@smarthome.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Smart Street, Tech City, TC 12345',
      link: '#',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
      link: '#',
    },
  ];

  const socialLinks = [
    { name: 'WhatsApp', link: 'https://wa.me/15551234567', color: 'text-green-400' },
    { name: 'Telegram', link: 'https://t.me/smarthome', color: 'text-blue-400' },
    { name: 'Email', link: 'mailto:info@smarthome.com', color: 'text-brand-blue' },
  ];

  return (
    <main className="pt-20">
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMGQ0ZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6Ci8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              Get In <span className="text-brand-blue">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have questions? We're here to help. Reach out to us and let's discuss how we can transform
              your home.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-bold text-white mb-6">
                Send Us a <span className="text-brand-green">Message</span>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={6}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-brand-blue resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-brand-blue hover:bg-brand-green text-black font-semibold group"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

            <div className="animate-slide-in-right space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">
                Contact <span className="text-brand-blue">Information</span>
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="bg-white/5 backdrop-blur-lg border-white/10 hover:border-brand-blue/50 transition-all hover:shadow-xl hover:shadow-brand-blue/20"
                  >
                    <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-green/20">
                        <info.icon className="h-6 w-6 text-brand-blue" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">{info.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {info.link !== '#' ? (
                        <a
                          href={info.link}
                          className="text-gray-300 hover:text-brand-blue transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-300">{info.content}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-br from-brand-blue/10 to-brand-green/10 border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-brand-green" />
                    Quick Connect
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Get instant responses through our social channels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 min-w-[120px] px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-center font-semibold transition-all hover:border-brand-blue hover:shadow-lg hover:shadow-brand-blue/20 ${social.color}`}
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="animate-fade-in">
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Our Location</CardTitle>
                <CardDescription className="text-gray-400">
                  Visit our showroom to see smart home technology in action
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 bg-gradient-to-br from-brand-blue/20 to-brand-green/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-brand-blue mx-auto mb-4" />
                    <p className="text-gray-300 text-lg">Interactive Map Placeholder</p>
                    <p className="text-gray-400 text-sm mt-2">
                      123 Smart Street, Tech City, TC 12345
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
