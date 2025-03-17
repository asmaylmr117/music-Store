
import React from "react";
import { useNavigate } from "react-router-dom"; // Replace withRouter with useNavigate
import "./registeration.css";

function Login({
  userLoginInformation,
  setUserLoginInformation,
  setLogged,
}) {
  const navigate = useNavigate(); // Hook for navigation

  const handleonChange = (e) => {
    const { name, value } = e.target;

    setUserLoginInformation({
      ...userLoginInformation,
      [name]: value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    let loginUpdatedData = JSON.parse(localStorage.getItem("user")) || [];

    const checkUser = loginUpdatedData.filter(
      (acc) =>
        acc.email === userLoginInformation.loginEmail &&
        acc.password === userLoginInformation.loginPassword
    );

    const check = checkUser.length > 0; // Simplified check

    if (check) {
      navigate("/shop"); // Replace history.push with navigate
      setLogged(true);

      sessionStorage.setItem(
        "loggedAccount",
        JSON.stringify({
          email: checkUser[0].email,
          username: checkUser[0].username,
        })
      );
    } else {
      alert("Incorrect email or password");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLoginSubmit} className="login-form">
        <fieldset>
          <legend>Login</legend>

          <label>
            Email
            <input
              className="registretion-input"
              name="loginEmail"
              type="email"
              value={userLoginInformation.loginEmail}
              onChange={handleonChange}
              placeholder="Enter your email"
              required
            />
          </label>
          {userLoginInformation.loginEmail === "" && (
            <span style={{ color: "red" }}>Please enter your email</span>
          )}
          <label>
            Password
            <input
              className="registretion-input"
              name="loginPassword"
              type="password"
              value={userLoginInformation.loginPassword}
              onChange={handleonChange}
              placeholder="Enter your password" // Fixed typo: "enetr" to "Enter"
              required
            />
          </label>
          {userLoginInformation.loginPassword === "" && (
            <span style={{ color: "red" }}>Please enter your password</span>
          )}
          <button className="login-btn">Submit</button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login; // Remove withRouter wrapper