import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <Link to="/">
          <div className="nav-title">Pet-Project</div>
        </Link>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      {console.log("logedin check", isLoggedIn)}
      {isLoggedIn ? (
        <div className="nav-links">
          <Link to="/" onClick={logOutUser}>
            Logout
          </Link>
          <Link to={`/profile/${user._id}`}>Profile</Link>
          <Link to={"pet-profiles"}>Search Pets</Link>
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Singup</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
