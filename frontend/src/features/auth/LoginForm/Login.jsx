import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Login.css";

//Tạo default data chưa login là rỗng ""
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  //Ẩn hiện Password
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData, //Copy dữ liệu nhập trước đó (nhập username r copy)
      [e.target.name]: e.target.value, //Ghi đè password lên dữ liệu cũ
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Gửi yêu cầu đăng nhập đến Server
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username: formData.username,
          password: formData.password,
        },
      );

      // 2. Nếu Server trả về status 200 (Thành công)
      if (response.status === 200) {
        // Lưu thông tin user THẬT từ MongoDB trả về vào localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Thông báo nhẹ cái cho phấn khởi
        // console.log("Đăng nhập thành công:", response.data.user);

        // 3. Chuyển hướng vào trang Chat
        window.location.href = "/chat";
      }
    } catch (error) {
      // 4. Xử lý các lỗi từ Server (Sai pass, không tồn tại user...)
      const errorMsg =
        error.response?.data?.message || "Đăng nhập thất bại rồi!";
      alert(errorMsg);
      console.error("Lỗi Login:", error);
    }
  };

  return (
    <div className="auth-container">
      <h1>ZeroChat</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>ĐĂNG NHẬP</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <div className="password-group">
          <input
            type={showPassword ? "text" : "password"} //Show Password
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </span>
        </div>

        <button type="submit">Đăng nhập</button>
        <p>
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
