import React from "react";

const Number = ({ value, onClick }) => {
  return (
    <button className="col-25" onClick={() => onClick(value)}>
      {value}
    </button>
  );
};

export default Number;
