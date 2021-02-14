import React from "react";

const History = ({ history, order }) => {
  return (
    <div className="lap-line">
      {order}lap : {(history / 100).toFixed(2)}s
    </div>
  );
};

export default History;
