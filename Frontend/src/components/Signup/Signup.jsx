import React, { useState } from "react";
import InstructorSignup from "./InstructorSignup";
import StudentSignup from "./StudentSignup";

export default function Signup() {
  const [signup, setSignup] = useState("student");

  const handleUserTypeChange = (event) => {
    setSignup(event.target.value);
  };

  return (
    <div>
      <h1>Signup</h1>
      <label>
        <input
          type="radio"
          value="student"
          checked={signup === "student"}
          onChange={handleUserTypeChange}
        />
        Student
      </label>
      <label>
        <input
          type="radio"
          value="instructor"
          checked={signup === "instructor"}
          onChange={handleUserTypeChange}
        />
        Instructor
      </label>
      {signup === "student" ? <StudentSignup /> : <InstructorSignup />}
    </div>
  );
}
