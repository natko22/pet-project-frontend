import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
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
  const [favorite, setFavorite] = useState(false);

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
          currentUser.description
        )}
      </div>
      <div>
        <ReviewBox reviews={currentUser.reviews} />
      </div>
      <div>
        <MyPetsBox pets={currentUser.pets} />
      </div>
      <div className="contact-box">
        <div className="calender">calender</div>
        <div className="contact-btns">
          <Link>Chat with me</Link>
          <Link>Book</Link>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
