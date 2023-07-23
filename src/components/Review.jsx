import React, { useState, useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import imgPlaceholder from "../assets/placeholder.png";
import { API_URL } from "../config/config.index";
import { AuthContext } from "../context/auth.context";
import EditReview from "./EditReview";
function Review({ commenter, review, stars, reviewId, fetchCurrentUserDate }) {
  const { user } = useContext(AuthContext);
  const [showEditReview, setShowEditReview] = useState(false);
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
  const handleEditReviewClick = () => {
    setShowEditReview(true);
  };

  const handleEditReviewClose = () => {
    setShowEditReview(false);
  };

  if (!currentCommenter) {
    return <p className="center-loading">Loading...</p>;
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
      {!showEditReview && (
        <>
          <p>
            {filled}
            {unfilled}
          </p>
          <p>{review}</p>
        </>
      )}
      {user._id === commenter && (
        <>
          {!showEditReview && (
            <button onClick={handleEditReviewClick} className="add-new-pet-btn">
              Edit review
            </button>
          )}
          {showEditReview && (
            <EditReview
              onClose={handleEditReviewClose}
              reviewId={reviewId}
              fetchCurrentUserDate={fetchCurrentUserDate}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Review;
