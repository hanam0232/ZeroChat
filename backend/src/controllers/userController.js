const User = require("../models/User"); // QUAN TRỌNG: Phải có dòng này ở đầu file

// Hàm lấy tất cả user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: 1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy danh sách", error: err.message });
  }
};

// Hàm gửi lời mời kết bạn
exports.sendFriendRequest = async (req, res) => {
  try {
    const { targetId, myId } = req.body;

    // Thêm ID của mình vào danh sách chờ của đối phương
    await User.findByIdAndUpdate(targetId, {
      $addToSet: { friendRequests: myId },
    });

    res.status(200).json({ message: "Đã gửi lời mời!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi kết bạn", error: err.message });
  }
};
