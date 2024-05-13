import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InstructorSignup from "./InstructorSignup";
import StudentSignup from "./StudentSignup";
import axios from "axios";

export default function Signup() {
  const [signup, setSignup] = useState("student");
  const navigate = useNavigate();

  const handleUserTypeChange = (event) => {
    setSignup(event.target.value);
  };

  const handleSignup = async (formData) => {
    try {
      const res = await axios.post("/signup", formData);
      if (res.data[1] === 400) {
        alert(res.data[0].message);
        return;
      } else if (res.data[1] === 201) {
        alert(res.data[0].message);
        navigate("/");
      }
    } catch (error) {
      alert("Network Error.");
    }
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
      {signup === "student" ? (
        <StudentSignup onSubmit={handleSignup} />
      ) : (
        <InstructorSignup onSubmit={handleSignup} />
      )}
    </div>
  );
}
