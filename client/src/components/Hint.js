import React from "react";
import hint from "../images/hint.svg";

export default function Hint() {
  return (
    <>
      <div className="hint">
        <div className="hint-logo-box">
          <img src={hint} alt="hand with bulb" className="hint-logo" />
        </div>
        <div className="hint-detail">
          <div className="hint-text">
            <span style={{ fontWeight: "700" }}>Username:</span>{" "}
            nikhilthakare14@gmail.com
          </div>
          <div className="hint-text">
            <span style={{ fontWeight: "700" }}> Password:</span> abc123
          </div>
        </div>
      </div>
    </>
  );
}
