import { useState } from "react";
import { SquareArrowRightExit } from "lucide-react";
import "./Logout.css";

const Logout = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Nút kích hoạt */}
      <button
        className="logout-btn"
        onClick={() => setShowConfirm(true)}
        title="Đăng xuất"
      >
        <SquareArrowRightExit size={20} />
      </button>

      {/* Khối Modal xác nhận */}
      {showConfirm && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h3>Xác nhận đăng xuất</h3>
            <p>Bạn có chắc chắn muốn rời khỏi ZeroChat chứ?</p>
            <div className="modal-actions">
              <button className="btn-no" onClick={() => setShowConfirm(false)}>
                Không, ở lại
              </button>
              <button className="btn-yes" onClick={handleLogout}>
                Có, đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
