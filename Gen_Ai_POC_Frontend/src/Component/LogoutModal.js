import React from "react";
import "./LogoutModal.css";

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <p>Are you sure you want to logout?</p>
        <div className="logout-modal-buttons">
          <button onClick={onLogout}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
