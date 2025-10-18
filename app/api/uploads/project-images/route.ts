import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

// مهم: نتأكد أننا نستخدم Runtime Node وليس Edge
export const runtime = "nodejs";

function sanitizeFilename(name: string) {
  // إزالة المسافات وأي محارف غريبة
  const base = name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.\-_]/g, "");
  const stamp = Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  const ext = path.extname(base) || ".jpg";
  return `${stamp}${ext}`;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const slug = (form.get("projectSlug") as string)?.trim();
    const files = form.getAll("files") as File[];

    if (!slug) {
      return NextResponse.json(
        { error: "projectSlug is required" },
        { status: 400 }
      );
    }
    if (!files?.length) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // تحقق بسيط من النوع والحجم (اختياري)
    const maxSize = 8 * 1024 * 1024; // 8MB
    for (const f of files) {
      if (!f.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Only image files are allowed" },
          { status: 415 }
        );
      }
      if (f.size > maxSize) {
        return NextResponse.json({ error: "File too large" }, { status: 413 });
      }
    }

    const baseDir = path.join(
      process.cwd(),
      "public",
      "images",
      "projects",
      slug
    );
    await mkdir(baseDir, { recursive: true });

    const urls: string[] = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const safeName = sanitizeFilename(file.name || "image.jpg");
      const filePath = path.join(baseDir, safeName);
      await writeFile(filePath, buffer);

      // URL عام يمكن عرضه مباشرة
      const publicUrl = `/images/projects/${slug}/${safeName}`;
      urls.push(publicUrl);
    }

    return NextResponse.json({ urls }, { status: 201 });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
