import "./App.css";
import { useContext } from "react";
import { AuthContext } from "../src/context/auth.context";
import { Routes, Route, Navigate } from "react-router-dom";
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
import Favorites from "./pages/Favorites";
import SearchPetSittersPage from "./pages/SearchPetSittersPage";
import BookingsPage from "./pages/BookingsPage";
import AboutUs from "./pages/AboutUsPage";
import AdminPage from "./pages/AdminPage";

function App() {
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to={`/profile/${user._id}`} replace />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to={`/profile/${user._id}`} replace />
            ) : (
              <SignupPage />
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to={`/profile/${user._id}`} replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/edit/:userId" element={<EditProfile />} />
        <Route path="/petProfile/:petId" element={<PetProfilePage />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/edit-pet/:petId" element={<EditPetProfilePage />} />
        <Route path="/pet-profiles" element={<SearchPetProfiles />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/sitters-profiles" element={<SearchPetSittersPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
