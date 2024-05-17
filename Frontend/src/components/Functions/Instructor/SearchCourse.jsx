import { useEffect, useState } from "react";
import CourseTable from "./CourseTable";
import { coursesMicroservice } from "../../../routes/axiosinstances";

function SearchCourse() {
  const [criteria, setCriteria] = useState("sorted");
  const [value, setValue] = useState("");
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      let response;
      if (criteria === "sorted") {
        response = await coursesMicroservice.get("course/sorted");
      } else if (value.trim()) {
        response = await coursesMicroservice.get(
          `course/search/${criteria}/${value}`
        );
      } else {
        return;
      }
      setCourses(response.data);
    } catch (error) {
      alert("Network Error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <option value="sorted">Sorted by Rating</option>
        </select>
      </div>
      {criteria !== "sorted" && (
        <div>
          <label htmlFor="value">Search Value:</label>
          <input
            type="text"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : courses && courses.length > 0 ? (
        <CourseTable courses={courses} />
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
}

export default SearchCourse;
