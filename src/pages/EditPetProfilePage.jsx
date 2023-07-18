import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AvatarEditor from "react-avatar-editor";
import imgPlaceholder from "../assets/pawprint.png";
import { API_URL } from "../config/config.index";

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
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [petImg, setPetImg] = useState("");

  const { petId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/edit-pet/${petId}`);
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
  const fetchPetforImg = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/edit-pet/${petId}`);

      setPetImg(response.data.pet.img);
    } catch (error) {
      console.error("Error fetching pet profile:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPetforImg();
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
  const handleEditPhoto = () => {
    setShowUploadForm(true);
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
          `${API_URL}/api/upload/${petId}`,
          formData
        );
        console.log(response);
        setUploadSuccess(true);
        setIsLoading(false);
        setShowUploadForm(false);
        setImg(null);
        setImagePreview(null);
        fetchPetforImg();

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
    };

    try {
      const response = await axios.put(
        `${API_URL}/api/edit-pet/${petId}`,
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
      <Link className="backtoprofile-btn" to={`/petProfile/${petId}`}>
        Back to Pet Profile
      </Link>

      <h2 className="edit-pet-heading">Edit Pet Profile</h2>
      {!showUploadForm && (
        <div className="container-parent">
          <div className="profileImg-container">
            <img
              className="profileImg"
              src={!petImg ? imgPlaceholder : petImg}
              alt={name}
            />
            <button className="photo-edit-btn" onClick={handleEditPhoto}>
              Edit
            </button>
          </div>
        </div>
      )}

      {showUploadForm && (
        <div>
          <h2 className="add-image-header">Add image</h2>
          <div className="upload-form-container">
            <div className="upload-form">
              <form className="edit-pet-form" onSubmit={handleImgUpload}>
                <label>
                  <input
                    className="pet-upload-input"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    name="image"
                    onChange={handleImgChange}
                  />
                </label>
                <div className="profile-photo">
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
                </div>
                {isLoading ? (
                  <p>Uploading...</p>
                ) : (
                  <button className="upload-btn" type="submit">
                    Upload
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
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

        <label className="checkbox-label">
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

        <button className="save-pet-btn" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditPet;
