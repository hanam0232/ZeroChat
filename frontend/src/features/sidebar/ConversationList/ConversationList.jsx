import "./ConversationList.css";

const ConversationList = ({ friends, activeFriendId, onSelect }) => {
  return (
    <div className="friend-list">
      {friends.map((friend) => (
        <div
          key={friend.id}
          className={`friend-item ${friend.id === activeFriendId ? "active" : ""}`}
          onClick={() => onSelect(friend)}
        >
          {/* INFO_FRIEND */}
          <div className="friend-info">
            <div className="friend-name">{friend.name}</div>
            <div className="last-message">{friend.lastMsg}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
