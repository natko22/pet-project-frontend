import React from "react";
import MyPet from "./MyPet";
import { Link } from "react-router-dom";

function MyPetsBox({ pets }) {
  console.log("mypet", pets);
  return (
    <>
      <h2 className="pet-box-h2">My Pets</h2>
      <div className="pet-box">
        <div className="all-pets">
          {/* add pets here because an error when logging in.Now the pets are
  defined when map function is called.*/}
          {pets &&
            pets.map((pet) => (
              <Link className="pet-link" to={`/petProfile/${pet._id}`}>
                <MyPet
                  key={pet._id}
                  id={pet._id}
                  img={pet.img}
                  name={pet.name}
                  type={pet.type}
                />
              </Link>
            ))}
        </div>
        <Link to="/add-pet">+ Add a new Pet</Link>
      </div>
    </>
  );
}

export default MyPetsBox;
