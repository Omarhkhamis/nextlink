// app/api/admin/update.ts
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { query } from "@/lib/db";

interface AdminUpdateBody {
  email?: string;
  password?: string;
}

export async function POST(request: Request) {
  try {
    const body: AdminUpdateBody = await request.json();
    const { email, password } = body;

    if (!email && !password) {
      return NextResponse.json(
        { error: "Please provide email or password to update." },
        { status: 400 }
      );
    }

    let updates: string[] = [];
    let values: any[] = [];
    let idx = 1;

    if (email) {
      updates.push(`email = $${idx++}`);
      values.push(email);
    }

    if (password) {
      const hashed = await hash(password, 12);
      updates.push(`password = $${idx++}`);
      values.push(hashed);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: "Nothing to update." },
        { status: 400 }
      );
    }

    const updateQuery = `UPDATE admin_users SET ${updates.join(
      ", "
    )} WHERE id = 1 RETURNING id, email`;

    const result = await query(updateQuery, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Admin user not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Admin updated successfully.",
      admin: result.rows[0],
    });
  } catch (error: any) {
    console.error("Failed to update admin credentials", error);
    return NextResponse.json(
      { error: error.message || "Failed to update admin." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await query(
      "SELECT id, email FROM admin_users WHERE id = 1"
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }
    return NextResponse.json({ data: result.rows[0] });
  } catch (error: any) {
    console.error("Failed to fetch admin", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
