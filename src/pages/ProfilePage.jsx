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
    if(user){const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5005/api/users/${user._id}`
        );
        console.log("fetched data for user ", data);
  
        // Check if currentUser's ID is in the favorites array
        if (data.favorites.includes(userId)) {
          setFavorite(true);
        }else{setFavorite(false);
        }
      } catch (err) {
        console.log("fetch user data error", err);
      }
    };
    fetchUserData();}
  }, [user,userId]);

  useEffect(() => {
    const fetchCurrentUserData = async () => {
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
    fetchCurrentUserData();
  }, [userId]);
  const handleFavoriteClick = async () => {
    try {
      if (favorite) {
        const response = await axios.put(
          `http://localhost:5005/api/favorites/${currentUser._id}`,
          {
            userIdToRemove: user._id,
          }
        );
        console.log("favorite removed", response.data);
      } else {
        const response = await axios.put(
          `http://localhost:5005/api/favorites/${currentUser._id}`,
          {
            userIdToAdd: user._id,
          }
        );
        console.log("favorite added", response.data);
      }
      setFavorite(!favorite);
    } catch (err) {
      console.log("update favorites error", err);
    }
  };
  

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
        onClick={handleFavoriteClick}
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
