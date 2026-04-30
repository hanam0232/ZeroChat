import ConversationList from "../../sidebar/ConversationList/ConversationList";
import MessageInput from "../../../components/MessageInput/MessageInput";
import MessageItem from "../../../components/MessageItem/MessageItem";
import MessageList from "../../../assets/UserData/MessageList.jsx";
import { useAuth } from "../../../components/hooks/useAuth.jsx";
import Logout from "../../../components/Logout/Logout.jsx";
import SearchBar from "../../sidebar/SearchBar/SearchBar";
import { useState, useRef, useEffect } from "react";
import axios from "axios"; // Đã thêm import axios
import "./ChatBox.css";

const ChatBox = () => {
  const { user: currentUser, displayName } = useAuth();

  // 1. States quản lý giao diện
  const [activeFriend, setActiveFriend] = useState(null);
  const [allMessages, setAllMessages] = useState(MessageList);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // State để cập nhật giao diện nút bấm tức thì khi nhấn Kết bạn thành công
  const [localRequestSent, setLocalRequestSent] = useState(false);

  // 2. Reset trạng thái gửi lời mời khi người dùng chuyển sang chọn người chat khác
  // useEffect(() => {
  //   setLocalRequestSent(false);
  // }, [activeFriend?._id]);

  // 3. Xác định trạng thái quan hệ giữa mình và người đang chọn
  const isFriend = currentUser?.friends?.includes(activeFriend?._id);

  // Kiểm tra xem mình có nhận được lời mời từ người này không
  const hasReceivedRequest = currentUser?.friendRequests?.includes(
    activeFriend?._id,
  );

  // Kiểm tra xem mình đã gửi lời mời cho người này chưa (check trong DB hoặc vừa bấm xong)
  const hasSentRequest =
    currentUser?.sentRequests?.includes(activeFriend?._id) || localRequestSent;

  // 4. Lấy tin nhắn của cuộc hội thoại hiện tại
  // const currentMessages = activeFriend
  //   ? allMessages[activeFriend._id] || []
  //   : [];

  // 5. Hàm gửi tin nhắn (Chỉ hoạt động nếu đã là bạn bè)
  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !isFriend) return;

    const msgObj = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "me",
      time: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setAllMessages((prev) => ({
      ...prev,
      [activeFriend._id]: [...(prev[activeFriend._id] || []), msgObj],
    }));
    setNewMessage("");
  };

  // 6. Tự động cuộn xuống cuối danh sách tin nhắn
  const messageEndRef = useRef(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  // 7. Hàm xử lý Kết bạn (Gửi lên Backend)
  const handleAddFriend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/send-request",
        {
          targetId: activeFriend._id,
          myId: currentUser.id, // ID của mình
        },
      );

      if (response.status === 200) {
        // 1. Cập nhật state local để nút đổi chữ ngay lập tức
        setLocalRequestSent(true);

        // 2. Cập nhật localStorage để khi chuyển trang quay lại vẫn nhớ
        // Mình giả định bạn lưu danh sách đã gửi vào mảng sentRequests
        const updatedUser = {
          ...currentUser,
          sentRequests: [...(currentUser.sentRequests || []), activeFriend._id],
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        console.log("Kết bạn thành công!");
      }
    } catch (error) {
      console.error("Lỗi kết bạn:", error);
    }
  };

  const handleAccept = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/accept-friend",
        {
          myId: currentUser.id,
          targetId: activeFriend._id,
        },
      );

      if (res.status === 200) {
        // Cập nhật localStorage để useAuth lấy được mảng friends mới
        const updatedUser = {
          ...currentUser,
          friends: [...(currentUser.friends || []), activeFriend._id],
          friendRequests: currentUser.friendRequests.filter(
            (id) => id !== activeFriend._id,
          ),
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        alert("Hai bạn đã trở thành bạn bè! Giờ có thể nhắn tin.");
        window.location.reload(); // Reload để MessageList và Input hiện ra
      }
    } catch (err) {
      console.error("Lỗi chấp nhận:", err);
    }
  };

  const handleDecline = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/decline-friend", {
        myId: currentUser.id,
        targetId: activeFriend._id,
      });

      // Cập nhật local để mất nút Chấp nhận/Từ chối, quay về nút Kết bạn
      const updatedUser = {
        ...currentUser,
        friendRequests: currentUser.friendRequests.filter(
          (id) => id !== activeFriend._id,
        ),
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.location.reload();
    } catch (err) {
      console.error("Lỗi từ chối:", err);
    }
  };

  return (
    <div className="chat-container">
      {/* Sidebar bên trái */}
      <div className="sidebar">
        <div className="user-profile">
          <h3>Hello, {displayName}</h3>
          <Logout />
        </div>
        <SearchBar onSearch={setSearchTerm} />
        <ConversationList
          activeFriendId={activeFriend?._id}
          onSelect={setActiveFriend}
          searchTerm={searchTerm}
        />
      </div>

      {/* Khung chat chính bên phải */}
      <div className="chat-main">
        {activeFriend ? (
          <>
            <div className="chat-header">
              <h3>{activeFriend.displayName}</h3>
            </div>

            <div className="message-list">
              {isFriend ? (
                /* TRƯỜNG HỢP 1: ĐÃ KẾT BẠN -> HIỆN TIN NHẮN */
                <>
                  {currentMessages.map((msg) => (
                    <MessageItem key={msg.id} msg={msg} />
                  ))}
                  <div ref={messageEndRef} />
                </>
              ) : (
                /* TRƯỜNG HỢP 2: CHƯA KẾT BẠN -> HIỆN THÔNG BÁO VÀ NÚT */
                <div className="friend-request-container">
                  <div className="warning-box">
                    <p>
                      Bạn và <b>{activeFriend.displayName}</b> chưa là bạn bè
                      trên ZeroChat.
                    </p>

                    {hasReceivedRequest ? (
                      /* ĐỐI PHƯƠNG GỬI CHO MÌNH */
                      <div className="button-group">
                        <button className="btn-accept" onClick={handleAccept}>
                          Chấp nhận
                        </button>
                        <button className="btn-decline" onClick={handleDecline}>
                          Từ chối
                        </button>
                      </div>
                    ) : hasSentRequest ? (
                      /* MÌNH ĐÃ GỬI YÊU CẦU */
                      <button className="btn-sent" disabled>
                        Đã gửi lời mời
                      </button>
                    ) : (
                      /* CHƯA CÓ TƯƠNG TÁC GÌ */
                      <button className="btn-add" onClick={handleAddFriend}>
                        Kết bạn
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Ô nhập tin nhắn: Chỉ hiện khi đã là bạn bè */}
            {isFriend && (
              <MessageInput
                value={newMessage}
                onChange={setNewMessage}
                onSend={handleSendMessage}
              />
            )}
          </>
        ) : (
          /* MÀN HÌNH CHÀO MỪNG KHI CHƯA CHỌN AI */
          <div className="welcome-screen">
            <h3>Chào mừng tới ZeroChat</h3>
            <p>Chọn một người từ danh sách để bắt đầu trò chuyện</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
