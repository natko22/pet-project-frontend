import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import MyPet from "./MyPet";
import { Link, useParams } from "react-router-dom";

function MyPetsBox({ pets }) {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className="pet-box">
        <h2 className="pet-box-h2">My Pets</h2>
        {pets.length < 1 ? (
          "We can't find any furry, feathered, or scaled friends in this area right now. "
        ) : (
          <div className="all-pets">
            {/* add pets here because an error when logging in.Now the pets are
  defined when map function is called.*/}
            {pets &&
              pets.map((pet) => (
                <Link
                  className="pet-link"
                  to={`/petProfile/${pet._id}`}
                  target="_top"
                  key={pet._id}
                >
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
        )}

        {userId === user._id && (
          <Link className="add-pet" to="/add-pet" target="_top">
            Add A New Pet
          </Link>
        )}
      </div>
    </>
  );
}

export default MyPetsBox;
