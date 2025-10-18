'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Service } from '@/app/admin/dashboard/services/page';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Omit<Service, 'id'>) => void;
  service: Service | null;
}

const iconOptions = [
  'Lightbulb', 'Thermometer', 'Shield', 'Tv', 'Mic', 'Wifi',
  'Camera', 'Lock', 'Speaker', 'Home', 'Zap', 'Settings'
];

export default function ServiceModal({ isOpen, onClose, onSave, service }: ServiceModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Lightbulb',
  });

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        icon: service.icon,
      });
    } else {
      setFormData({
        name: '',
        description: '',
        icon: 'Lightbulb',
      });
    }
  }, [service, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-white/10 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>{service ? 'Edit Service' : 'Add New Service'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Service Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white/5 border-white/10 text-white"
              placeholder="e.g., Smart Lighting"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-white/5 border-white/10 text-white"
              placeholder="Brief description of the service..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon (Lucide Icon Name)</Label>
            <Select
              value={formData.icon}
              onValueChange={(value) => setFormData({ ...formData, icon: value })}
            >
              <SelectTrigger className="bg-white text-gray-900 border-gray-200 dark:bg-white/5 dark:text-white dark:border-white/10">
                <SelectValue/>
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 border-gray-200 dark:bg-gray-900 dark:text-white dark:border-white/10">
                {iconOptions.map((icon) => (
                  <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">Select from available Lucide icons</p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-brand-blue hover:bg-brand-green text-black font-semibold"
            >
              {service ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
