import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Success", formData);
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
