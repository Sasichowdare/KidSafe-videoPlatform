// controllers/userController.js
import pool from "../configs/database.js";
import bcrypt from "bcryptjs";

export const getUserProfile = async (req, res) => {
  try {
    console.log("🔍 getUserProfile req.user:", req.user);
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const result = await pool.query(
      "SELECT id, username, email FROM users WHERE id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("🔥 getUserProfile ERROR:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    console.log("✏️  updateUser called");
    console.log("→ req.user:", req.user);
    console.log("→ req.body:", req.body);

    const { username, email } = req.body;
    const userId = req.user?.id;
    if (!userId) {
      console.error("🚫 No userId on req.user");
      return res.status(401).json({ message: "Not authenticated" });
    }
    if (!username && !email) {
      return res
        .status(400)
        .json({ message: "Provide at least username or email." });
    }

    const fields = [];
    const values = [];
    let idx = 1;

    if (username) {
      fields.push(`username = $${idx++}`);
      values.push(username);
    }
    if (email) {
      fields.push(`email = $${idx++}`);
      values.push(email);
    }

    values.push(userId);
    const query = `
      UPDATE users
         SET ${fields.join(", ")}
       WHERE id = $${idx}
    RETURNING id, username, email
    `;
    console.log("→ SQL:", query.trim());
    console.log("→ values:", values);

    const { rows } = await pool.query(query, values);
    console.log("✅ Updated rows:", rows);

    res.json({ message: "Profile updated successfully", user: rows[0] });
  } catch (err) {
    console.error("🔥 updateUser ERROR:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    console.log("🔑 updatePassword called");
    console.log("→ req.user:", req.user);
    console.log("→ req.body:", req.body);

    const { currentPassword, newPassword } = req.body;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const result = await pool.query(
      "SELECT password FROM users WHERE id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(
      currentPassword,
      result.rows[0].password
    );
    if (!match) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    const updateRes = await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2 RETURNING id",
      [newHash, userId]
    );
    console.log("✅ Password updated for userId:", updateRes.rows[0].id);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("🔥 updatePassword ERROR:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
