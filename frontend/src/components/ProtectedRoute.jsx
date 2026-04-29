import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Kiểm tra "vé" trong localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    // replace giúp người dùng không bị kẹt ở vòng lặp khi nhấn Back
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
