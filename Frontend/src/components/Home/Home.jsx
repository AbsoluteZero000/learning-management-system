import { useAuth } from "../../contexts/AuthProvider";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const auth = useAuth();
  const [fact, setFact] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://catfact.ninja/fact");
        setFact(response.data.fact);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    auth.logOut();
  };

  return (
    <div>
      <h1>Welcome, {auth.user}!</h1>
      <div>{loading ? <p>Loading...</p> : <p>{fact}</p>}</div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default Home;
