const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Không cho phép trùng tên đăng nhập
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: "", // Nếu không có ảnh thì để trống
    },
    displayName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }, // Tự động tạo createdAt và updatedAt
);

module.exports = mongoose.model("User", userSchema);
