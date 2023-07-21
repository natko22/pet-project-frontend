import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config/config.index";
import placeholder from "../assets/placeholder.png"

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
                  src={sitter.img?sitter.img:placeholder}
                  alt={sitter.name}
                  className="sitter-card-img"
                />
                <div className="card-content">
                  <h3 className="sitter-card-username">{sitter.username}</h3>
                  <p className="sitter-card-info">
                    Pet Owner: {sitter.isPetOwner ? "Yes" : "No"}
                  </p>
                  <p className="sitter-card-info">
                    Postal Code: {sitter.postalCode}
                  </p>
                  <p className="sitter-card-info">
                    Description: {sitter.description}
                  </p>
                  <p className="sitter-card-info">
                    Reviews: {sitter.reviews.length}
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
