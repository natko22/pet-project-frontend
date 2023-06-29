import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import imgPlaceholder from "../assets/placeholder.png";
import { useParams } from "react-router-dom";
import heart from "../assets/heart.png";
import ReviewBox from "../components/ReviewBox";
import MyPetsBox from "../components/MyPetsBox";


function ProfilePage() {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favorite, setFavorite] = useState(false);
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
  console.log("heart state", favorite);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5005/api/users/${userId}`
        );
        console.log("fetched data", data);
        setCurrentUser(data);
      } catch (err) {
        console.log("fetch user data error", err);
      }
    };
    fetchUserData();
  }, [userId]);
  if (!currentUser) {
    return "loading";
  }

  return (
    <div className="profilepage">
      <img
        className="profileImg"
        src={!currentUser.img ? imgPlaceholder : currentUser.img}
        alt={currentUser.username}
      />
      <h1>{currentUser.username} </h1>
      {currentUser.postalCode && <p>{currentUser.postalCode}</p>}
      <img
        className={favorite ? "coloredHeart" : "blackHeart"}
        src={heart}
        alt="heart"
        onClick={() => {
          setFavorite(!favorite);
        }}
      />
      {userId === user._id && <Link to={`/edit/${userId}`}>Edit Profile</Link>}
      <div className="aboutme-box">
        <h2>About me</h2>
        {!currentUser.description ? (
          <p>
            This user prefers mystery over biography, thus the description is on
            a permanent coffee break!
          </p>
        ) : (
          user.description
        )}
      </div>
      <div>
        <ReviewBox reviews={currentUser.reviews} />
      </div>
      <div>
      <MyPetsBox pets={currentUser.pets}/>
      </div>
      <div className="contact-box">
        <div className="calender">calender</div>
        <div className="contact-btns">
        <Link>Chat with me</Link>
        <Link>Book</Link>
        </div>
      </div>
      {/* <h2>Add image</h2>
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
        </div> */}
    </div>
  );
}

export default ProfilePage;
