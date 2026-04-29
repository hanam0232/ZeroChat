import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./Register.css";

//Tạo default data chưa login là rỗng ""
const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    AccountName: "",
    username: "",
    password1: "",
    password2: "",
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

    // 1. Kiểm tra độ dài mật khẩu (Check ở Frontend cho nhanh)
    if (formData.password1.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    // 2. So sánh 2 mật khẩu
    if (formData.password1 !== formData.password2) {
      alert("Mật khẩu không trùng khớp!");
      return;
    }

    try {
      // 3. Gửi dữ liệu sang Backend
      // Lưu ý: Map đúng tên biến mà Backend đang chờ (displayName, username, password)
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          displayName: formData.AccountName, // Lấy AccountName làm tên hiển thị
          username: formData.username, // Tên đăng nhập
          password: formData.password1, // Mật khẩu đã qua kiểm tra
        },
      );

      // 4. Xử lý khi thành công
      if (response.status === 201) {
        alert("Đăng ký thành công! Đang chuyển sang trang đăng nhập...");
        navigate("/login"); // Dùng navigate thay vì window.location cho mượt
      }
    } catch (error) {
      // 5. Xử lý lỗi từ Backend (Ví dụ: trùng username)
      const errorMsg = error.response?.data?.message || "Lỗi đăng ký rồi!";
      alert(errorMsg);
      console.error("Lỗi Register:", error);
    }
  };

  return (
    <div className="auth-container">
      <h1>ZeroChat</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>ĐĂNG KÝ</h2>

        <input
          type="text"
          name="AccountName"
          placeholder="AccountName"
          value={formData.AccountName}
          onChange={handleChange}
          required
        />

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
            name="password1"
            placeholder="Password"
            value={formData.password1}
            onChange={handleChange}
            required
          />

          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </span>
        </div>

        <div className="password-group">
          <input
            type={showPassword ? "text" : "password"} //Show Password
            name="password2"
            placeholder="Password"
            value={formData.password2}
            onChange={handleChange}
            required
          />

          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </span>
        </div>

        <button type="submit">Đăng ký</button>
        <p>
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
