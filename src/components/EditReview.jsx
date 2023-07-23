// EditReview.js
import React from "react";
import axios from "axios";
import { API_URL } from "../config/config.index";
import { useState, useEffect } from "react";
function EditReview({ onClose, reviewId, fetchCurrentUserDate }) {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);

  const handleStarHover = (starValue) => {
    if (stars === 0) {
      setStars(starValue);
    }
  };

  const handleStarClick = (starValue) => {
    setStars(starValue);
  };
  useEffect(() => {
    // fetch review data when component mounts
    const fetchReviewData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/reviews/${reviewId}`);
        setReview(data.review);
        setStars(data.stars);
        console.log("here is the data!!!!", data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviewData();
  }, [reviewId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = { review: review, stars: stars };

    try {
      await axios.put(`${API_URL}/api/reviews/${reviewId}`, reviewData);
      onClose();
      fetchCurrentUserDate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="center-box direction-column edit-form"
      onSubmit={handleSubmit}
    >
      <button className="close-btn" onClick={onClose}>
        X
      </button>
      <label>
        Stars:
        <div
          className="star-rating"
          onMouseLeave={() => {
            if (stars === 0) {
              setStars(0);
            }
          }}
        >
          {[1, 2, 3, 4, 5].map((starValue) => (
            <span
              key={starValue}
              className={`star ${starValue <= stars ? "filled" : "empty"}`}
              onMouseEnter={() => handleStarHover(starValue)}
              onClick={() => handleStarClick(starValue)}
            >
              {starValue <= stars ? "★" : "☆"}
            </span>
          ))}
        </div>
      </label>
      <label>
        Review:
        <textarea
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave your review here"
        />
      </label>
      <button type="submit" className="add-new-pet-btn">
        Save changes
      </button>
    </form>
  );
}

export default EditReview;
