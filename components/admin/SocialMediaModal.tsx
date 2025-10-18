'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SocialMedia {
  id?: number;
  platform: string;
  icon_name: string;
  url: string;
  display_order: number;
}

interface SocialMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (socialMedia: SocialMedia) => void;
  socialMedia?: SocialMedia | null;
}

const socialPlatforms = [
  { name: 'Facebook', icon: 'facebook' },
  { name: 'Twitter', icon: 'twitter' },
  { name: 'Instagram', icon: 'instagram' },
  { name: 'LinkedIn', icon: 'linkedin' },
  { name: 'YouTube', icon: 'youtube' },
  { name: 'TikTok', icon: 'music' },
  { name: 'WhatsApp', icon: 'message-circle' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Dribbble', icon: 'dribbble' },
  { name: 'Behance', icon: 'bookmark' },
];

export default function SocialMediaModal({
  isOpen,
  onClose,
  onSave,
  socialMedia,
}: SocialMediaModalProps) {
  const [formData, setFormData] = useState<SocialMedia>({
    platform: '',
    icon_name: '',
    url: '',
    display_order: 0,
  });

  useEffect(() => {
    if (socialMedia) {
      setFormData(socialMedia);
    } else {
      setFormData({
        platform: '',
        icon_name: '',
        url: '',
        display_order: 0,
      });
    }
  }, [socialMedia, isOpen]);

  const handlePlatformChange = (value: string) => {
    const platform = socialPlatforms.find(p => p.name === value);
    if (platform) {
      setFormData({
        ...formData,
        platform: platform.name,
        icon_name: platform.icon,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white border-white/10 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {socialMedia ? 'Edit Social Media' : 'Add Social Media'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select
              value={formData.platform}
              onValueChange={handlePlatformChange}
            >
              <SelectTrigger className="bg-white text-gray-900 border-gray-200 dark:bg-white/5 dark:text-white dark:border-white/10">
                <SelectValue placeholder="Select platform"/>
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 border-gray-200 dark:bg-gray-900 dark:text-white dark:border-white/10">
                {socialPlatforms.map((platform) => (
                  <SelectItem key={platform.name} value={platform.name}>
                    {platform.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://..."
              className="bg-white/5 border-white/10"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="display_order">Display Order</Label>
            <Input
              id="display_order"
              type="number"
              value={formData.display_order}
              onChange={(e) =>
                setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
              }
              placeholder="0"
              className="bg-white/5 border-white/10"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-white/10"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-brand-blue hover:bg-brand-green text-black">
              {socialMedia ? 'Update' : 'Add'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
