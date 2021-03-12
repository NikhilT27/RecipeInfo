import React from "react";

import Home from "./Home";
import Login from "./Login";

export default function Main() {
  //   localStorage.removeItem("user");

  return <>{localStorage.getItem("user") ? <Home /> : <Login />}</>;
}
