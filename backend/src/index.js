const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
//============================================
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Kết nối MongoDB
const URI = process.env.MONGODB_URI;

mongoose
  .connect(URI)
  .then(() => console.log("✅ Kết nối MongoDB thành công!"))
  .catch((err) => console.error("❌ Kết nối thất bại tới MongoDB", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy ở port ${PORT}`);
});
