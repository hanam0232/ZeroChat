import "./MessageItem.css";

const MessageItem = ({ msg }) => {
  //Kiem tra tin nhan co phai cua sender khong
  const isMe = msg.sender === "me";

  return (
    <div className={`message ${isMe ? "sent" : "received"}`}>
      <div className="message-text">{msg.text}</div>
      <div className="message-time">{msg.time}</div> {/*Thoi gian gui*/}
    </div>
  );
};

export default MessageItem;
