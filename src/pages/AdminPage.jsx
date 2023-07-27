import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config/config.index";
import placeholder from "../assets/placeholder.png";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [sitters, setSitters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSitters();
  }, []);

  const fetchSitters = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/sitters-profiles`);
      setSitters(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Make an API call to delete the user based on their ID
      await axios.post(`${API_URL}/auth/users/${userId}`);

      // Update the state to remove the deleted user from the sitters array
      setSitters((prevSitters) =>
        prevSitters.filter((sitter) => sitter._id !== userId)
      );
    } catch (error) {
      setError("An error occurred while deleting the user.");
    }
    navigate("/admin");
  };

  if (!sitters) {
    return <p className="center-loading">Loading pet sitters...</p>;
  }

  if (error) {
    return <p className="center-loading">Error: {error}</p>;
  }

  return (
    <div className="search-container">
      <h2 className="search-sitters-heading">Admin's Page</h2>

      {sitters.length === 0 ? (
        <p>No matching sitters found.</p>
      ) : (
        <div className="pet-profiles-container">
          {sitters.map((sitter) => {
            if (sitter._id === user._id) {
              return null;
            }

            // Render the profile for other sitters
            return (
              <div className="card card-admin" key={sitter._id}>
                <Link
                  to={`/profile/${sitter._id}`}
                  key={sitter._id}
                  className="sitter-card-link"
                >
                  <img
                    src={sitter.img ? sitter.img : placeholder}
                    alt={sitter.name}
                    className="sitter-card-img"
                  />
                  <div className="card-content">
                    <h3 className="sitter-card-username">{sitter.username}</h3>
                    <p className="sitter-card-info">
                      <span className="doggie-font">Pet Owner : </span>{" "}
                      <span className="poppins">
                        {sitter.isPetOwner ? "Yes" : "No"}
                      </span>
                    </p>
                    <p className="sitter-card-info">
                      <span className="doggie-font">Postal Code : </span>
                      <span className="poppins">{sitter.postalCode}</span>
                    </p>
                    <p className="sitter-card-info">
                      <span className="doggie-font">Description : </span>
                      <span className="poppins">{sitter.description}</span>
                    </p>
                  </div>
                  <button
                    className="admin-delete-btn"
                    onClick={() => handleDeleteUser(sitter._id)}
                  >
                    Delete User
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
