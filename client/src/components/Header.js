/* eslint-disable react/prop-types */
import React from "react";

const Header = ({ toggleModal }) => {
  return (
    <div className="header">
      <p className="title">What&apos;s in my pantry?</p>
      <button className="header-button" onClick={toggleModal}>
        add item
      </button>
    </div>
  );
};

export default Header;
