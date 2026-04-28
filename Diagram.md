<!-- prettier-ignore -->
src/
├── assets/              # Hình ảnh, icons, font
├── components/          # Các UI components dùng chung (Atom/Molecule)
│   ├── Button/
│   ├── Input/
│   ├── Modal/
│   └── Avatar/
├── features/            # Các tính năng chính (mỗi folder là một module)
│   ├── auth/            # Đăng nhập, đăng ký
│   │   ├── LoginForm/
│   │   └── RegisterForm/
│   ├── chat/            # Quản lý tin nhắn và nội dung chat
│   │   ├── ChatWindow/   # Khung chat chính
│   │   ├── MessageList/  # Danh sách tin nhắn
│   │   ├── MessageItem/  # Chi tiết từng tin nhắn (Text, File, Video)
│   │   └── MessageInput/ # Ô nhập liệu, đính kèm file
│   ├── sidebar/         # Thanh bên trái
│   │   ├── ConversationList/ # Danh sách các cuộc hội thoại
│   │   ├── SearchBar/        # Tìm kiếm bạn bè/nhóm
│   │   └── UserProfile/      # Thông tin cá nhân & Đăng xuất
│   ├── friends/         # Tính năng kết bạn
│   │   ├── FriendRequest/
│   │   └── FriendList/
│   ├── groups/          # Quản lý nhóm
│   │   ├── CreateGroupModal/
│   │   └── GroupSettings/
│   └── notifications/   # Thông báo đẩy, báo tin nhắn mới
│       └── NotificationBadge/
├── hooks/               # Các custom hooks (useSocket, useAuth,...)
├── services/            # Axios config, API calls, Socket.io client
├── store/               # Redux hoặc Context API để quản lý state tổng
└── utils/               # Hàm hỗ trợ (format ngày tháng, xử lý file)
