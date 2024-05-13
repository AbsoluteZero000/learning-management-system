import { useState, useEffect } from "react";
import axios from "axios";

function ReviewCourse() {
  const [pendingCourses, setPendingCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8080/server/api/course/pending"
      );
      setPendingCourses(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async (id, action) => {
    try {
      setLoading(true);
      await axios.put(
        `http://localhost:8080/server/api/course/update/${id}/${action}`
      );
      alert("Status updated successfully!");
      fetchData();
    } catch (error) {
      console.error("Error updating course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Pending Courses</h2>
      {loading ? (
        <p>Loading...</p>
      ) : pendingCourses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
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
            {pendingCourses.map((course) => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>{course.category}</td>
                <td>{course.content}</td>
                <td>{course.duration}</td>
                <td>{course.capacity}</td>
                <td>{course.instructorid}</td>
                <td>
                  <button onClick={() => handleUpdate(course.id, 1)}>
                    Accept
                  </button>
                  <button onClick={() => handleUpdate(course.id, 0)}>
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

export default ReviewCourse;
