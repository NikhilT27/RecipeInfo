import React from "react";

export default function Warning({ logoSrc, message }) {
  return (
    <>
      <div className="warning">
        <img src={logoSrc} className="warning-logo" /> <span>{message}</span>
      </div>
    </>
  );
}
