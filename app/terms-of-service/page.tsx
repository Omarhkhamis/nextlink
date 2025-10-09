'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';

interface PageContent {
  title: string;
  content: string;
  meta_description: string;
  updated_at: string;
}

export default function TermsOfService() {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/pages/terms-of-service');
        const result = await response.json();
        if (result.data) {
          setPageContent(result.data);
        }
      } catch (error) {
        console.error('Error fetching page content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <main className="pt-20 min-h-screen bg-black">
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400">Loading...</p>
          </div>
        </section>
      </main>
    );
  }

  if (!pageContent) {
    return (
      <main className="pt-20 min-h-screen bg-black">
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Page Not Found</h1>
            <p className="text-gray-400">This page content is not available.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-black">
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">{pageContent.title}</h1>
            <p className="text-gray-400">
              Last updated: {new Date(pageContent.updated_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          <Card className="bg-white/5 border-white/10 p-8">
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h2 className="text-3xl font-bold text-white mb-6 mt-8">{children}</h2>,
                  h2: ({ children }) => <h3 className="text-2xl font-bold text-white mb-4 mt-6">{children}</h3>,
                  h3: ({ children }) => <h4 className="text-xl font-semibold text-white mb-3 mt-4">{children}</h4>,
                  p: ({ children }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-300">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-300">{children}</ol>,
                  li: ({ children }) => <li className="text-gray-300">{children}</li>,
                  strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                  a: ({ href, children }) => (
                    <a href={href} className="text-brand-blue hover:text-brand-green transition-colors underline">
                      {children}
                    </a>
                  ),
                }}
              >
                {pageContent.content}
              </ReactMarkdown>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
