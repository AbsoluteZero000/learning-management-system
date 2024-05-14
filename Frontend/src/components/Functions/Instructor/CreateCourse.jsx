import { useState } from "react";
import { coursesMicroservice } from "../../../routes/axiosinstances";

function CreateCourse() {
  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    duration: "",
    category: "",
    content: "",
    rating: "0",
    capacity: "",
    instructorid: JSON.parse(localStorage.getItem("user")).id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await coursesMicroservice.post("course/addcourse", courseData);
      alert("Course created successfully!");
    } catch (error) {
      alert("Network Error.");
    }
  };

  return (
    <div>
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Name:</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Description:</label>
          <textarea name="description" onChange={handleChange} required />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Duration (in weeks):</label>
          <input
            type="number"
            name="duration"
            min="1"
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Category:</label>
          <input type="text" name="category" onChange={handleChange} required />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Content:</label>
          <textarea name="content" onChange={handleChange} required />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Capacity:</label>
          <input
            type="number"
            name="capacity"
            min="1"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateCourse;
