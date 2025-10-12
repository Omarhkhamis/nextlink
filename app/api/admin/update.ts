// app/api/admin/update.ts
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import { query } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const result = await query("SELECT id, email FROM admin_users LIMIT 1");
      if (!result.rows.length) {
        return res.status(404).json({ error: "Admin not found" });
      }
      return res.status(200).json({ data: result.rows[0] });
    } catch (error) {
      console.error("Error fetching admin:", error);
      return res.status(500).json({ error: "Failed to fetch admin" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const existingAdmin = await query("SELECT * FROM admin_users LIMIT 1");
      if (!existingAdmin.rows.length) {
        return res.status(404).json({ error: "Admin not found" });
      }

      const adminId = existingAdmin.rows[0].id;

      let updateQuery = "UPDATE admin_users SET email = $1";
      let values: (string | number)[] = [email];

      if (password && password.trim() !== "") {
        const hashedPassword = await hash(password, 12);
        updateQuery += ", password = $2";
        values.push(hashedPassword);
      }

      updateQuery +=
        " WHERE id = $" + (values.length + 1) + " RETURNING id, email";
      values.push(adminId);

      const result = await query(updateQuery, values);

      return res
        .status(200)
        .json({ message: "Admin updated successfully", data: result.rows[0] });
    } catch (error) {
      console.error("Admin update error:", error);
      return res.status(500).json({ error: "Failed to update admin" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
