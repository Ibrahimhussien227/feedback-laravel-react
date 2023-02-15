import React, { useRef } from "react";
import { Link } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

const Signup = () => {
  // Used useRef not useState because i don't need my page to rendering on everyChange
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwrodConfirmationRef = useRef();

  const { setUser, setToken } = useStateContext;

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwrodConfirmationRef.current.value,
    };

    axiosClient
      .post("/signup", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const { response } = err;

        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup for free</h1>
          {/* <label htmlFor="email">Email</label> */}
          <input ref={nameRef} placeholder="Full Name" />
          <input ref={emailRef} type="email" placeholder="Email Address" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input
            ref={passwrodConfirmationRef}
            type="password"
            placeholder="Password Confirmation"
          />
          <button className="btn btn-block" type="submit">
            Signup
          </button>
          <p className="message">
            Already Registered? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
