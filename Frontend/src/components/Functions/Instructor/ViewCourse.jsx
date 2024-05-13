import { useEffect, useState } from "react";
import axios from "axios";

function ViewCourse() {
  const [courses, setCourses] = useState("");

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/server/api/course/pending"
        );
        console.log(JSON.stringify(response));
        setCourses(JSON.stringify(response));
      } catch (error) {
        alert("Network Error.");
      }
    };

    getCourses();
  }, []);

  return (
    <div>
      <h2>View Course</h2>
      {courses ? <p>{courses}</p> : <p>Loading...</p>}
    </div>
  );
}

export default ViewCourse;
