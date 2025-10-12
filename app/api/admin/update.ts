import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query(
      "SELECT id, email FROM admin_users WHERE id = 1"
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }
    return NextResponse.json({ data: result.rows[0] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email && !password) {
      return NextResponse.json(
        { error: "Please provide email or password to update." },
        { status: 400 }
      );
    }

    let queryStr = "UPDATE admin_users SET ";
    const queryParams: any[] = [];
    let idx = 1;

    if (email) {
      queryStr += `email = $${idx}`;
      queryParams.push(email);
      idx++;
    }

    if (password) {
      if (email) queryStr += ", ";
      const hashed = await hash(password, 12);
      queryStr += `password = $${idx}`;
      queryParams.push(hashed);
      idx++;
    }

    queryStr += ` WHERE id = 1 RETURNING id, email`;

    const result = await query(queryStr, queryParams);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Admin updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
