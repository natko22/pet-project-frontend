import React, { useState } from "react";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [isPetOwner, setIsPetOwner] = useState(false);
  const [isSitter, setIsSitter] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleAboutMeChange = (e) => {
    setAboutMe(e.target.value);
  };

  const handlePetOwnerChange = (e) => {
    setIsPetOwner(e.target.checked);
  };

  const handleSitterChange = (e) => {
    setIsSitter(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log(handleSubmit);

  return (
    <div>
      <Link to="/profile">Back to Profile</Link>

      <h2>Edit Profile</h2>

      <button className="photo-edit-btn">Edit Photo</button>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        <label>
          Postal Code:
          <input
            type="text"
            value={postalCode}
            onChange={handlePostalCodeChange}
          />
        </label>
        <br />
        <label>
          About Me:
          <textarea value={aboutMe} onChange={handleAboutMeChange} />
        </label>
        <label>
          Availability:
          <input />
        </label>
        <label>
          Pet Owner:
          <input
            type="checkbox"
            checked={isPetOwner}
            onChange={handlePetOwnerChange}
            className="edit-form-checkbox"
          />
        </label>
        <br />
        <label>
          Sitter:
          <input
            type="checkbox"
            checked={isSitter}
            onChange={handleSitterChange}
            className="edit-form-checkbox"
          />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
