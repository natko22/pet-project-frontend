import "./App.css";
import { Routes, Route } from "react-router-dom";
import { SignupPage } from "./pages/SignuPage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
