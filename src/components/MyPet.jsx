import pawprint from "../assets/pawprint.png";
function MyPet({ id, img, name, type }) {
  return (
    <div className="each-pet-box">
      <img className="pet-img" src={!img ? pawprint : img} alt={name} />
      <h3>{name}</h3>
      <p>{type}</p>
    </div>
  );
}

export default MyPet;
