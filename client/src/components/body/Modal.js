/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";

const Modal = ({ isOpen, toggleModal, addItem }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("quantity", quantity);

      const response = await axios.post("http://localhost:8001/inventory/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data" // Or 'application/x-www-form-urlencoded' if using query string
        }
      });

      addItem(response.data);

      setName("");
      setQuantity("");
      toggleModal();
    } catch (error) {
      console.log(error.response);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="modal-close" onClick={toggleModal}>
          ×
        </p>
        <h2>Create Inventory Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={15}
            />
          </div>
          <div className="modal-field">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              min="1"
            />
          </div>
          <button type="submit" className="modal-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
