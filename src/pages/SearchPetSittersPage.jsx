import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SearchSittersPage() {
  const [sitters, setSitters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sitterPostalCode, setSitterPostalCode] = useState("");

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
    const sitterPostalCode = sitter.postalCode && sitter.postalCode.toString();

    return sitterName && sitterName.includes(searchQuery.toLowerCase());
    sitterPostalCode.includes(searchQuery);
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
              <p>Pet Owner:{sitter.isPetOwner ? "Yes" : "No"}</p>
              <p>Postal Code:{sitter.postalCode}</p>
              <p>Description:{sitter.description}</p>
              <p>Reviews:{sitter.reviews.length}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
export default SearchSittersPage;
