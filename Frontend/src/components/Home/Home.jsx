import { useAuth } from "../../contexts/AuthProvider";

function Home() {
  const auth = useAuth();
  
  const handleLogout = () => {
    auth.logOut();
  };

  return (
    <div>
      <h1>Homepage</h1>
      <label>Username is: {auth.user}</label><br></br>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default Home;
