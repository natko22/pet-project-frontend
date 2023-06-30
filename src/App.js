import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage";

import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EditProfile from "./pages/EditProfile";
import PetProfilePage from "./pages/PetProfilePage";
import AddPet from "./pages/AddNewPetPage";
import EditPetProfilePage from "./pages/EditPetProfilePage.jsx";
import SearchPetProfiles from "./pages/SearchPetProfiles";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/edit/:userId" element={<EditProfile />} />
        <Route path="/petProfile/:petId" element={<PetProfilePage />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/edit-pet/:petId" element={<EditPetProfilePage />} />
        <Route path="/pet-profiles" element={<SearchPetProfiles />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
