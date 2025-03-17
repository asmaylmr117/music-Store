import React from "react";
import "./registeration.css";
import { useNavigate } from "react-router-dom"; // Replace withRouter with useNavigate

function Signup({
  userSignupInformation,
  setUserSignupInformation,
  submitted,
  setSubmitted,
  logged,
  setLogged,
}) {
  const navigate = useNavigate(); // Hook for navigation

  const handleonChange = (e) => {
    const { name, value } = e.target;

    setUserSignupInformation({
      ...userSignupInformation,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, username, password, repeatPassword } = e.target;
    let data = {
      id: Math.random() * 100,
      username: username.value,
      email: email.value,
      password: password.value,
      repeatPassword: repeatPassword.value,
    };
    let updatedData = [];
    updatedData = JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : [];

    if (
      updatedData.some((v) => v.email === userSignupInformation.email) ||
      password.value !== repeatPassword.value ||
      password.value.length < 6 // Fixed condition: length check
    ) {
      alert("Email already exists, passwords do not match, or password is too short");
    } else {
      updatedData.push(data);
      localStorage.setItem("user", JSON.stringify(updatedData));

      // Use navigate instead of history.push
      navigate("/shop");

      sessionStorage.setItem(
        "loggedAccount",
        JSON.stringify({
          email: userSignupInformation.email,
          username: userSignupInformation.username,
        })
      );
      setSubmitted(true);
      setLogged(true);
    }
  };

  return (
    <div className="big-form">
      <form className="form-container" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Registration</legend>
          <label htmlFor="username">
            Username
            <input
              className="registretion-input"
              id="1"
              name="username"
              type="text"
              value={userSignupInformation.username}
              onChange={handleonChange}
              placeholder="enter your username"
              required
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              className="registretion-input"
              id="2"
              name="email"
              type="email"
              value={userSignupInformation.email}
              onChange={handleonChange}
              placeholder="enter your email"
              required
            />
          </label>
          {userSignupInformation.email === "" ? (
            <span style={{ color: "red" }}>Please enter your email</span>
          ) : null}
          <label htmlFor="password">
            Password
            <input
              className="registretion-input"
              id="3"
              name="password"
              type="password"
              value={userSignupInformation.password}
              onChange={handleonChange}
              placeholder="enter your password"
              required
            />
          </label>
          {userSignupInformation.password.length < 6 &&
          userSignupInformation.password !== "" ? (
            <span style={{ color: "red" }}>
              Password must be at least 6 characters
            </span>
          ) : null}
          <label htmlFor="repeatPassword">
            Repeat Password
            <input
              className="registretion-input"
              id="4"
              name="repeatPassword"
              type="password"
              value={userSignupInformation.repeatPassword}
              onChange={handleonChange}
              placeholder="confirm password"
              required
            />
          </label>
          {userSignupInformation.repeatPassword !==
            userSignupInformation.password &&
          userSignupInformation.repeatPassword !== "" ? (
            <span style={{ color: "red" }}>Passwords do not match</span>
          ) : null}

          <button type="submit" className="form-btn">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Signup; // Remove withRouter wrapper