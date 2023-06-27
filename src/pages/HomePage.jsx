import React from "react";
import dogImg from "../assets/dog.jpg";
import { Link } from "react-router-dom";

function homepage() {
  return (
    <div>
      <div className="header">
      <div className="header-left">
        <h2>Connecting Caring Pet Sitters with Fur-ever Friends!</h2>
        <div className="buttons-container">
          <Link to="/login"><button className="button">Login</button></Link>
          <Link to="/signup"><button className="button">Signup</button></Link>
        </div></div>
        <img src={dogImg} alt="dog"/>
      </div>
    </div>
  );
}

export default homepage;
