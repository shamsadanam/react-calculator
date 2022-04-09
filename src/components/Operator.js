import React from "react";

const Operator = ({ operation, onClick }) => {
  return (
    <button className="col-25" onClick={() => onClick(operation)}>
      {operation}
    </button>
  );
};

export default Operator;
