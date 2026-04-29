import "Sidebar.css";

const Sidebar = ({ friends, activeFriendId, onSelect }) => {
  return (
    <div className="sidebar">
      {/* Chao user */}
      <div className="user-profile">
        <h3>Hello, User</h3>
      </div>

      {/* Friend List */}
      <div className="friend-list">
        {friends.map((friend) => {
          <div
            key={friend.id}
            className={`friend-item ${friend.id === activeFriendId ? "active" : ""}`}
            onClick={() => onSelect(friend)}
          >
            {friend.name}
          </div>;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
