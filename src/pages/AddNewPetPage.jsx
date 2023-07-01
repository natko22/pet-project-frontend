import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function AddPet() {
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [castrated, setCastrated] = useState(false);
  const [medicalCondition, setMedicalCondition] = useState("");
  const [diet, setDiet] = useState("");
  const [instruction, setInstruction] = useState("");
  const [img, setImg] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { petId, userId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !race || !age || !gender || !type) {
      setError("Please fill in all required fields.");
      return;
    }

    const newPet = {
      name,
      race,
      age,
      gender,
      type,
      castrated,
      medicalCondition,
      diet,
      instruction,
      img,
    };

    try {
      const response = await axios.post(
        "http://localhost:5005/api/add-pet/",
        newPet
      );
      console.log(response.data);
      // navigate(`/profile/${userId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Link to={`/petProfile/${petId}`}>Back to Pet Profile</Link>

      <h1>Add a New Pet</h1>
      <form onSubmit={handleSubmit} className="add-new-pet">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a cute name"
          />
        </label>
        <label>
          Race:
          <input
            type="text"
            value={race}
            onChange={(e) => setRace(e.target.value)}
            placeholder="E.g., Mixed,Pomeranian, Siamese"
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="In months or years"
          />
        </label>
        <label>
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>
          Type of Animal:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select Type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Snake">Snake</option>
            <option value="Hamster">Hamster</option>
            <option value="Bird">Bird</option>
          </select>
        </label>

        <label>
          Castrated:
          <input
            className="add-new-pet-checkbox"
            type="checkbox"
            checked={castrated}
            onChange={(e) => setCastrated(e.target.checked)}
          />
        </label>
        <label>
          Medical Condition:
          <input
            type="text"
            value={medicalCondition}
            onChange={(e) => setMedicalCondition(e.target.value)}
            placeholder="E.g., Playful and healthy"
          />
        </label>
        <label>
          Diet:
          <input
            type="text"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            placeholder="E.g., Premium dog food"
          />
        </label>
        <label>
          Instruction:
          <input
            type="text"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="E.g., Walk twice a day"
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            placeholder="E.g., https://example.com/pet-image.jpg"
          />
        </label>
        <button type="submit" className="add-new-pet-btn">
          Add Pet
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Pet added successfully!</p>}
    </div>
  );
}

export default AddPet;
