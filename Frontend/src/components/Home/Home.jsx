import { useAuth } from "../../contexts/AuthProvider";
import Admin from "./AdminHome";
import Student from "./StudentHome";
import Instructor from "./InstructorHome";

function Home() {
  const auth = useAuth();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const role = currentUser.role;
  const roleOptions = {
    admin: <Admin />,
    student: <Student />,
    instructor: <Instructor />,
  };

  const handleLogout = () => {
    auth.logOut();
  };

  return (
    <div>
      <h1>Welcome, {currentUser.name}!</h1>
      <button onClick={handleLogout}>Log out</button>
      {role && roleOptions[role]}
    </div>
  );
}

export default Home;
