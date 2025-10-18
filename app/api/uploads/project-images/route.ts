import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

// مهم: تشغيل على Node وعدم التخزين المؤقت
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function sanitizeFilename(name: string) {
  const ext = path.extname(name || "").toLowerCase();
  const allowed = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif"];
  const safeExt = allowed.includes(ext) ? ext : ".jpg";
  const stamp = Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  return `${stamp}${safeExt}`;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const rawSlug = (form.get("projectSlug") as string) || "project";
    const slug = slugify(rawSlug);
    const files = form.getAll("files") as File[];

    if (!files?.length) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const maxSize = 8 * 1024 * 1024; // 8MB
    for (const f of files) {
      if (!f.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Only image files allowed" },
          { status: 415 }
        );
      }
      if (f.size > maxSize) {
        return NextResponse.json({ error: "File too large" }, { status: 413 });
      }
    }

    // احفظ داخل public/images/projects/<slug>
    const dir = path.join(process.cwd(), "public", "images", "projects", slug);
    await mkdir(dir, { recursive: true });

    const urls: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = sanitizeFilename(file.name);
      const filePath = path.join(dir, filename);

      await writeFile(filePath, buffer);

      // URL العام (بدون public)
      const publicUrl = `/images/projects/${slug}/${filename}`;
      urls.push(publicUrl);
    }

    // لا كاش للمعاينة الفورية
    return NextResponse.json(
      { urls, slug },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: err?.message || "Upload failed" },
      { status: 500 }
    );
  }
}
