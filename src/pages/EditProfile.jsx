import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AvatarEditor from "react-avatar-editor";
import imgPlaceholder from "../assets/placeholder.png";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");
  const [isPetOwner, setIsPetOwner] = useState(false);
  const [isSitter, setIsSitter] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const { userId } = useParams();
  const navigate = useNavigate();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [scale, setScale] = useState(1);

  const [loading, setLoading] = useState(true);
  const [userImg, setUserImg] = useState("");

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Upload image
  const uploadImage = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (profileImage && profileImage.type.includes("image")) {
        const formData = new FormData();
        formData.append("imageUrl", e.target.image.files[0]);

        const response = await axios.post(
          `http://localhost:5005/auth/upload/${userId}`,
          formData
        );
        console.log(response);
        setIsLoading(false);
        setShowUploadForm(false);

        // Reset form
        setProfileImage(null);
        setImagePreview(null);

        // Fetch user data again for the image
        fetchUserforImg();
      } else {
        throw new Error("Please select a valid image file.");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/auth/edit/${userId}`
        );
        setUsername(response.data.user.username || "");
        setEmail(response.data.user.email || "");
        setPassword(response.data.user.password || "");
        setPostalCode(response.data.user.postalCode || "");
        setDescription(response.data.user.description || "");
        setAvailability(response.data.user.availability || "");
        setIsPetOwner(response.data.user.isPetOwner || false);
        setIsSitter(response.data.user.isSitter || false);
        setProfileImage(response.data.user.profileImage || null);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);
  const fetchUserforImg = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5005/auth/edit/${userId}`
      );

      setUserImg(response.data.user.img);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserforImg();
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
    setDescription(e.target.value);
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
  const handleEditPhoto = () => {
    setShowUploadForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      username,
      email,
      password,
      postalCode,
      description,
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
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <div>
      <Link className="edit-profile-link" to={`/profile/${userId}`}>
        Back to Profile
      </Link>

      {!showUploadForm && (
        <div className="user-photo-edit-btn">
          <img
            className="profileImg"
            src={!userImg ? imgPlaceholder : userImg}
            alt={username}
          />
          <button className="user-photo-edit-btn" onClick={handleEditPhoto}>
            Edit
          </button>
        </div>
      )}

      {showUploadForm && (
        <div>
          <h2 className="h2-edit-img">Add image</h2>
          <div className="upload-form-container">
            <div className="upload-form">
              <form onSubmit={uploadImage}>
                <label className="file-upload-label">
                  Choose Photo
                  <input
                    className="upload-input"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    name="image"
                    onChange={handleImageChange}
                  />
                </label>
                <div className="profile-photo">
                  {imagePreview && (
                    <div className="avatar-editor">
                      <AvatarEditor
                        image={imagePreview}
                        width={250}
                        height={250}
                        border={50}
                        borderRadius={125}
                        color={[255, 255, 255, 0.6]}
                        scale={scale}
                      />
                      <input
                        type="range"
                        min={0.1}
                        max={2}
                        step={0.1}
                        value={scale}
                        onChange={(e) => setScale(parseFloat(e.target.value))}
                      />
                    </div>
                  )}
                </div>
                {isLoading ? (
                  <p>Uploading...</p>
                ) : (
                  <button className="upload-btn" type="submit">
                    Upload
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="edit-profile-form">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="example@gmail.com"
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="*****"
            autoComplete="current-password"
          />
        </label>

        <label>
          Postal Code:
          <input
            type="text"
            value={postalCode}
            onChange={handlePostalCodeChange}
            placeholder="10324"
          />
        </label>

        <label>
          About Me:
          <textarea
            value={description}
            onChange={handleAboutMeChange}
            placeholder="Share your pet journey... Whether you're a pet owner or sitter, tell us your story!"
          />
        </label>
        <label>
          Availability:
          <input
            type="text"
            value={availability}
            onChange={handleAvailabilityChange}
            placeholder="Enter your availability for pet sitting "
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
