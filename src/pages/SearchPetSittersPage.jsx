import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SearchSittersPage() {
  const [sitters, setSitters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchSitters();
  }, []);
  const fetchSitters = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5005/api/sitters-profiles"
      );
      setSitters(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSitters = sitters.filter((sitter) => {
    const sitterName = sitter.username && sitter.username.toLowerCase();
    return sitterName && sitterName.includes(searchQuery.toLowerCase());
  });
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="search-sitters-page">
      <h2 className="search-sitters-heading">Search Pet Sitters</h2>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search Pet Sitters..."
        className="search-input"
      />

      {filteredSitters.length === 0 ? (
        <p>No matching sitters found.</p>
      ) : (
        <div className="sitter-list">
          {filteredSitters.map((sitter) => (
            <Link
              to={`/profile/${sitter._id}`}
              key={sitter._id}
              className="sitter-card-link"
            >
              <div className="sitter-card">
                <img
                  src={sitter.img}
                  alt={sitter.name}
                  className="sitter-card-img"
                />
                <div className="sitter-card-details">
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchSittersPage;
