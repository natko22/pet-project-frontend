import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const upload_preset = process.env.UPLOAD_PRESET;

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (profileImage && profileImage.type.includes("image")) {
        const formData = new FormData();
        formData.append("file", profileImage);
        formData.append("upload_preset", upload_preset);
        formData.append("cloud_name", "natassa");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/natassa/image/upload",
          formData
        );
        console.log(formData);

        const imageUrl = response.data["secure_url"];
        // Do something with the imageUrl, such as saving it to the database
        console.log(imageUrl);
        alert(imageUrl);
        setIsLoading(false);
      } else {
        throw new Error("Please select a valid image file.");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5005/api/users/${user._id}`
        );
        console.log("fetched data", data);
        setCurrentUser(data);
      } catch (err) {
        console.log("fetch user data error", err);
      }
    };
    fetchUserData();
  }, [user]);
  if (!currentUser) {
    return "loading";
  }

  return (
    <div>
      <div>
        <h1>Welcome to your profile {currentUser.username} </h1>
        <Link to="/edit">Edit Profile</Link>

        <h2>Add image</h2>
        <div className="card">
          <form onSubmit={uploadImage}>
            <label>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                name="image"
                onChange={handleImageChange}
              />
            </label>
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <button type="submit">Upload</button>
            )}
          </form>
          <div className="profile-photo">
            {imagePreview && <img src={imagePreview} alt="" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
