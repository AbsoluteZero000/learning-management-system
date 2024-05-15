import { useState, useEffect } from "react";
import { coursesMicroservice } from "../../../routes/axiosinstances";

const Reviews = ({ courseId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsNotFound, setReviewsNotFound] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await coursesMicroservice.get(
          `course/reviews/course/${courseId}`
        );
        console.log(response.data);
        setReviews(response.data);
        if (response.data.length === 0) {
          setReviewsNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [courseId]);

  if (loading) return <div>Loading...</div>;
  if (reviewsNotFound) return <div>No reviews found for this course.</div>;

  return (
    <div>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            Rating: {review.rating} - {review.review}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
