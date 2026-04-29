import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./Register.css";

//Tạo default data chưa login là rỗng ""
const Register = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    //So sánh 2 mật khẩu
    if (formData.password1 !== formData.password2) {
      alert("Mật khẩu không trùng khớp");
      return;
    }

    //Kiểm tra độ dài mật khẩu
    if (formData.password1.length < 6 || formData.password2.length < 6) {
      alert("Mật khẩu quá ngắn");
      return;
    }

    //Nếu đáp ứng điều kiện trên
    console.log("Register Success", formData);
    alert("Đăng kí tài khoản thành công");
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
