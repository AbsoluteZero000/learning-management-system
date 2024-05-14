import React, { useState, useEffect } from "react";
import axios from "axios";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    const loggedInUserId = JSON.parse(localStorage.getItem("user")).id;

    if (userId === loggedInUserId) {
      alert("You cannot delete yourself.");
      return;
    }

    try {
      await axios.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleShowEmailInput = (userId) => {
    setSelectedUserId(userId);
    setShowEmailInput(true);
  };

  const handleChangeEmail = async () => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:5000/users/${selectedUserId}`,
        {
          email: newEmail,
        }
      );
      if (res.data[1] === 200) {
        fetchUsers();
        setShowEmailInput(false);
        setNewEmail("");
        setSelectedUserId(null);
      } else {
        alert(res.data[0].message);
      }
    } catch (error) {
      alert("Error changing email:", error);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      {loading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                  <button onClick={() => handleShowEmailInput(user.id)}>
                    Change Email
                  </button>
                  {showEmailInput && selectedUserId === user.id && (
                    <div>
                      <input
                        type="text"
                        placeholder="New Email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                      />
                      <button onClick={handleChangeEmail}>Submit</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default UserManagement;
