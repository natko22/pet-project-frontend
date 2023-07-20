import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config/config.index";
import placeholder from "../assets/pawprint.png"

const SearchPetProfiles = () => {
  const [petProfiles, setPetProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPetProfiles();
  }, []);

  const fetchPetProfiles = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/pet-profiles/`, {
        populate: "user",
        select:
          "name race age gender castrated medicalCondition diet user.postalCode",
      });
      setPetProfiles(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pet profiles:", error);
    }
  };

  const filteredPetProfiles = petProfiles.filter((pet) => {
    const petName = pet.name && pet.name.toLowerCase();
    const userPostalCode = pet.user && pet.user.postalCode;

    return (
      (!searchQuery ||
        (petName && petName.includes(searchQuery.toLowerCase())) ||
        (userPostalCode && userPostalCode.toString().includes(searchQuery))) &&
      (!animalType || pet.type.toLowerCase() === animalType.toLowerCase())
    );
  });

  if (loading) {
    return <div>Loading pet profiles...</div>;
  }

  return (
    <div className="search-container">
      <h2 className="search-pet-header">Search Pet Profiles</h2>
      <input
        className="search-pet-input"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search pet profiles..."
      />

      <select
        className="animal-type-select"
        value={animalType}
        onChange={(e) => setAnimalType(e.target.value)}
      >
        <option value="">All Animals</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="rabbit">Rabbit</option>
        <option value="snake">Snake</option>
        <option value="hamster">Hamster</option>
        <option value="bird">Bird</option>
      </select>

      <div className="pet-profiles-container">
        {filteredPetProfiles.length === 0 ? (
          <div>No matching pet profiles found.</div>
        ) : (
          filteredPetProfiles.map((pet) => (
            <div key={pet._id} className="card">
              <Link to={`/petProfile/${pet._id}`} className="pet-card-link">
                <img src={pet.img?pet.img:placeholder} alt={pet.name} className="pet-card-img" />
                <div className="card-content">
                  <h3>{pet.name}</h3>
                  <p>Race: {pet.race}</p>
                  <p>Age: {pet.age}</p>
                  <p>Gender: {pet.gender}</p>
                  <p>Castrated: {pet.castrated}</p>
                  <p>Medical Condition: {pet.medicalCondition}</p>
                  <p>Diet: {pet.diet}</p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPetProfiles;
