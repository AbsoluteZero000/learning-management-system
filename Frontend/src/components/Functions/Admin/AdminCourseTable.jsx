import { useState } from "react";
import Reviews from "./Reviews"; // Assuming the Reviews component is in a separate file

const AdminCourseTable = ({ courses }) => {
  const [showReviews, setShowReviews] = useState({});

  const toggleReviews = (courseId) => {
    setShowReviews({ ...showReviews, [courseId]: !showReviews[courseId] });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Description</th>
          <th>Rating</th>
          <th>Status</th>
          <th>Reviews</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.id}>
            <td>{course.name}</td>
            <td>{course.category}</td>
            <td>{course.description}</td>
            <td>{course.rating}</td>
            <td>{course.status}</td>
            <td>
              <button onClick={() => toggleReviews(course.id)}>
                {showReviews[course.id] ? "Hide Reviews" : "Show Reviews"}
              </button>
              {showReviews[course.id] && <Reviews courseId={course.id} />}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminCourseTable;
