import React, { useState, useEffect } from "react";
import { usersMicroservice } from "../../../routes/axiosinstances";

function Statistics() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await usersMicroservice.get("admin/stats");
        if (response.status === 200) {
          setStats(response.data);
        } else {
          setError("Failed to fetch stats. Server returned an error.");
        }
      } catch (error) {
        setError("Failed to fetch stats. Please try again later.");
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2>Statistics</h2>
      {stats ? (
        <div>
          <p>Number of Courses: {stats.number_of_courses}</p>
          <p>Number of Enrollments: {stats.number_of_enrollments}</p>
          <p>Number of Reviews: {stats.number_of_reviews}</p>
          <p>Total Instructors: {stats.total_instructors}</p>
          <p>Total Students: {stats.total_students}</p>
          <p>Total Users: {stats.total_users}</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Loading stats...</p>
      )}
    </div>
  );
}

export default Statistics;
