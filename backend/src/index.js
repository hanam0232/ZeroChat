const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const URI = process.env.MONGODB_URI;

//============================================

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
// Kết nối MongoDB
app.use("/api/users", userRoutes);

//============================================

mongoose
  .connect(URI)
  .then(() => console.log("✅ Kết nối MongoDB thành công!"))
  .catch((err) => console.error("❌ Kết nối thất bại tới MongoDB", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy ở port ${PORT}`);
});
