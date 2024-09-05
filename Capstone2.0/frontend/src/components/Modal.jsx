import React from "react";
import "../styles/modal.css"; // Add styles for the modal

const Modal = ({ activity, onClose }) => {
  if (!activity) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{activity.name}</h2>
        <p>{activity.description}</p>
        <p>Price: {activity.price}</p>
        <p>Rating: {activity.rating}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
