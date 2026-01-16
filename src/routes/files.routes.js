//  Imports
const express = require("express");
const auth = require("../middleware/auth");

const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");

//  Router
const router = express.Router();

//  Multer configuration (THIS IS WHERE IT GOES)
const upload = multer({
  storage: multer.memoryStorage(),
});

//  Routes

// Upload route
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "no_file" });
  }

  const userId = req.user.userId;
  const fileId = uuidv4();

  const userDir = path.join(__dirname, "../../uploads", userId);
  const filePath = path.join(userDir, fileId);

  try {
    fs.mkdirSync(userDir, { recursive: true });
    fs.writeFileSync(filePath, req.file.buffer);

    await pool.query(
      "INSERT INTO files (id, user_id, original_name, storage_path) VALUES ($1, $2, $3, $4)",
      [fileId, userId, req.file.originalname, filePath]
    );

    res.json({ fileId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "upload_failed" });
  }
});

// List files (still simple)
router.get("/", auth, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, original_name, created_at FROM files WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.userId]
    );

    res.json({ files: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "list_failed" });
  }
});

// Download stub (we’ll implement next)
router.get("/:id/download", auth, async (req, res) => {
console.log("DOWNLOAD ROUTE HIT - NEW CODE");
 const fileId = req.params.id;
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      "SELECT original_name, storage_path FROM files WHERE id = $1 AND user_id = $2",
      [fileId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "file_not_found" });
    }

    const file = result.rows[0];

    res.download(file.storage_path, file.original_name);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "download_failed" });
  }
});

//  Export router
module.exports = router;

