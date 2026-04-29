import { Search } from "lucide-react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <Search className="icon-search" />
      <input
        type="text"
        placeholder="Tìm kiếm bạn bè..."
        onChange={(e) => onSearch(e.target.value)} // Báo kết quả ngay khi gõ
      />
    </div>
  );
};

export default SearchBar;
