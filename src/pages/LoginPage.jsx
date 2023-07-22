import { useState, useContext, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { API_URL } from "../config/config.index";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { storeToken, authenticateUser, user } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    try {
      const response = await axios.post(`${API_URL}/auth/login`, requestBody);
      console.log("Server response:", response.data);
      console.log("JWT token", response.data.authToken);
      localStorage.setItem("authToken", response.data.authToken);

      if (response.data.authToken) {
        console.log("Token stored");
        storeToken(response.data.authToken);
      }

      authenticateUser();
      setIsLoading(false);
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };
  if (isLoading) {
    return "laoding";
  }
  if (!isLoading && user) {
    navigate(`/profile/${user._id}`);
  }

  // Google Login
  const handleGoogleAuth = async (e) => {
    e.preventDefault();

    // Redirect the user to the Google Authentication route on your server
    window.location.href = `${API_URL}/auth/google/callback`;
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="input-field"
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <button className="login-button" onClick={handleGoogleAuth}>
        <img src="" alt="" />
        <span> Log in with Google</span>
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
