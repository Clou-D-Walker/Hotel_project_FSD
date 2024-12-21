import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css"; // Assuming you have some styling

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext); // Dispatch to update Auth state
  const navigate = useNavigate(); // Hook to navigate after logout

  const handleLogout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });

    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link
          to="/"
          style={{
            color: "inherit",
            textDecoration: "none",
            fontSize: "1.367em",
          }}
        >
          <span className="logo">StayHaven</span>
        </Link>
        {user ? (
          <div className="navItems">
            <span>{user.username}</span>
            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <Link to="http://localhost:8800/api/auth/register">
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
