import ConversationList from "../../sidebar/ConversationList/ConversationList";
import MessageInput from "../../../components/MessageInput/MessageInput";
import MessageItem from "../../../components/MessageItem/MessageItem";
import SearchBar from "../../sidebar/SearchBar/SearchBar";
import { useState, useRef, useEffect } from "react";
import "./ChatBox.css";

const ChatBox = () => {
  // 1. Danh sách bạn bè
  const [friends] = useState([
    { id: "1", name: "Van Khanh", lastMsg: "To rat thich an cut" },
    { id: "2", name: "Admin", lastMsg: "Dit me may" },
  ]);

  // 2. State quản lý người đang chat (Mặc định là người đầu tiên)
  const [activeFriend, setActiveFriend] = useState(friends[0]);

  // 3. Logic lưu trữ tin nhắn theo từng ID bạn bè (Object Mapping)
  const [allMessages, setAllMessages] = useState({
    1: [
      {
        id: "m1",
        text: "Vân Khánh ơi cậu thích ăn cứt không",
        sender: "me",
        time: "01:00 CH",
      },
      {
        id: "m2",
        text: "Có, cứt là món tớ thích nhất",
        sender: "other",
        time: "01:01 CH",
      },
    ],
    2: [
      {
        id: "m3",
        text: "Chào Admin, cho em hỏi tí",
        sender: "me",
        time: "09:00 SA",
      },
      { id: "m4", text: "Dit me may", sender: "other", time: "09:01 SA" },
    ],
  });
  // Ô tìm kiếm cuộc hội thoại
  const [searchTerm, setSearchTerm] = useState("");
  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 5. Lấy tin nhắn của người hiện tại (nếu chưa có thì trả về mảng rỗng)
  const [newMessage, setNewMessage] = useState("");
  const currentMessages = allMessages[activeFriend.id] || [];

  // 6. Hàm gửi tin nhắn
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const timeString = new Date().toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const msgObj = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "me",
      time: timeString,
    };

    // Cập nhật tin nhắn vào đúng KEY của người đang chat
    setAllMessages((prev) => ({
      ...prev,
      [activeFriend.id]: [...(prev[activeFriend.id] || []), msgObj],
    }));

    setNewMessage("");
  };

  // 6. Tự động cuộn xuống khi có tin nhắn mới hoặc đổi người chat
  const messageEndRef = useRef(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]); // Chạy lại mỗi khi danh sách tin nhắn hiện tại thay đổi

  return (
    <div className="chat-container">
      {/* Sidebar - Thanh bên trái */}
      <div className="sidebar">
        <div className="user-profile">
          <h3>HELLO, NAM</h3>
        </div>

        {/* O tim kiem */}
        <SearchBar onSearch={setSearchTerm} />

        {/* Danh sach cuoc hoi thoai */}
        <ConversationList
          friends={filteredFriends}
          activeFriendId={activeFriend.id}
          onSelect={setActiveFriend}
        />
      </div>

      {/* Khung chat chính */}
      <div className="chat-main">
        <div className="chat-header">
          <h3>{activeFriend.name}</h3>
        </div>

        {/* Danh sách tin nhắn */}
        <div className="message-list">
          {currentMessages.map((msg) => (
            <MessageItem key={msg.id} msg={msg} />
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Ô nhập tin nhắn */}
        <MessageInput
          value={newMessage}
          onChange={setNewMessage}
          onSend={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatBox;
