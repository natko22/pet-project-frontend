import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import imgPlaceholder from "../assets/placeholder.png";
import { AuthContext } from "../context/auth.context";
import { API_URL } from "../config/config.index";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/favorites/${user._id}`
        );
        console.log("fetched favorites", data);
        setFavorites(data);
      } catch (err) {
        console.log("fetch favorites error", err);
      }
    };
    fetchFavorites();
  }, [user]);

  return (
    <div className="fav-page">
      <h1>My Favorites</h1>
      <div className="favorite-box">
        <div className="all-favorites">
          {favorites.map((favorite) => (
            <div className="each-favorite-box" key={favorite._id}>
              <Link className="favorite-link" to={`/profile/${favorite._id}`}>
                <img
                  className="profileImg"
                  src={!favorite.img ? imgPlaceholder : favorite.img}
                  alt={favorite.username}
                />
                <h2>{favorite.username}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
