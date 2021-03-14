import React, { useState } from "react";
import { useForm } from "react-hook-form";

import logo from "../images/logo.svg";
import warning from "../images/warning.svg";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Warning from "./Warning";
import Hint from "../components/Hint";
import RecipeInfo from "../components/RecipeInfo";
import Loading from "./Loading";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const user = await axios.post("/users/login", {
      email: data.email,
      password: data.password,
    });

    if (user) {
      setLoading(false);
      if (user.data.token) {
        localStorage.setItem("authToken", user.data.token);
        history.push("/home");
      } else {
        // console.log(user.data.errors.user);
        setError(user.data.errors.user);
      }
    }
  };

  return (
    <>
      <div className="login-box-main">
        <RecipeInfo />
        <div className="login-box">
          <div className="login">
            <div className="logo-background">
              <img src={logo} alt="logo" className="logo-image" />
            </div>
            {loading ? (
              <form>
                <Loading />
              </form>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                {error == "" ? (
                  <div></div>
                ) : (
                  <Warning logoSrc={warning} message={error} />
                )}
                <input
                  name="email"
                  placeholder="Email"
                  ref={register({ required: true })}
                />
                {errors.email && (
                  <Warning logoSrc={warning} message="This field is required" />
                )}

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={register({ required: true })}
                />
                {errors.password && (
                  <Warning logoSrc={warning} message="This field is required" />
                )}

                <button className="golden-button" type="submit">
                  Login
                </button>
              </form>
            )}
            <div className="blank-line"></div>
            <Link to="/signup">
              <button className="golden-button">Signup</button>
            </Link>
          </div>
          <Hint />
        </div>
      </div>
    </>
  );
}
