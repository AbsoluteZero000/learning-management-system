import React, { useState, useEffect } from "react";
import { coursesMicroservice } from "../../../routes/axiosinstances";

function MakeEnrollment() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await coursesMicroservice.get("course/sorted");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const enrollCourse = async (courseId) => {
    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }

    try {
      await coursesMicroservice.post(`course/enroll/${courseId}/${userId}`);
      alert("Enrollement submitted!");
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };

  return (
    <div>
      <h2>Enroll</h2>
      {loading ? (
        <p>Loading...</p>
      ) : courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Content</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>{course.category}</td>
                <td>{course.content}</td>
                <td>{course.duration} week(s)</td>
                <td>
                  <button onClick={() => enrollCourse(course.id)}>
                    Enroll
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

export default MakeEnrollment;
