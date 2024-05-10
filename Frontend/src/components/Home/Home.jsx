import { useAuth } from "../../contexts/AuthProvider";

function Home() {
  return (
    <div>
      <h1>Homepage</h1>
      <label>Username is: {useAuth().user}</label>
    </div>
  );
}

export default Home;
