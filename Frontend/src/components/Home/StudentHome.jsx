import { useState } from "react";
import ViewEnrollments from "../Functions/Student/ViewEnrollments";
import MakeCourseReview from "../Functions/Student/MakeCourseReview";
import MakeEnrollment from "../Functions/Student/MakeEnrollment";
import SearchCourse from "../Functions/Instructor/SearchCourse";
import Notification from "../Functions/Student/Notification";

function Student() {
  const [currFunction, setCurrFunction] = useState(null);
  const functions = {
    makeCourseReview: <MakeCourseReview />,
    viewEnrollments: <ViewEnrollments />,
    viewCourse: <SearchCourse />,
    enroll: <MakeEnrollment />,
  };

  const showMakeCourseReview = () => {
    setCurrFunction("makeCourseReview");
  };

  const showEnrollments = () => {
    setCurrFunction("viewEnrollments");
  };

  const showViewCourse = () => {
    setCurrFunction("viewCourse");
  };

  const showEnroll = () => {
    setCurrFunction("enroll");
  };

  return (
    <div>
      <h2>Student</h2>
      <div>
        <button onClick={showMakeCourseReview}>Review a course</button>
        <button onClick={showEnrollments}>Show Enrollments</button>
        <button onClick={showViewCourse}>View Course</button>
        <button onClick={showEnroll}>Enroll</button>
      </div>
      {currFunction && functions[currFunction]}
      <Notification />
    </div>
  );
}

export default Student;
