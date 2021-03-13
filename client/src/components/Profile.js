import React from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <Link to="/home">
        <div className="profile-back"></div>
      </Link>
      <div className="profile-detail">
        <div className="profile-image"></div>
        <div className="profile-info">
          <div className="profile-title">Id</div>
          <div className="profile-title" style={{ fontWeight: 700 }}>
            Name
          </div>
          <div className="profile-title">Email</div>
        </div>
      </div>
      <div className="profile-saved">
        <div className="profile-title" style={{ fontWeight: 700 }}>
          Saved
        </div>
      </div>
      <div className="profile-history">
        <div className="profile-title" style={{ fontWeight: 700 }}>
          History
        </div>
      </div>
      <div>Logout</div>
    </>
  );
}
