import React from "react";
import Review from "./Review";

function ReviewBox({ reviews }) {
  console.log(reviews);

  return (
    <>
      <h2 className="review-box-h2">Reviews</h2>
      <div className="review-box">
        {reviews.map((review) => (
          <Review
            key={review._id}
            commenter={review.commenter}
            review={review.review}
            stars={review.stars}
          />
        ))}
      </div>
    </>
  );
}

export default ReviewBox;
