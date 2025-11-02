"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [contactInfo, setContactInfo] = useState({
    email: "info@nextlinkuae.com",
    phone: "+971 50 123 4567",
    address: "Dubai, UAE",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        const result = await response.json();
        if (result.data) {
          setContactInfo({
            email: result.data.contact_email || "info@nextlinkuae.com",
            phone: result.data.contact_phone || "+971 50 123 4567",
            address: result.data.contact_address || "Dubai, UAE",
          });
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactDetails = [
    {
      icon: Mail,
      title: "Email Us",
      content: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
    },
    {
      icon: Phone,
      title: "Call Us",
      content: contactInfo.phone,
      link: `tel:${contactInfo.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: contactInfo.address,
      link: "#",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon-Friday: 9AM-6PM",
      link: "#",
    },
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
              Have questions? We're here to help. Reach out to us and let's
              discuss how we can transform your home.
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
                Fill out the form below and our team will get back to you within
                24 hours.
              </p>

              {success && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <p className="text-green-400">
                    Your message has been sent successfully! We'll get back to
                    you soon.
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-brand-blue"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-brand-blue"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 50 123 4567"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-brand-blue"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-brand-blue"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
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
                    disabled={loading}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full bg-brand-blue hover:bg-brand-green text-black font-semibold group"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

            <div className="animate-slide-in-right space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">
                Contact <span className="text-brand-blue">Information</span>
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {contactDetails.map((info, index) => (
                  <Card
                    key={index}
                    className="bg-white/5 backdrop-blur-lg border-white/10 hover:border-brand-blue/50 transition-all hover:shadow-xl hover:shadow-brand-blue/20"
                  >
                    <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-green/20">
                        <info.icon className="h-6 w-6 text-brand-blue" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white">
                          {info.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {info.link !== "#" ? (
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
                    Need Immediate Assistance?
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Our team is ready to help you with any questions or concerns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    For urgent matters, please call us directly at{" "}
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                      className="text-brand-blue hover:text-brand-green transition-colors font-semibold"
                    >
                      {contactInfo.phone}
                    </a>
                  </p>
                  <p className="text-sm text-gray-400">
                    We typically respond to all inquiries within 24 hours during
                    business days.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* <div className="animate-fade-in">
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  Our Location
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Visit our showroom to see NextLink technology in action
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 bg-gradient-to-br from-brand-blue/20 to-brand-green/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-brand-blue mx-auto mb-4" />
                    <p className="text-gray-300 text-lg font-semibold">
                      NextLink UAE
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </section>
    </main>
  );
}
