import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="nav">
      <input
        type="checkbox"
        id="nav-check"
        checked={isMobileMenuOpen}
        onChange={handleMobileMenuToggle}
      />
      <div className="nav-header">
        <Link to="/">
          <div className="nav-title">Petopia</div>
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
          <Link to={`/profile/${user._id}`} onClick={handleMobileMenuLinkClick}>
            Profile
          </Link>
          <Link to={"/favorites"} onClick={handleMobileMenuLinkClick}>
            Favorites
          </Link>
          <Link to={"pet-profiles"} onClick={handleMobileMenuLinkClick}>
            Search Pets
          </Link>
          <Link to={"sitters-profiles"} onClick={handleMobileMenuLinkClick}>
            Search Pet Sitters
          </Link>
          <Link to="/" onClick={logOutUser}>
            Logout
          </Link>
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/login" onClick={handleMobileMenuLinkClick}>
            Login{" "}
          </Link>
          <Link to="/signup" onClick={handleMobileMenuLinkClick}>
            Singup
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
