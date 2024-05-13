import { useState, useEffect } from "react";
import axios from "axios";

function ViewEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem("user")).id;

  const fetchEnrollments = async () => {
    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/server/api/course/enroll/all/${userId}`
      );
      setEnrollments(response.data);
      console.log("Enrollments:", response.data); // Log fetched data
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cancelEnrollment = async (enrollmentId) => {
    try {
      await axios.delete(
        `http://localhost:8080/server/api/course/enroll/delete/${enrollmentId}`
      );
      alert("Enrollment canceled successfully!");
      // Refetch enrollments after cancellation
      fetchEnrollments();
    } catch (error) {
      console.error("Error canceling enrollment:", error);
    }
  };

  return (
    <div>
      <h2>View Enrollments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : enrollments.length === 0 ? (
        <p>No enrollments found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Content</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment.id}>
                <td>{enrollment.name}</td>
                <td>{enrollment.description}</td>
                <td>{enrollment.category}</td>
                <td>{enrollment.content}</td>
                <td>{enrollment.duration}</td>
                <td>{enrollment.status}</td>
                <td>
                  <button onClick={() => cancelEnrollment(enrollment.id)}>
                    Cancel Enrollment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewEnrollments;
