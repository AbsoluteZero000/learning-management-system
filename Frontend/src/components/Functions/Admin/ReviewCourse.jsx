import { useState, useEffect } from "react";
import axios from "axios";

function ReviewCourse() {
  const [pendingCourses, setPendingCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/server/api/course/pending"
        );
        setPendingCourses(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (id, action) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/server/api/course/update/${id}/${action}`
      );
      alert(res);
      setPendingCourses([]);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div>
      <h2>Pending Courses</h2>
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
    </div>
  );
}

export default ReviewCourse;
