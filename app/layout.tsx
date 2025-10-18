"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);

  // ✔️ اجلب favicon من الإعدادات (إن وُجد)
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings", { cache: "no-store" });
        const result = await response.json();
        if (result?.data?.favicon_url) {
          setFaviconUrl(result.data.favicon_url);
        }
      } catch (error) {
        console.error("Error fetching favicon:", error);
      }
    };

    fetchSettings();
  }, []);

  // ✔️ حدّث/أنشئ عنصر الـ favicon في <head>
  useEffect(() => {
    const url = faviconUrl || "/favicon.ico";
    let link = document.querySelector(
      "link[rel~='icon']"
    ) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = url;
  }, [faviconUrl]);

  // ✔️ اجعل عنوان التبويب ثابتًا "Next Link UAE" في كل الصفحات
  useEffect(() => {
    document.title = "Next Link UAE";
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        {/* عنوان ثابت للصفحات عند أول تحميل (ثم useEffect يضمنه دومًا) */}
        <title>Next Link UAE</title>

        {/* favicon افتراضي ثم يُستبدل إن وُجد في الإعدادات */}
        <link
          rel="icon"
          type="image/x-icon"
          href={faviconUrl || "/favicon.ico"}
        />

        {/* (اختياري) ميتاداتا ثابتة مبسطة */}
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Next Link UAE — Architecture, design & smart projects in UAE."
        />
        <meta property="og:title" content="Next Link UAE" />
        <meta property="og:site_name" content="Next Link UAE" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Next Link UAE" />
      </head>

      <body className={`${inter.variable} font-sans bg-black text-white`}>
        <SessionProvider>
          {!isAdminRoute && <Navbar />}
          {children}
          {!isAdminRoute && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}
