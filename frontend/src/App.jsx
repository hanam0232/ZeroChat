import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./features/auth/RegisterForm/Register";
import ChatBox from "./features/chat/ChatBox/ChatBox";
import Login from "./features/auth/LoginForm/Login";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<ChatBox />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
