import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const EditPet = () => {
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
  const [loading, setLoading] = useState(true);

  const { petId } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPetProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/api/edit-pet/${petId}`
        );
        const petData = response.data;

        setName(petData.name || "");
        setRace(petData.race || "");
        setAge(petData.age || "");
        setGender(petData.gender || "");
        setType(petData.type || "");
        setCastrated(petData.castrated || false);
        setMedicalCondition(petData.medicalCondition || "");
        setDiet(petData.diet || "");
        setInstruction(petData.instruction || "");
        setImg(petData.img || "");

        setLoading(false);
      } catch (error) {
        console.error("Error fetching pet profile:", error);
        setLoading(false);
      }
    };

    fetchPetProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRaceChange = (e) => {
    setRace(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleCastratedChange = (e) => {
    setCastrated(e.target.checked);
  };

  const handleMedicalConditionChange = (e) => {
    setMedicalCondition(e.target.value);
  };

  const handleDietChange = (e) => {
    setDiet(e.target.value);
  };

  const handleInstructionChange = (e) => {
    setInstruction(e.target.value);
  };

  const handleImgChange = (e) => {
    setImg(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPetProfile = {
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
      const response = await axios.put(
        `http://localhost:5005/api/edit-pet/${petId}`,
        updatedPetProfile,
        {
          headers: {
            Authorization: `Bearer ${user.storedToken}`,
          },
        }
      );
      console.log("Pet profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating pet profile:", error);
    }
  };

  return (
    <div>
      <Link to={`/petProfile/${petId}`}>Back to Pet Profile</Link>

      <h2>Edit Pet Profile</h2>

      <form onSubmit={handleSubmit} className="edit-pet-form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
          />
        </label>

        <label>
          Race:
          <input
            type="text"
            value={race}
            onChange={handleRaceChange}
            placeholder="Race"
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={handleAgeChange}
            placeholder="Age"
          />
        </label>

        <label>
          Gender:
          <select value={gender} onChange={handleGenderChange}>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>

        <label>
          Type of Animal:
          <select value={type} onChange={handleTypeChange}>
            <option value="">Select type</option>
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
            type="checkbox"
            checked={castrated}
            onChange={handleCastratedChange}
            className="edit-form-checkbox"
          />
        </label>

        <label>
          Medical Condition:
          <input
            type="text"
            value={medicalCondition}
            onChange={handleMedicalConditionChange}
            placeholder="Medical Condition"
          />
        </label>

        <label>
          Diet:
          <input
            type="text"
            value={diet}
            onChange={handleDietChange}
            placeholder="Diet"
          />
        </label>

        <label>
          Instruction:
          <textarea
            value={instruction}
            onChange={handleInstructionChange}
            placeholder="Instructions for care"
          />
        </label>

        <label>
          Image URL:
          <input
            type="text"
            value={img}
            onChange={handleImgChange}
            placeholder="Image URL"
          />
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditPet;
