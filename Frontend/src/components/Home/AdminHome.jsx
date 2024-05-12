import { useState } from "react";
import CourseManagement from "../Functions/Admin/CourseManagement";
import ReviewCourse from "../Functions/Admin/ReviewCourse";
import TrackStats from "../Functions/Admin/TrackStats";
import UserManagement from "../Functions/Admin/UserManagement";

function Admin() {
  const [currFunction, setCurrFunction] = useState(null);
  const functions = {
    courseManagement: <CourseManagement />,
    reviewCourse: <ReviewCourse />,
    trackStats: <TrackStats />,
    userManagement: <UserManagement />,
  };

  const showReviewCourse = () => {
    setCurrFunction("reviewCourse");
  };

  const showCourseManagement = () => {
    setCurrFunction("courseManagement");
  };

  const showTrackStats = () => {
    setCurrFunction("trackStats");
  };

  const showUserManagement = () => {
    setCurrFunction("userManagement");
  };

  return (
    <div>
      <h2>Admin</h2>
      <div>
        <button onClick={showCourseManagement}>Manage Courses</button>
        <button onClick={showReviewCourse}>Review Courses</button>
        <button onClick={showTrackStats}>Statistics</button>
        <button onClick={showUserManagement}>User Management</button>
      </div>
      {currFunction && functions[currFunction]}
    </div>
  );
}

export default Admin;
