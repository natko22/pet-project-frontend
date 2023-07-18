import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import imgPlaceholder from "../assets/placeholder.png";
import { API_URL } from "../config/config.index";

function Review({ commenter, review, stars }) {
  const [currentCommenter, setCurrentCommenter] = useState();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/users/${commenter}`);
        console.log("fetched data", data);
        setCurrentCommenter(data);
      } catch (err) {
        console.log("fetch user data error", err);
      }
    };
    fetchUserData();
  }, [commenter]);

  const filled = "★".repeat(stars);
  const unfilled = "☆".repeat(5 - stars);
  if (!currentCommenter) {
    return "loading";
  }
  return (
    <div className="each-review-box">
      {" "}
      <div>
        <img
          className="profileImg commenterImg"
          src={!currentCommenter.img ? imgPlaceholder : currentCommenter.img}
          alt={currentCommenter.username}
        />
        <h3>{currentCommenter.username}</h3>
      </div>
      <p>
        {filled}
        {unfilled}
      </p>
      <p>{review}</p>
    </div>
  );
}

export default Review;
