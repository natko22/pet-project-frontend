import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useEffect } from "react";
import AvatarEditor from "react-avatar-editor";
import { API_URL } from "../config/config.index";
import imgPlaceholder from "../assets/placeholder.png";

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
  const [pet, setPet] = useState([]);
  const [userData, setUserData] = useState(null);
  const { petId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [userImg, setUserImg] = useState("");

  const [imagePreview, setImagePreview] = useState(null);
  const [scale, setScale] = useState(1);

  // Handle image change
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    setImagePreview(URL.createObjectURL(file));
  };
  const handleEditPhoto = () => {
    setShowUploadForm(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const { data } = await axios.get(`${API_URL}/api/users/${user._id}`);
          setUserData(data);
        }
      } catch (err) {
        console.log("fetch user data error", err);
      }
    };
    fetchUserData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !race || !age || !gender || !type) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError(false);
    const handleEditPhoto = () => {
      setShowUploadForm(true);
    };
    const formData = new FormData();
    formData.append("name", name);
    formData.append("race", race);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("type", type);
    formData.append("castrated", castrated);
    formData.append("medicalCondition", medicalCondition);
    formData.append("diet", diet);
    formData.append("instruction", instruction);
    formData.append("owner", user._id);
    if (img) {
      formData.append("imageUrl", img);
    }

    try {
      const response = await axios.post(`${API_URL}/api/add-pet`, formData);
      setPet(response.data);
      navigate(`/profile/${user._id}`);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("Failed to create pet");
    }
  };

  return (
    <div>
      <Link className="back-to-user-link" to={`/profile/${user && user._id}`}>
        Back to User's Profile
      </Link>
      {/* <label>
            Image URL:
            <input
              type="file"
              name="imageUrl"
              onChange={handleImgChange}
              placeholder="E.g., https://example.com/pet-image.jpg"
            />
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
            </div>
          </label> */}
      <h1 className="add-new-pet-heading">Add a New Pet</h1>
      {loading && <h1 className="creating-pet-msg">Creating Pet...</h1>}

      {!loading && (
        <form onSubmit={handleSubmit} className="add-new-pet">
          {!showUploadForm && (
            <div className="container-parent">
              <div className="profileImg-container">
                <img
                  className="profileImg"
                  src={!userImg ? imgPlaceholder : userImg}
                  alt="pet-img"
                />
                <button className="photo-edit-btn" onClick={handleEditPhoto}>
                  Edit
                </button>
              </div>
            </div>
          )}

          {showUploadForm && (
            <div>
              <div className="upload-form-container">
                <div className="upload-form">
                  <h2 className="add-image-header">Add image</h2>
                  <div
                    className="close-btn"
                    onClick={() => setShowUploadForm(false)}
                  >
                    x
                  </div>
                  <label className="file-upload-label">
                    Choose Photo
                    <input
                      className="upload-input"
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
                          width={150}
                          height={150}
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
                </div>
              </div>
            </div>
          )}
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
          <button type="submit" className="add-new-pet-btn" target="_top">
            Add Pet
          </button>
        </form>
      )}

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Pet added successfully!</p>}
    </div>
  );
}

export default AddPet;
