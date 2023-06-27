import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage";

import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EditProfile from "./components/EditProfile";


function App() {
  return (
    <div className="App">
          <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit" element={<EditProfile />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
