const fileRoutes = require("./routes/files.routes");
const auth = require("./middleware/auth");
const express = require("express");

const authRoutes = require("./routes/auth.routes");

const app = express();
app.use("/files", fileRoutes);
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

console.log("AUTH TYPE:", typeof auth);
app.get("/me", auth, (req, res) => {
  res.json({
    userId: req.user.userId,
  });
});

app.use("/auth", authRoutes);
app.use("/files", fileRoutes);

module.exports = app;

