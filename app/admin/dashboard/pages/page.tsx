'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { FileText, Save, Eye } from 'lucide-react';
import Link from 'next/link';

interface Page {
  id: number;
  slug: string;
  title: string;
  content: string;
  meta_description: string;
  is_published: boolean;
  updated_at: string;
}

export default function PagesManagement() {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/pages');
      const result = await response.json();
      if (result.data) {
        setPages(result.data);
        if (result.data.length > 0 && !selectedPage) {
          setSelectedPage(result.data[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
      setError('Failed to load pages');
    }
  };

  const handleSave = async () => {
    if (!selectedPage) return;

    setSaving(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(`/api/pages/${selectedPage.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedPage),
      });

      if (response.ok) {
        setMessage('Page saved successfully!');
        fetchPages();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setError('Failed to save page');
      }
    } catch (error) {
      setError('Failed to save page');
    } finally {
      setSaving(false);
    }
  };

  const handleContentChange = (field: keyof Page, value: any) => {
    if (!selectedPage) return;
    setSelectedPage({ ...selectedPage, [field]: value });
  };

  const getPageUrl = (slug: string) => {
    return `/${slug}`;
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Pages Management</h1>
        <p className="text-gray-400 mt-2">Edit your website pages content</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-black/50 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Pages</CardTitle>
              <CardDescription className="text-gray-400">
                Select a page to edit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {pages.map((page) => (
                <Button
                  key={page.id}
                  variant={selectedPage?.id === page.id ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    selectedPage?.id === page.id
                      ? 'bg-brand-blue text-black hover:bg-brand-blue/80'
                      : 'text-gray-300 hover:text-brand-blue hover:bg-white/5'
                  }`}
                  onClick={() => setSelectedPage(page)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {page.title}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {selectedPage ? (
            <Card className="bg-black/50 border-white/10">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-2xl">{selectedPage.title}</CardTitle>
                    <CardDescription className="text-gray-400 mt-2">
                      Last updated: {new Date(selectedPage.updated_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </CardDescription>
                  </div>
                  <Link href={getPageUrl(selectedPage.slug)} target="_blank">
                    <Button variant="outline" size="sm" className="border-white/10 text-gray-300">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="space-y-0.5">
                    <Label className="text-white">Published Status</Label>
                    <p className="text-sm text-gray-400">
                      {selectedPage.is_published ? 'This page is visible to the public' : 'This page is hidden from the public'}
                    </p>
                  </div>
                  <Switch
                    checked={selectedPage.is_published}
                    onCheckedChange={(checked) => handleContentChange('is_published', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-300">Page Title</Label>
                  <Input
                    id="title"
                    value={selectedPage.title}
                    onChange={(e) => handleContentChange('title', e.target.value)}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta_description" className="text-gray-300">Meta Description</Label>
                  <Input
                    id="meta_description"
                    value={selectedPage.meta_description || ''}
                    onChange={(e) => handleContentChange('meta_description', e.target.value)}
                    placeholder="Brief description for search engines (160 characters max)"
                    maxLength={160}
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <p className="text-xs text-gray-500">
                    {selectedPage.meta_description?.length || 0}/160 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-gray-300">Page Content</Label>
                  <p className="text-xs text-gray-500 mb-2">
                    Supports Markdown formatting. Use # for headings, ## for subheadings, - for lists, etc.
                  </p>
                  <Textarea
                    id="content"
                    value={selectedPage.content}
                    onChange={(e) => handleContentChange('content', e.target.value)}
                    className="bg-white/5 border-white/10 text-white font-mono text-sm min-h-[500px]"
                  />
                </div>

                {message && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-green-400">{message}</p>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400">{error}</p>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <Link href={getPageUrl(selectedPage.slug)} target="_blank">
                    <Button variant="outline" className="border-white/10 text-gray-300">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview Changes
                    </Button>
                  </Link>
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-brand-blue hover:bg-brand-green text-black font-semibold"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>

                <Card className="bg-brand-blue/10 border-brand-blue/20">
                  <CardContent className="p-4">
                    <h4 className="text-white font-semibold mb-2">Markdown Formatting Tips</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li><code className="bg-white/10 px-1 rounded"># Heading 1</code> - Main heading</li>
                      <li><code className="bg-white/10 px-1 rounded">## Heading 2</code> - Subheading</li>
                      <li><code className="bg-white/10 px-1 rounded">**bold text**</code> - Bold text</li>
                      <li><code className="bg-white/10 px-1 rounded">- List item</code> - Bullet point</li>
                      <li><code className="bg-white/10 px-1 rounded">[Link text](url)</code> - Hyperlink</li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-black/50 border-white/10">
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Select a page from the sidebar to start editing</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
