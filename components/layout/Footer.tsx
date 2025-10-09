'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, Mail, Phone, MapPin } from 'lucide-react';
import * as Icons from 'lucide-react';
import footerData from '@/data/footer.json';

interface Settings {
  contact_email: string | null;
  contact_phone: string | null;
  contact_address: string | null;
}

interface SocialMedia {
  id: number;
  platform: string;
  icon_name: string;
  url: string;
  display_order: number;
}

export default function Footer() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);

  useEffect(() => {
    fetchSettings();
    fetchSocialMedia();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const result = await response.json();
      if (result.data) {
        setSettings(result.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const fetchSocialMedia = async () => {
    try {
      const response = await fetch('/api/social-media');
      const result = await response.json();
      setSocialMedia(result.data || []);
    } catch (error) {
      console.error('Error fetching social media:', error);
    }
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName.charAt(0).toUpperCase() + iconName.slice(1).replace(/-./g, x => x[1].toUpperCase())];
    return IconComponent || Icons.Globe;
  };

  const contactEmail = settings?.contact_email || footerData.contact.email;
  const contactPhone = settings?.contact_phone || footerData.contact.phone;
  const contactAddress = settings?.contact_address || footerData.contact.address;

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Home className="h-8 w-8 text-brand-blue" />
              <span className="text-xl font-bold text-white">
                {footerData.logo.text.replace(footerData.logo.highlight, '')}
                <span className="text-brand-blue">{footerData.logo.highlight}</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {footerData.description}
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerData.quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-brand-blue transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {footerData.services.map((service) => (
                <li key={service} className="text-gray-400 hover:text-brand-green transition-colors cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {contactEmail && (
                <li className="flex items-start space-x-3 text-gray-400 text-sm">
                  <Mail className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span>{contactEmail}</span>
                </li>
              )}
              {contactPhone && (
                <li className="flex items-start space-x-3 text-gray-400 text-sm">
                  <Phone className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span>{contactPhone}</span>
                </li>
              )}
              {contactAddress && (
                <li className="flex items-start space-x-3 text-gray-400 text-sm">
                  <MapPin className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                  <span>{contactAddress}</span>
                </li>
              )}
            </ul>

            {socialMedia.length > 0 && (
              <div className="flex space-x-4 mt-6">
                {socialMedia.map((social) => {
                  const Icon = getIcon(social.icon_name);
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-brand-blue transition-colors"
                      aria-label={social.platform}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} {footerData.copyright}
            </p>
            <div className="flex space-x-6 text-sm">
              {footerData.legal.map((item) => (
                <Link key={item.label} href={item.href} className="text-gray-400 hover:text-brand-blue transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
