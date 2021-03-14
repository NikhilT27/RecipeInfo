import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import logo from "../images/logo.svg";
import warning from "../images/warning.svg";
import leftArrow from "../images/left-arrow.svg";
import { Link, useHistory } from "react-router-dom";
import Warning from "./Warning";
import RecipeInfo from "../components/RecipeInfo";

export default function Signup() {
  const [error, setError] = useState("");
  const history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = async (data) => {
    const user = await axios.post("/users/register", {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    if (user) {
      if (user.data.token) {
        localStorage.setItem("authToken", user.data.token);
        history.push("/home");
      } else {
        console.log(user.data.errors);
        if (user.data.errors.password) {
          setError(user.data.errors.password);
        } else {
          setError(user.data.errors.username);
        }
      }
    }
  };

  return (
    <>
      <div className="login-box-main">
        <RecipeInfo />
        <div className="signup-box">
          <Link to="/">
            <div className="signup-back">
              <img
                src={leftArrow}
                alt="arrow pointing left"
                className="signup-back-logo"
              />
            </div>
          </Link>
          <div className="signup">
            <div className="logo-background">
              <img src={logo} alt="logo" className="logo-image" />
            </div>
            {error == "" ? (
              <div></div>
            ) : (
              <Warning logoSrc={warning} message={error} />
            )}

            <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
              <input
                name="name"
                placeholder="Name"
                ref={register({ required: true })}
              />
              {errors.name && (
                <Warning logoSrc={warning} message="This field is required" />
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

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                ref={register({ required: true })}
              />
              {errors.confirmPassword && (
                <Warning logoSrc={warning} message="This field is required" />
              )}

              <button className="golden-button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
