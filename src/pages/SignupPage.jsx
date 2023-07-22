import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/config.index";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPetOwner, setIsPetOwner] = useState(false);
  const [isSitter, setIsSitter] = useState(false);
  const [postalCode, setPostalCode] = useState("");

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

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = {
      username,
      email,
      password,
      isPetOwner,
      isSitter,
      postalCode,
    };

    try {
      await axios.post(`${API_URL}/auth/signup`, requestBody);
      navigate("/login");
    } catch (error) {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = `${API_URL}/auth/google/callback`;
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
          Postal Code:
          <input
            className="signup-input"
            type="postalCode"
            value={postalCode}
            onChange={handlePostalCodeChange}
          />
        </label>

        <label>
          <input
            className="signup-checkbox"
            type="checkbox"
            checked={isPetOwner}
            onChange={handlePetOwnerChange}
          />
          Pet Owner :
        </label>

        <label>
          <input
            className="signup-checkbox"
            type="checkbox"
            checked={isSitter}
            onChange={handleSitterChange}
          />
          Pet Sitter :
        </label>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <button className="signup-button" onClick={handleGoogleSignUp}>
        <img src="" alt="" />
        <span>Sign up with Google</span>
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default SignupPage;
