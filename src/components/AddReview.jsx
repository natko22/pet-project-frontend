import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function AddReview({ onClose, setAddReviews }) {
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user } = useContext(AuthContext);
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleStarHover = (starValue) => {
    if (stars === 0) {
      setStars(starValue);
    }
  };

  const handleStarClick = (starValue) => {
    setStars(starValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review || !stars) {
      setError("Please fill in all required fields.");
      return;
    }

    const newReview = {
      commenter: user._id,
      review,
      stars,
      owner: userId,
    };

    try {
      const response = await axios.post(
        "http://localhost:5005/api/add-review/",
        newReview
      );
      navigate(`/profile/${user._id}`);
      setReview("");
      setStars(0);
      setError(null);
      setSuccess(true);
      setAddReviews(response);
      onClose(); // Fetch updated currentUserData
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="add-review">
      <button className="close-btn" onClick={onClose}>
        X
      </button>
        <label>
          Review:
          <textarea
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Leave your review here"
          />
        </label>
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

        <button type="submit" className="add-review-btn">
          Add Review
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Review added successfully!</p>}
    </div>
  );
}

export default AddReview;
