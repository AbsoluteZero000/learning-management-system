import React, { useState, useEffect } from "react";
import { coursesMicroservice } from "../../../routes/axiosinstances";

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDeleteCourse = async (courseId) => {
    try {
      setLoading(true);
      await coursesMicroservice.delete(`course/delete/${courseId}`);
      setCourses(courses.filter((course) => course.id !== courseId));
      alert("Course deleted successfully!");
    } catch (error) {
      alert("Error deleting course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Manage Course</h2>
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
                  <button onClick={() => handleDeleteCourse(course.id)}>
                    Delete
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

export default CourseManagement;
