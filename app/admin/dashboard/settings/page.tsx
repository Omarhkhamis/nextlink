'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Edit } from 'lucide-react';
import SocialMediaModal from '@/components/admin/SocialMediaModal';
import * as Icons from 'lucide-react';

interface Settings {
  id: number;
  site_name: string;
  logo_url: string | null;
  favicon_url: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  contact_address: string | null;
}

interface SocialMedia {
  id?: number;
  platform: string;
  icon_name: string;
  url: string;
  display_order: number;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    id: 1,
    site_name: 'NextLink',
    logo_url: null,
    favicon_url: null,
    contact_email: null,
    contact_phone: null,
    contact_address: null,
  });
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSocial, setEditingSocial] = useState<SocialMedia | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

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

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSocialMedia = async (social: SocialMedia) => {
    try {
      if (editingSocial) {
        const response = await fetch(`/api/social-media/${editingSocial.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(social),
        });

        if (response.ok) {
          fetchSocialMedia();
        }
      } else {
        const response = await fetch('/api/social-media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(social),
        });

        if (response.ok) {
          fetchSocialMedia();
        }
      }
      setIsModalOpen(false);
      setEditingSocial(null);
    } catch (error) {
      console.error('Error saving social media:', error);
    }
  };

  const handleDeleteSocialMedia = async (id: number) => {
    if (!confirm('Are you sure you want to delete this social media link?')) return;

    try {
      await fetch(`/api/social-media/${id}`, { method: 'DELETE' });
      fetchSocialMedia();
    } catch (error) {
      console.error('Error deleting social media:', error);
    }
  };

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName.charAt(0).toUpperCase() + iconName.slice(1).replace(/-./g, x => x[1].toUpperCase())];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">General Settings</h1>
        <p className="text-gray-400 mt-2">Manage your website settings and contact information</p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        <Card className="bg-black/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Site Information</CardTitle>
            <CardDescription className="text-gray-400">
              Update your website name and branding
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site_name" className="text-gray-300">Site Name</Label>
              <Input
                id="site_name"
                value={settings.site_name}
                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo_url" className="text-gray-300">Logo URL</Label>
              <Input
                id="logo_url"
                value={settings.logo_url || ''}
                onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                placeholder="https://example.com/logo.png"
                className="bg-white/5 border-white/10 text-white"
              />
              <p className="text-xs text-gray-500">Recommended: 200x50px PNG or SVG</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="favicon_url" className="text-gray-300">Favicon URL</Label>
              <Input
                id="favicon_url"
                value={settings.favicon_url || ''}
                onChange={(e) => setSettings({ ...settings, favicon_url: e.target.value })}
                placeholder="https://example.com/favicon.ico"
                className="bg-white/5 border-white/10 text-white"
              />
              <p className="text-xs text-gray-500">Recommended: 32x32px ICO or PNG</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
            <CardDescription className="text-gray-400">
              Update your contact details displayed in the footer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact_email" className="text-gray-300">Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={settings.contact_email || ''}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                placeholder="info@example.com"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_phone" className="text-gray-300">Phone</Label>
              <Input
                id="contact_phone"
                value={settings.contact_phone || ''}
                onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                placeholder="+971 50 123 4567"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_address" className="text-gray-300">Address</Label>
              <Textarea
                id="contact_address"
                value={settings.contact_address || ''}
                onChange={(e) => setSettings({ ...settings, contact_address: e.target.value })}
                placeholder="Dubai, UAE"
                className="bg-white/5 border-white/10 text-white"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {message && (
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <p className="text-green-400">{message}</p>
          </div>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="bg-brand-blue hover:bg-brand-green text-black font-semibold"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>

      <Card className="bg-black/50 border-white/10">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Social Media Links</CardTitle>
              <CardDescription className="text-gray-400">
                Add and manage your social media profiles
              </CardDescription>
            </div>
            <Button
              onClick={() => {
                setEditingSocial(null);
                setIsModalOpen(true);
              }}
              className="bg-brand-blue hover:bg-brand-green text-black"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Social Media
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {socialMedia.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No social media links added yet. Click "Add Social Media" to get started.
            </p>
          ) : (
            <div className="space-y-2">
              {socialMedia.map((social) => (
                <div
                  key={social.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-brand-blue">
                      {getIcon(social.icon_name)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{social.platform}</p>
                      <p className="text-gray-400 text-sm truncate max-w-md">{social.url}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingSocial(social);
                        setIsModalOpen(true);
                      }}
                      className="text-gray-400 hover:text-brand-blue"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => social.id && handleDeleteSocialMedia(social.id)}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <SocialMediaModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSocial(null);
        }}
        onSave={handleSaveSocialMedia}
        socialMedia={editingSocial}
      />
    </div>
  );
}
