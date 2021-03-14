import React from "react";
import hint from "../images/hint.svg";

export default function Hint({ onSubmit }) {
  return (
    <>
      <div className="hint">
        <div className="hint-logo-box">
          <img src={hint} alt="hand with bulb" className="hint-logo" />
        </div>
        <div className="hint-detail">
          <div className="hint-text">
            <span style={{ fontWeight: "700" }}>Username:</span> abc@gmail.com
          </div>
          <div className="hint-text">
            <span style={{ fontWeight: "700" }}> Password:</span> 12345
          </div>
        </div>

        <div
          className="hint-demo-login"
          onClick={() =>
            onSubmit({ email: "abc@gmail.com", password: "12345" })
          }
        >
          Demo Login
        </div>
      </div>
    </>
  );
}
