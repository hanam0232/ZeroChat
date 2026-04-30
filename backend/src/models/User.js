const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
      default: "",
    },
    displayName: {
      type: String,
      required: true,
    },
    // 1. Danh sách bạn bè: Lưu mảng các ID của User khác
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Tham chiếu tới Model User
      },
    ],
    // 2. Danh sách yêu cầu kết bạn: Lưu ID của những người gửi lời mời cho mình
    friendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // 3. (Tùy chọn) Danh sách lời mời đã gửi: Để kiểm tra trạng thái "Đã gửi"
    sentRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
