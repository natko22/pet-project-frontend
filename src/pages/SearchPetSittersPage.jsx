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
      const response = await axios.get("http://localhost:5005/api/sitters");
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
    <div>
      <h2>Sitters</h2>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search Pet Sitters ..."
      />

      {filteredSitters.length === 0 ? (
        <p>No matching sitters found.</p>
      ) : (
        filteredSitters.map((sitter) => (
          <Link
            to={`/profile/${sitter._id}`}
            key={sitter._id}
            className="link-to-sitter-profile"
          >
            <div className="sitter-card">
              <img
                src={sitter.img}
                alt={sitter.name}
                className="sitter-card-img"
              />

              <h3>{sitter.username}</h3>
              <p>{sitter.email}</p>
              <p>{sitter.isPetOwner}</p>
              <p>{sitter.postalCode}</p>
              <p>{sitter.description}</p>
              <p>{sitter.reviews}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
export default SearchSittersPage;
