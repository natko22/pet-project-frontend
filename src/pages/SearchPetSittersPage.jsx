import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config/config.index";

function SearchSittersPage() {
  const [sitters, setSitters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [postalCodeQuery, setPostalCodeQuery] = useState("");

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
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setPostalCodeQuery(value);
  };

  const filteredSitters = sitters.filter((sitter) => {
    const sitterName = sitter.username && sitter.username.toLowerCase();
    const sitterPostalCode =
      sitter.postalCode && sitter.postalCode.toString().toLowerCase();
    const searchQueryLower = searchQuery.toLowerCase();
    const postalCodeQueryLower = postalCodeQuery.toLowerCase();

    return (
      (sitterName && sitterName.includes(searchQueryLower)) ||
      (sitterPostalCode && sitterPostalCode.includes(postalCodeQueryLower)) ||
      (postalCodeQueryLower &&
        sitterPostalCode &&
        sitterPostalCode.startsWith(postalCodeQueryLower))
    );
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="search-container">
      <h2 className="search-sitters-heading">Search Pet Sitters</h2>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search Pet Sitters by Username or Postal Code..."
        className="search-input"
      />

      {filteredSitters.length === 0 ? (
        <p>No matching sitters found.</p>
      ) : (
        <div className="pet-profiles-container">
          {filteredSitters.map((sitter) => (
            <div className="card">
              <Link
                to={`/profile/${sitter._id}`}
                key={sitter._id}
                className="sitter-card-link"
              >
                <img
                  src={sitter.img}
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
                  <p className="sitter-card-info">
                    <span className="doggie-font">Reviews : </span>
                    <span className="poppins"> {sitter.reviews.length}</span>
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchSittersPage;
