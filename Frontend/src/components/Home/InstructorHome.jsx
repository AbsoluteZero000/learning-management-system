import { useState } from "react";
import CreateCourse from "../Functions/Instructor/CreateCourse";
import StudentEnrollments from "../Functions/Instructor/StudentEnrollments";
import SearchCourse from "../Functions/Instructor/SearchCourse";

function Instructor() {
  const [currFunction, setCurrFunction] = useState(null);
  const functions = {
    createCourse: <CreateCourse />,
    studentEnrollments: <StudentEnrollments />,
    viewCourse: <SearchCourse />,
  };

  const showCreateCourse = () => {
    setCurrFunction("createCourse");
  };

  const showStudentEnrollments = () => {
    setCurrFunction("studentEnrollments");
  };

  const showViewCourse = () => {
    setCurrFunction("viewCourse");
  };

  return (
    <div>
      <h2>Instructor</h2>
      <div>
        <button onClick={showCreateCourse}>Create Course</button>
        <button onClick={showStudentEnrollments}>Student Enrollments</button>
        <button onClick={showViewCourse}>View Course</button>
      </div>
      {currFunction && functions[currFunction]}
    </div>
  );
}

export default Instructor;
