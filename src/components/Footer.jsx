import React from "react";
import githubIcon from "../assets/github.png";

function Footer() {
  return (
    
      <div className="footer-basic">
        <footer>
          
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#">Home</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Services</a>
            </li>
            <li className="list-inline-item">
              <a href="#">About</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Terms</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
          <div className="social">
            <a href="#">
              <img className="icon" alt="github" src={githubIcon} />
            </a>
          </div>
          <p className="copyright">Name © 2023</p>
        </footer>
      </div>
    
  );
}

export default Footer;
