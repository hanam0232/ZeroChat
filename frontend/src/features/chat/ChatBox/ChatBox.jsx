import { useState, useRef, useEffect } from "react";
import MessageInput from "../../../components/MessageInput/MessageInput";
import MessageItem from "../../../components/MessageItem/MessageItem";
import "./ChatBox.css";

const ChatBox = () => {
  //Du lieu tin nhan
  const [messages, setMessages] = useState([
    { id: "1", text: "Vân Khánh ơi cậu thích ăn cứt không", sender: "me" },
    { id: "2", text: "Có, cứt là món tớ thích nhất", sender: "other" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  //Gui tin nhan
  const handleSendMessage = () => {
    // if (newMessage.trim() === "") return;

    const timeString = new Date().toLocaleDateString("vi-VN", {
      // day: "2-digit",
      // month: "2-digit",
      // year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    //Thuoc tinh cua 1 tin nhan
    const msgObj = {
      id: Date.now(),
      text: newMessage,
      sender: "me",
      time: timeString,
    };
    setMessages([...messages, msgObj]);
    setNewMessage("");
  };

  //Logic cuon trang
  const messageEndRef = useRef(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      {/* SideBar */}
      <div className="sidebar">
        <div className="user-profile">
          <h3>HELLO, NAM</h3>
        </div>
        <div className="friend-list">
          <div className="friend-item active">Vân Khánh</div>
        </div>
      </div>

      {/* ChatMain */}
      <div className="chat-main">
        <div className="chat-header">
          <h3>Vân Khánh</h3>
        </div>

        {/* Box chat */}
        <div className="message-list">
          {messages.map((msg) => (
            <MessageItem key={msg.id} msg={msg} />
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Truyen du lieu va ham xuong component con */}
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
