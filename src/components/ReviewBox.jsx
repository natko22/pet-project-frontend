import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Review from "./Review";
import { useParams } from "react-router-dom";
import AddReview from "./AddReview";
import  { useState, useEffect } from "react";

function ReviewBox({ reviews, setAddReviews, fetchCurrentUserDate }) {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);

  const [showAddReview, setShowAddReview] = useState(false);

  const handleAddReviewClick = () => {
    setShowAddReview(true);
  };

  const handleAddReviewClose = () => {
    setShowAddReview(false);
  };

  return (
    <>
      <div className="review-box">
        <h2 className="review-box-h2">Reviews</h2>
        <div className="all-reviews">
          {reviews.map((review) => (
            <Review
              key={review._id}
              reviewId={review._id}
              commenter={review.commenter}
              review={review.review}
              stars={review.stars}
              fetchCurrentUserDate={fetchCurrentUserDate}
            />
          ))}
        </div>
        {!showAddReview && userId !== user._id && (
          <button className="review-btn" onClick={handleAddReviewClick}>
            Leave a review
          </button>
        )}
        {showAddReview && (
          <AddReview
            onClose={handleAddReviewClose}
            setAddReviews={setAddReviews}
          />
        )}
      </div>
    </>
  );
}

export default ReviewBox;
