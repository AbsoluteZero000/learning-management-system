import { useEffect, useState } from "react";
import axios from "axios";
import CourseTable from "./CourseTable";

function SearchCourse() {
  const [criteria, setCriteria] = useState("name");
  const [value, setValue] = useState("");
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    if (!value.trim()) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/server/api/course/search/${criteria}/${value}`
      );
      setCourses(response.data);
    } catch (error) {
      alert("Network Error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [criteria, value]);

  return (
    <div>
      <h2>View Course</h2>
      <div>
        <label htmlFor="criteria">Search Criteria:</label>
        <select
          id="criteria"
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="category">Category</option>
        </select>
      </div>
      <div>
        <label htmlFor="value">Search Value:</label>
        <input
          type="text"
          id="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : courses ? (
        <CourseTable courses={courses} />
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
}

export default SearchCourse;
