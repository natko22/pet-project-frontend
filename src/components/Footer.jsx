import React from "react";
import githubIcon from "../assets/github.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    
    <div className="footer-basic">
    <footer>
      <ul className="list-inline">
        <li className="list-inline-item">
          <Link to="/">Home</Link>
        </li>
        <li className="list-inline-item">
          <Link to="/services">Services</Link>
        </li>
        <li className="list-inline-item">
          <Link to="/about">About</Link>
        </li>
        <li className="list-inline-item">
          <Link to="/terms">Terms</Link>
        </li>
        <li className="list-inline-item">
          <Link to="/privacy-policy">Privacy Policy</Link>
        </li>
      </ul>
      <div className="social">
        <Link to="#">
          <img className="icon" alt="github" src={githubIcon} />
        </Link>
      </div>
      <p className="copyright">Name © 2023</p>
    </footer>
  </div>
    
  );
}

export default Footer;
