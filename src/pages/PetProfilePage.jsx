import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import imgPlaceholder from "../assets/pawprint.png";
import { useParams } from "react-router-dom";
import male from "../assets/male.png";
import female from "../assets/female.png";

function PetProfilePage() {
  const { petId } = useParams();
  const { user } = useContext(AuthContext);
  const [pet, setPet] = useState(null);
  const [petImage, setPetImage] = useState(null);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5005/api/pets/${petId}`
        );
        console.log("fetched data", data);
        setPet(data);
      } catch (err) {
        console.log("fetch pet data error", err);
      }
    };
    fetchPetData();
  }, [petId]);
  if (!pet) {
    return "loading";
  }

  return (
    <div>
      <div className="profilepage">
        <img
          className="profileImg"
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
          {!pet.medicalCondition ? (
            <p>There's no medical condition yet.</p>
          ) : (
            pet.medicalCondition
          )}
        </div>
      </div>
    </div>
  );
}

export default PetProfilePage;
