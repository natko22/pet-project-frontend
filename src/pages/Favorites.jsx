import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import imgPlaceholder from "../assets/placeholder.png";
import { AuthContext } from "../context/auth.context";
import { API_URL } from "../config/config.index";
import remove from "../assets/remove.png";

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

  const handleRemoveFromFavorites = async (userIdToRemove) => {
    try {
      console.log(user._id);
      await axios.put(`${API_URL}/api/favorites/${userIdToRemove}`, {
        userIdToRemove: user._id,
      });
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav._id !== userIdToRemove)
      );
    } catch (err) {
      console.log("remove from favorites error", err);
    }
  };

  return (
    <div className="fav-page">
      <h1>My Favorites</h1>
      <div className="favorite-box">
        {favorites.length === 0 ? (
          <div className="favorites-message">
            <p>
              Oops! It looks like your favorite button got shy and hide all your
              favorites.
              <p>
                {" "}
                Don't worry, you can charm it back by clicking some hearts on
                cool profiles!
              </p>
            </p>
          </div>
        ) : (
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
                <button
                  className="delete-dates"
                  onClick={() => handleRemoveFromFavorites(favorite._id)}
                >
                  <img src={remove} alt="delete" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
