import React from "react";

const Button = ({ type, label }) => {
  return (
    <button type={type} className="btn-submit">
      {label}
    </button>
  );
};

export default Button;
