import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../components/hooks/useAuth.jsx";
import "./ConversationList.css";

const ConversationList = ({ activeFriendId, onSelect }) => {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = useAuth(); // Lấy thông tin user hiện tại (có chứa mảng friends)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/all");
        // Lọc bỏ chính mình khỏi danh sách hiển thị bằng ID từ localStorage
        const filteredUsers = res.data.filter((u) => u._id !== currentUser?.id);
        setUsers(filteredUsers);
      } catch (err) {
        console.error("Lỗi lấy danh sách user:", err);
      }
    };
    if (currentUser?.id) fetchUsers();
  }, [currentUser?.id]);

  return (
    <div className="friend-list">
      {users.map((item) => {
        // 1. Kiểm tra xem người này đã có trong mảng friends của mình chưa
        const isFriend = currentUser?.friends?.includes(item._id);

        // 2. Kiểm tra xem người này có đang được chọn để chat không
        const isActive = item._id === activeFriendId;

        return (
          <div
            key={item._id}
            className={`friend-item ${isFriend ? "is-friend" : ""} ${isActive ? "active" : ""}`}
            onClick={() => onSelect(item)}
          >
            {/* Nếu Nam muốn hiện Avatar hình tròn chứa chữ cái đầu */}
            <div className="avatar">
              {item.displayName?.charAt(0).toUpperCase()}
            </div>

            <div className="friend-info">
              <div className="friend-name">{item.displayName}</div>
              <div className="last-message">
                {isFriend ? "Bạn bè" : "Người lạ"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationList;
