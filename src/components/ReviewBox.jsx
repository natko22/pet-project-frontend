import React from "react";
import Review from "./Review";
import { Link } from "react-router-dom";
import AddReview from "./AddReview";
import { useState } from "react";
import { useEffect } from "react";

function ReviewBox({ reviews,setAddReviews}) {
  console.log(reviews);
  const [showAddReview, setShowAddReview] = useState(false);

  const handleAddReviewClick = () => {
    setShowAddReview(true);
  };

  const handleAddReviewClose = () => {
    setShowAddReview(false);
  };

  return (
    <>
      <h2 className="review-box-h2">Reviews</h2>
      <div className="review-box">
        <div className="all-reviews">
          {reviews.map((review) => (
            <Review
              key={review._id}
              commenter={review.commenter}
              review={review.review}
              stars={review.stars}
            />
          ))}
        </div>
        {!showAddReview && (
          <button onClick={handleAddReviewClick}>+ leave a review</button>
        )}
        {showAddReview && <AddReview onClose={handleAddReviewClose} setAddReviews={setAddReviews}/>}
      </div>
    </>
  );
}

export default ReviewBox;
