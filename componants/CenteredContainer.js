import React from "react";

const CenteredContainer = ({ children, style }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default CenteredContainer;
