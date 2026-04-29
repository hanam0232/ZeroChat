export const useAuth = () => {
  // Lấy dữ liệu từ máy
  const data = localStorage.getItem("user");

  // Parse ra object, nếu không có thì trả về null
  const user = data ? JSON.parse(data) : null;

  return {
    user,
    displayName: user?.displayName || "Guest",
    username: user?.username || "",
    userId: user?.id || user?._id || "",
    isLoggedIn: !!user, // Trả về true nếu đã đăng nhập, false nếu chưa
  };
};
