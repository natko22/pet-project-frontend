import React from "react";
import githubIcon from "../assets/github.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="main-container">
      <div className="footer-basic">
        <footer>
          <ul className="list-inline">
            <li className="list-inline-item">
              <Link to="/">Home</Link>
            </li>

            <li className="list-inline-item">
              <Link to="/about" target="_top">
                About Us
              </Link>
            </li>
          </ul>
          <div className="social">
            <Link
              to="https://github.com/natko22/pet-project-frontend"
              target="_blank"
            >
              <img className="icon" alt="github" src={githubIcon} />
            </Link>
          </div>
          <p className="copyright">Petopia © 2023</p>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
