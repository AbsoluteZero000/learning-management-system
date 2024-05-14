import { useState, useEffect } from "react";
import { coursesMicroservice } from "../../../routes/axiosinstances";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await coursesMicroservice.get(
          `course/notification/${userId}`
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notification;
