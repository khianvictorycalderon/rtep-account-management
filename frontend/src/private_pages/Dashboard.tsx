import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BUILT_IN_API_URLS } from "../constants";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.delete(BUILT_IN_API_URLS.logout, {
        withCredentials: true,
      });

      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div>
      Dashboard Page

      <button onClick={handleLogout}>
        Logout (debug)
      </button>
    </div>
  );
}