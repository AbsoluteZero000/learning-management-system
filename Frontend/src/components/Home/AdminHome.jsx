import { useState } from "react";
import CourseManagement from "../Functions/Admin/CourseManagement";
import ReviewCourse from "../Functions/Admin/ReviewCourse";
import UserManagement from "../Functions/Admin/UserManagement";
import Statistics from "../Functions/Admin/Statistics";

function Admin() {
  const [currFunction, setCurrFunction] = useState(null);
  const functions = {
    courseManagement: <CourseManagement />,
    pendingCourse: <ReviewCourse />,
    statistics: <Statistics />,
    userManagement: <UserManagement />,
  };

  const showReviewCourse = () => {
    setCurrFunction("pendingCourse");
  };

  const showCourseManagement = () => {
    setCurrFunction("courseManagement");
  };

  const showTrackStats = () => {
    setCurrFunction("statistics");
  };

  const showUserManagement = () => {
    setCurrFunction("userManagement");
  };

  return (
    <div>
      <h2>Admin</h2>
      <div>
        <button onClick={showCourseManagement}>Manage Courses</button>
        <button onClick={showReviewCourse}>Pending Courses</button>
        <button onClick={showTrackStats}>Statistics</button>
        <button onClick={showUserManagement}>User Management</button>
      </div>
      {currFunction && functions[currFunction]}
    </div>
  );
}

export default Admin;
