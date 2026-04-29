const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ĐĂNG KÝ
exports.register = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    // 1. Kiểm tra xem user đã tồn tại chưa
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại!" });

    // 2. Mã hóa mật khẩu (Security)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Lưu user mới
    const newUser = new User({
      username,
      password: hashedPassword,
      displayName,
    });

    await newUser.save();
    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server rồi Nam ơi!", error: err });
  }
};

// ĐĂNG NHẬP
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Tìm user trong DB
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "Tài khoản không tồn tại!" });

    // 2. So sánh mật khẩu đã mã hóa
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu rồi!" });

    // 3. Trả về thông tin (trừ mật khẩu)
    res.status(200).json({
      message: "Đăng nhập thành công!",
      user: {
        id: user._id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server!", error: err });
  }
};
