import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPetOwner, setIsPetOwner] = useState(false);
  const [isSitter, setIsSitter] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePetOwnerChange = (e) => {
    setIsPetOwner(e.target.checked);
  };

  const handleSitterChange = (e) => {
    setIsSitter(e.target.checked);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { username, email, password, isPetOwner, isSitter };

    try {
      await axios.post(`${API_URL}/auth/signup`, requestBody);
      navigate("/login");
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup" onSubmit={handleSignupSubmit}>
        <label>
          Username:
          <input
            className="signup-input"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>

        <label>
          Email:
          <input
            className="signup-input"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>

        <label>
          Password:
          <input
            className="signup-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>

        <label>
          <input
            className="signup-checkbox"
            type="checkbox"
            checked={isPetOwner}
            onChange={handlePetOwnerChange}
          />
          Pet Owner
        </label>

        <label>
          <input
            className="signup-checkbox"
            type="checkbox"
            checked={isSitter}
            onChange={handleSitterChange}
          />
          Pet Sitter
        </label>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default SignupPage;