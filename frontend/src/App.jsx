import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./features/auth/RegisterForm/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatBox from "./features/chat/ChatBox/ChatBox";
import Login from "./features/auth/LoginForm/Login";
import "./App.css";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      <Routes>
        {/* Nếu vào "/" mà đã login thì vào thẳng /chat, chưa thì vào /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatBox />
            </ProtectedRoute>
          }
        />

        {/* Route xử lý khi gõ bậy (Page Not Found) - đá về login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
