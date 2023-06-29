import React, { useState } from "react";
import axios from "axios";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await axios.post("/api/pets", newPet);
      console.log(response.data);
      // navigate to pet profile
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Add a New Pet</h1>
      <form onSubmit={handleSubmit} className="add-new-pet">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Race:
          <input
            type="text"
            value={race}
            onChange={(e) => setRace(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
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
          />
        </label>
        <label>
          Diet:
          <input
            type="text"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
          />
        </label>
        <label>
          Instruction:
          <input
            type="text"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </label>
        <button type="submit" className="add-new-pet-btn">
          Add Pet
        </button>
      </form>
    </div>
  );
}

export default AddPet;
