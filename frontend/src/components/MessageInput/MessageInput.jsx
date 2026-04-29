import "./MessageInput.css";

// value: nội dung đang gõ
// onChange: hàm để cập nhật nội dung đó ở component cha
// onSend: hàm để thực hiện gửi tin nhắn
const MessageInput = ({ value, onChange, onSend }) => {
  //Goi ham gui tin nhan
  const handleSubmit = (e) => {
    e.preventDefault();
    onSend();
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nhập tin nhắn ..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;
