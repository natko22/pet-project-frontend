import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AvatarEditor from "react-avatar-editor";

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
  const [loading, setLoading] = useState(true);

  const [img, setImg] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scale, setScale] = useState(1);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { petId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/api/edit-pet/${petId}`
        );
        const petData = response.data;

        setName(petData.pet.name || "");
        setRace(petData.pet.race || "");
        setAge(petData.pet.age || "");
        setGender(petData.pet.gender || "");
        setType(petData.pet.type || "");
        setCastrated(petData.pet.castrated || false);
        setMedicalCondition(petData.pet.medicalCondition || "");
        setDiet(petData.pet.diet || "");
        setInstruction(petData.pet.instruction || "");
        setImg(petData.pet.img || "");

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

  // Handle image change
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Upload image
  const handleImgUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (img && img.type.includes("image")) {
        const formData = new FormData();
        formData.append("imageUrl", img);
        console.log(formData, "FORMDATA");

        const response = await axios.post(
          `http://localhost:5005/api/upload/${petId}`,
          formData
        );
        console.log(response);
        setUploadSuccess(true);
        setIsLoading(false);
        console.log(setUploadSuccess, "upload success");
      } else {
        throw new Error("Please select a valid image file.");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
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
      img: img ? img.img : "",
    };

    try {
      const response = await axios.put(
        `http://localhost:5005/api/edit-pet/${petId}`,
        updatedPetProfile
      );
      console.log("Pet profile updated successfully:", response.data);
      navigate(`/petProfile/${petId}`);
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
            name="imageUrl"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImgChange}
            placeholder="Image URL"
          />
        </label>

        <div className="pet-photo">
          {imagePreview && (
            <div className="avatar-editor">
              <AvatarEditor
                image={imagePreview}
                width={250}
                height={250}
                border={50}
                borderRadius={125}
                color={[255, 255, 255, 0.6]}
                scale={scale}
              />
              <input
                type="range"
                min={0.1}
                max={2}
                step={0.1}
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
              />
            </div>
          )}
          {isLoading ? (
            <p>Uploading...</p>
          ) : (
            <>
              {!uploadSuccess && (
                <button
                  className="upload-btn"
                  type="submit"
                  onClick={handleImgUpload}
                >
                  Upload
                </button>
              )}
              {uploadSuccess && <p>Photo uploaded successfully!</p>}
            </>
          )}
        </div>
        <button className="save-pet-btn" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditPet;
