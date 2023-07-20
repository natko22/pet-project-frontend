import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";
import imgPlaceholder from "../assets/pawprint.png";
import { useParams } from "react-router-dom";
import male from "../assets/male.png";
import female from "../assets/female.png";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/config.index";

function PetProfilePage() {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/pets/${petId}`);
        console.log("fetched data", data);
        setPet(data);
      } catch (err) {
        console.log("fetch pet data error", err);
      }
    };
    fetchPetData();
  }, [petId]);

  const handleDelete = async () => {
    try {
      console.log("Delete button clicked");
      console.log("Authenticated user ID:", user._id);
      console.log("Pet owner ID:", pet.owner);
      if (user._id === pet.owner) {
        await axios.post(`${API_URL}/api/pets/${petId}`, {
          owner: user._id,
        });
        navigate("/");
        console.log("Successfully deleted");
      } else {
        console.log("Unauthorized: You are not allowed to delete this pet.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!pet) {
    return "loading";
  }

  return (
    <div>
      {petId === pet._id && (
        <Link className="edit-pet-btn" to={`/edit-pet/${petId}`}>
          Edit Pet Profile
        </Link>
      )}

      <div className="profilepage">
        <img
          className="pet-profile-img"
          src={!pet.img ? imgPlaceholder : pet.img}
          alt={pet.name}
        />
        <h1>{pet.name} </h1>
        <p>
          <img
            className="gender-img"
            src={pet.gender === "Female" ? female : male}
            alt={pet.gender === "Female" ? "female" : "male"}
          />
        </p>
        <p>{pet.type}</p>
        <p>{pet.race}</p>

        <p>Age: {pet.age} years old</p>
        <p>Castrated: {pet.castrated ? "⭕" : "❌"}</p>
        <div className="aboutme-box">
          <h2>How to take care of me?</h2>
          <h3>Instruction</h3>
          {!pet.instruction ? (
            <p>There's no instruction yet.</p>
          ) : (
            pet.instruction
          )}
          <h3>Medical condition</h3>
          {!pet.medicalCondition ? (
            <p>There's no medical condition yet.</p>
          ) : (
            pet.medicalCondition
          )}
          <h3>Diet</h3>
          {!pet.diet ? <p>There's no medical condition yet.</p> : pet.diet}
          {user._id === pet.owner && (
            <button className="delete-pet-btn" onClick={handleDelete}>
              Delete Pet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PetProfilePage;
