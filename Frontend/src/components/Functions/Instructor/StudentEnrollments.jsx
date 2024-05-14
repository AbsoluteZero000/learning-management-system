import React, { useState, useEffect } from "react";
import { coursesMicroservice } from "../../../routes/axiosinstances";

function StudentEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const instructorId = JSON.parse(localStorage.getItem("user")).id; // Replace 'your_instructor_id' with the actual instructor ID

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await coursesMicroservice.get(
        `course/enroll/instructor/pending/${instructorId}`
      );
      setEnrollments(response.data);
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

  const handleAction = async (cid, sid, status) => {
    try {
      setLoading(true);
      await coursesMicroservice.put(`course/enroll/${cid}/${sid}/${status}`);
      alert(status === 1 ? "Enrollment accepted!" : "Enrollment rejected!");
      fetchEnrollments();
    } catch (error) {
      console.error("Error updating enrollment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Student Enrollments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : enrollments.length === 0 ? (
        <p>No enrollments found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Course ID</th>
              <th>Student ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment.id}>
                <td>{enrollment.cid}</td>
                <td>{enrollment.sid}</td>
                <td>{enrollment.status}</td>
                <td>
                  <button
                    onClick={() =>
                      handleAction(enrollment.cid, enrollment.sid, 1)
                    }
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      handleAction(enrollment.cid, enrollment.sid, 0)
                    }
                  >
                    Reject
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

export default StudentEnrollments;
