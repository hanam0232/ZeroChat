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

// Chấp nhận kết bạn
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { myId, targetId } = req.body;

    // 1. Thêm nhau vào mảng friends của cả hai
    await User.findByIdAndUpdate(myId, {
      $addToSet: { friends: targetId },
      $pull: { friendRequests: targetId }, // Xóa khỏi danh sách chờ
    });

    const updatedMe = await User.findByIdAndUpdate(
      targetId,
      {
        $addToSet: { friends: myId },
        $pull: { sentRequests: myId },
      },
      { new: true },
    ).select("-password");

    res.status(200).json({ message: "Đã trở thành bạn bè!", user: updatedMe });
  } catch (err) {
    res.status(500).json({ message: "Lỗi", error: err.message });
  }
};

// Từ chối kết bạn
exports.declineFriendRequest = async (req, res) => {
  try {
    const { myId, targetId } = req.body;

    // Chỉ cần xóa ID khỏi mảng friendRequests của mình
    await User.findByIdAndUpdate(myId, {
      $pull: { friendRequests: targetId },
    });

    res.status(200).json({ message: "Đã từ chối lời mời" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi", error: err.message });
  }
};
