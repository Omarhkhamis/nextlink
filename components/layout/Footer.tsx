import Link from 'next/link';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import footerData from '@/data/footer.json';

export default function Footer() {
  const socialIcons = {
    Facebook,
    Twitter,
    Instagram,
    LinkedIn: Linkedin,
  };

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
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <Mail className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                <span>{footerData.contact.email}</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <Phone className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                <span>{footerData.contact.phone}</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <MapPin className="h-5 w-5 text-brand-blue mt-0.5 flex-shrink-0" />
                <span>{footerData.contact.address}</span>
              </li>
            </ul>

            <div className="flex space-x-4 mt-6">
              {footerData.social.map((item) => {
                const Icon = socialIcons[item.name as keyof typeof socialIcons];
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-brand-blue transition-colors"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
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
