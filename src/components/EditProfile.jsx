import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [availability, setAvailability] = useState("");
  const [isPetOwner, setIsPetOwner] = useState(false);
  const [isSitter, setIsSitter] = useState(false);

  const { user } = useContext(AuthContext);
  const { userId } = useParams();

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/auth/edit/${userId}`
        );

        setUserProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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

  const handleAvailabilityChange = (e) => {
    setAvailability(e.target.value);
  };

  const handlePetOwnerChange = (e) => {
    setIsPetOwner(e.target.checked);
  };

  const handleSitterChange = (e) => {
    setIsSitter(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      username,
      email,
      password,
      postalCode,
      aboutMe,
      availability,
      isPetOwner,
      isSitter,
    };

    try {
      // Make a POST request to save the updated profile
      const response = await axios.put(
        `http://localhost:5005/auth/edit/${userId}`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${user.storedToken}`,
          },
        }
      );
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <Link to={`/profile/${userId}`}>Back to Profile</Link>

      <h2>Edit Profile</h2>

      <button className="photo-edit-btn">Edit Photo</button>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>

        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>

        <label>
          Postal Code:
          <input
            type="text"
            value={postalCode}
            onChange={handlePostalCodeChange}
          />
        </label>

        <label>
          About Me:
          <textarea value={aboutMe} onChange={handleAboutMeChange} />
        </label>
        <label>
          Availability:
          <input
            type="text"
            value={availability}
            onChange={handleAvailabilityChange}
          />
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

        <label>
          Sitter:
          <input
            type="checkbox"
            checked={isSitter}
            onChange={handleSitterChange}
            className="edit-form-checkbox"
          />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
