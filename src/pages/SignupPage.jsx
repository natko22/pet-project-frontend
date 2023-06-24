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

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { username, email, password, isPetOwner, isSitter };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((_response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signup">
      <form onSubmit={handleSignupSubmit}>
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
            className="signup-input"
            type="checkbox"
            checked={isPetOwner}
            onChange={handlePetOwnerChange}
          />
          Pet Owner
        </label>

        <label>
          <input
            className="signup-input"
            type="checkbox"
            checked={isSitter}
            onChange={handleSitterChange}
          />
          Pet Sitter
        </label>

        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default SignupPage;
