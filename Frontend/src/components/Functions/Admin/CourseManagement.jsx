import React, { useState, useEffect } from "react";
import { coursesMicroservice } from "../../../routes/axiosinstances";

function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editFormData, setEditFormData] = useState({
    description: "",
    content: "",
  });

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

  const handleEditCourse = (course) => {
    setEditingCourse(course.id);
    setEditFormData({
      description: course.description,
      content: course.content,
    });
  };

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await coursesMicroservice.put(
        `course/edit/${editingCourse}`,
        editFormData
      );
      setCourses(
        courses.map((course) =>
          course.id === editingCourse ? { ...course, ...editFormData } : course
        )
      );
      setEditingCourse(null);
      alert("Course edited successfully!");
    } catch (error) {
      alert("Error editing course:", error);
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
        <>
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
                    <button onClick={() => handleEditCourse(course)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteCourse(course.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editingCourse && (
            <div>
              <h3>Edit Course</h3>
              <form onSubmit={handleEditFormSubmit}>
                <label>
                  Description:
                  <input
                    type="text"
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditFormChange}
                  />
                </label>
                <br />
                <label>
                  Content:
                  <input
                    type="text"
                    name="content"
                    value={editFormData.content}
                    onChange={handleEditFormChange}
                  />
                </label>
                <br />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingCourse(null)}>
                  Cancel
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CourseManagement;
