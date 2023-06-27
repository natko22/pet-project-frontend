import React from "react";
import dogImg from "../assets/dog.jpg";

function homepage() {
  return (
    <div>
      <div className="header">
      <div className="header-left">
        <h2>Connecting Caring Pet Sitters with Fur-ever Friends!</h2>
        <div className="buttons-container">
          <button className="button">Login</button>
          <button className="button">Signup</button>
        </div></div>
        <img src={dogImg} alt="dog"/>
      </div>
    </div>
  );
}

export default homepage;
