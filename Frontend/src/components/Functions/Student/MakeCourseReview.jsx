import React, { useState, useEffect } from "react";
import { coursesMicroservice } from "../../../routes/axiosinstances";

function MakeCourseReview() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [activeCourseId, setActiveCourseId] = useState(null);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const fetchEnrolledCourses = async () => {
      try {
        setLoading(true);
        const response = await coursesMicroservice.get(
          `course/get/student/${userId}`
        );
        setEnrolledCourses(response.data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const handleReview = async (courseId) => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const reviewData = {
      cid: courseId,
      sid: userId,
      rating,
      review: reviewText,
    };

    try {
      await coursesMicroservice.post(`course/review`, reviewData);
      alert("Review submitted successfully!");
      setReviewText("");
      setRating(0);
      setActiveCourseId(null);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const showReviewInput = (courseId) => {
    setActiveCourseId(courseId);
  };

  return (
    <div>
      <h2>Make Course Review</h2>
      {loading ? (
        <p>Loading...</p>
      ) : enrolledCourses.length === 0 ? (
        <p>No enrolled courses found.</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Content</th>
                <th>Duration</th>
                <th>Capacity</th>
                <th>Instructor ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enrolledCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.name}</td>
                  <td>{course.description}</td>
                  <td>{course.category}</td>
                  <td>{course.content}</td>
                  <td>{course.duration}</td>
                  <td>{course.capacity}</td>
                  <td>{course.instructorid}</td>
                  <td>
                    {course.status === "accepted" && (
                      <div>
                        {activeCourseId === course.id ? (
                          <div>
                            <input
                              type="text"
                              placeholder="Enter your review"
                              value={reviewText}
                              onChange={(e) => setReviewText(e.target.value)}
                            />
                            <input
                              type="number"
                              placeholder="Enter rating (1-5)"
                              min={1}
                              max={5}
                              value={rating}
                              onChange={(e) =>
                                setRating(Number(e.target.value))
                              }
                            />
                            <button onClick={() => handleReview(course.id)}>
                              Submit Review
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => showReviewInput(course.id)}>
                            Add Review
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MakeCourseReview;
