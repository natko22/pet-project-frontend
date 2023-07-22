import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import imgPlaceholder from "../assets/placeholder.png";
import { API_URL } from "../config/config.index";

function EachBooking({ ownerId, startDate, endDate }) {
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/users/${ownerId}`);
        console.log("fetched data", data);
        setOwner(data);
      } catch (err) {
        console.log("fetch user data error", err);
      }
    };
    fetchOwnerData();
  }, [ownerId]);

  if (!owner) {
    return "loading";
  }
  return (
    <div className="each-pet-box">
      <img
        className="pet-img"
        src={!owner.img ? imgPlaceholder : owner.img}
        alt={owner.username}
      />
      <h3>{owner.username}</h3>

      <p>
        <span className="doggie-font"> Start Date : </span>
        <span className="poppins">
          {new Date(startDate).toLocaleDateString("de-DE")}
        </span>
      </p>
      <p>
        <span className="doggie-font"> End Date : </span>
        <span className="poppins">
          {new Date(endDate).toLocaleDateString("de-DE")}
        </span>
      </p>
    </div>
  );
}

export default EachBooking;
