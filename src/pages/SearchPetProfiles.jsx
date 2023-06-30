import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchPetProfiles = () => {
  const [petProfiles, setPetProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPetProfiles();
  }, []);

  const fetchPetProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/pets/");

      setPetProfiles(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pet profiles:", error);
    }
  };

  const filteredPetProfiles = petProfiles.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (loading) {
    return <div>Loading pet profiles...</div>;
  }

  return (
    <div>
      <h2>Pet Profiles</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search pet profiles..."
      />

      {loading ? (
        <div>Loading pet profiles...</div>
      ) : (
        <>
          {filteredPetProfiles.length > 0}

          {filteredPetProfiles.map((pet) => (
            <div key={pet._id} className="card">
              <img src={pet.img} alt={pet.name} className="card-img" />
              <div className="card-content">
                <h3>{pet.name}</h3>
                <p>Race: {pet.race}</p>
                <p>Age: {pet.age}</p>
                <p>Gender: {pet.gender}</p>
                <p>Castrated: {pet.castrated}</p>
                <p>Medical Condition: {pet.medicalCondition}</p>
                <p>Diet: {pet.diet}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SearchPetProfiles;
