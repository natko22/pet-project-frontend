import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function AllFavorites() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5005/api/favorites/${user._id}`
        );
        console.log("fetched favorites", data);
        setFavorites(data);
      } catch (err) {
        console.log("fetch favorites error", err);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div>
      <h1>My Favorites</h1>
      {/* {favorites.map((favorite) => (
        <div key={favorite._id}>
          <Link to={`/profile/${favorite._id}`}>
            <img
              className="profileImg"
              src={!favorite.img ? imgPlaceholder : favorite.img}
              alt={favorite.username}
            />
            <h2>{favorite.username}</h2>
          </Link>
        </div>
      ))} */}
    </div>
  );
}
